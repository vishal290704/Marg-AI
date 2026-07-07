"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { success } from "zod";
import { generatedAIInsights } from "./dashboard";

export async function updateUser(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) throw new Error("User not found");

  try {
    // Check if industry already exists
    const formattedIndustry = `${data.industry}-${data.subIndustry
      .toLowerCase()
      .replace(/ /g, "-")}`;

    let industryInsight = await db.industryInsight.findUnique({
      where: {
        industry: formattedIndustry,
      },
    });

    // Call Gemini OUTSIDE transaction
    if (!industryInsight) {
      const insights = await generatedAIInsights(formattedIndustry);

      industryInsight = await db.industryInsight.create({
        data: {
          industry: formattedIndustry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // Update user separately
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        industry: formattedIndustry,
        subIndustry: data.subIndustry,
        experience: data.experience,
        bio: data.bio,
        skills: data.skills,
      },
    });

    return {
      success: true,
      updatedUser,
      industryInsight,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update profile: " + error.message);
  }
}

export async function getUserOnboardingStatus() {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
    select: {
      industry: true,
      subIndustry: true,
      experience: true,
      bio: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  return {
    isOnboarded: !!user.industry,
    user,
  };
}
