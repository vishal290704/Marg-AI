import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const generateIndustryInsights = inngest.createFunction(
  {
    id: "generate-industry-insights",

    // Scheduled every Sunday at midnight
    triggers: [
      {
        cron: "0 0 * * 0",
      },
    ],
  },
  async ({ step }) => {
    const industries = await step.run("Fetch industries", async () => {
      return db.industryInsight.findMany({
        take:1,
        select: {
          industry: true,
        },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format.

{
  "salaryRanges": [
    {
      "role": "string",
      "min": number,
      "median": number,
      "max": number,
      "location": "string"
    }
  ],
  "growthRate": number,
  "demandLevel": "HIGH" | "MEDIUM" | "LOW",
  "topSkills": ["skill1","skill2"],
  "marketOutlook": "POSITIVE" | "NEUTRAL" | "NEGATIVE",
  "keyTrends": ["trend1","trend2"],
  "recommendedSkills": ["skill1","skill2"]
}

Rules:
- Return ONLY valid JSON.
- Do NOT wrap in markdown.
- Include at least 6 salary roles.
- Include at least 6 key trends.
- Include at least 6 recommended skills.
`;

      const response = await step.ai.wrap(
        "Generate AI Insights",
        async () => {
          return model.generateContent(prompt);
        }
      );

      const text =
        response.response.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

      const cleanedText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const insights = JSON.parse(cleanedText);

      await step.run(`Update ${industry}`, async () => {
        return db.industryInsight.update({
          where: {
            industry,
          },
          data: {
            ...insights,
            lastupdated: new Date(),
            nextUpdate: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ),
          },
        });
      });
    }

    return {
      success: true,
    };
  }
);