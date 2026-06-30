"use client";
import { onboardingSchema } from "@/app/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });

  const onSubmit =async (values)=>{}
const watchIndustry = watch("industry")
  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your Profile
          </CardTitle>
          <CardDescription>
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div  className="space-y-2">
              <Label className={"mb-2"} htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) =>{
                    setValue("industry", value)
                    setSelectedIndustry(
                        industries.find((ind) => ind.name ===value)
                    );
                    setValue("subIndustry", "");

                }}
              >
                <SelectTrigger className="w-full" id="industry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => {
                    return (
                      <SelectItem value={ind.name} key={ind.id}>
                        {ind.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-500 ">
                    {errors.industry.message}
                </p>
              )}
            </div>




           {watchIndustry && (
            <div  className="space-y-2">
              <Label className={"mb-2"} htmlFor="subIndustry">Specialization</Label>
              <Select onValueChange={(value)=> setValue("subIndustry", value)}>
                <SelectTrigger className="w-full" id="subIndustry">
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
                <SelectContent>
                  {selectedIndustry?.subIndustries.map((ind) => {
                    return (
                      <SelectItem value={ind} key={ind}>
                        {ind}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.subIndustry && (
                <p className="text-sm text-red-500 ">
                    {errors.subIndustry.message}
                </p>
              )}
            </div>
        )}



        <div className="space-y-2">
              <Label className={"mb-2"} htmlFor="experience">Years of Experience</Label>
              <Input
              id="experience"
              type="number"
              min="0"
              max="50"
              placeholder="Enter years of experience"
              {...register("experience")}
              />
             
              {errors.experience && (
                <p className="text-sm text-red-500 ">
                    {errors.experience.message}
                </p>
              )}
        </div>



        <div className="space-y-2">
              <Label className={"mb-2"} htmlFor="skills">Skills</Label>
              <Input
              id="skills"
              placeholder="e.g., Python, JavaScript, Project Management"
              {...register("skills")}
              />
              <p className="text-xs text-muted-foreground">Separate multiple skills with commas</p>
             
              {errors.skills && (
                <p className="text-sm text-red-500 ">
                    {errors.skills.message}
                </p>
              )}
        </div>



         <div className="space-y-2">
              <Label className={"mb-2"} htmlFor="bio">Professional Bio</Label>
              <Textarea
              id="bio"
              placeholder="Tell us about your Professional background..."
              className="h-32"
              {...register("bio")}
              />
             
              {errors.bio && (
                <p className="text-sm text-red-500 ">
                    {errors.bio.message}
                </p>
              )}
        </div>


          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
