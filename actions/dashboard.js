"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";


export const generatedAIInsights = async (industry)=>{}

export async function getIndustryInsights(params) {
        const {userId} = await auth();
        if(!userId) throw new Error("Unauthorized")
    
        const user = await db.user.findUnique({
            where:{
                clerkUserId:userId,
            },
        });
    
        if(!user) throw new Error("User not found")

        if(!user.industryInsight){
            const insights = await generatedAIInsights(user.industry)
            const industryInsight = await db.industryInsight.create({
                data:{
                    industry:user.industry,
                    ...insights,
                    nextUpdate:new Date(Date.now()+ 7*24*60*60*1000),
                }
            })
            return industryInsight;
        }
        return user.industryInsight;
}