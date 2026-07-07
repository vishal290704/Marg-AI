"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
Write a professional cover letter for the position of "${data.jobTitle}" at "${data.companyName}".

## Candidate Information
- Industry: ${user.industry}
- Years of Experience: ${user.experience}
- Skills: ${user.skills?.join(", ")}
- Professional Background: ${user.bio}
- Name: ${user.name}
- Email: ${user.email}

## Job Description
${data.jobDescription}

## Requirements

- Write in a professional, confident, and enthusiastic tone.
- Tailor the cover letter specifically to the job description.
- Highlight the candidate's most relevant skills and experience.
- Relate the candidate's background to the company's requirements.
- Mention measurable achievements wherever appropriate.
- Keep the cover letter under **400 words**.
- Use proper business letter structure:
  - Date
  - Hiring Manager (or Hiring Team if unknown)
  - Subject
  - Greeting
  - Body
  - Closing
- Use the candidate's actual information provided above.
- **Do NOT use placeholders** such as [Your Name], [Your Email], [Company Address], etc. If information is unavailable, simply omit it.
- Return **ONLY valid GitHub-Flavored Markdown**.
- Do **NOT** generate HTML.
- Do **NOT** generate \`<script>\`, \`<style>\`, \`<iframe>\`, \`<svg>\`, or any HTML tags.
- Do **NOT** wrap the response inside triple backticks (\`\`\`markdown).
- Return only the cover letter content with no explanations or extra text.
`;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        userId: user.id,
      },
    });

    return coverLetter;
  } catch (error) {
    console.error("Error generating cover letter:", error.message);
    throw new Error("Failed to generate cover letter");
  }
}

export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}