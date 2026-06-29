import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const checkUser = async () => {
  console.log("✅ checkUser called");

  const user = await currentUser();

  console.log("Clerk User:", user);

  if (!user) {
    console.log("❌ No Clerk user found");
    return null;
  }

  try {
    const loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    console.log("Existing User:", loggedInUser);

    if (loggedInUser) {
      return loggedInUser;
    }

    console.log("Creating user...");

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        email: user.emailAddresses[0].emailAddress,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
        imageUrl: user.imageUrl,
        bio: "",
        skills: [],
      },
    });

    console.log("✅ User created:", newUser);

    return newUser;
  } catch (err) {
    console.error("❌ Prisma Error:", err);
    throw err;
  }
};