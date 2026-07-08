"use client";
import { onboardingSchema } from "@/app/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {Card,CardContent,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card";
import {Select,SelectContent, SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const OnboardingForm = ({ industries, initialData }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();
  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      experience: initialData?.experience ?? "",
      skills: initialData?.skills?.join(", ") ?? "",
      bio: initialData?.bio ?? "",
    },
  });

  const onSubmit = async (values) => {
    try {
      await updateUserFn(values);
    } catch (error) {
      console.log("Onboarding error:", error);
    }
  };

  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success(
        initialData?.industry
          ? "Profile updated successfully!"
          : "Profile completed successfully!",
      );
      router.push("/dashboard");
      router.refresh();
    }
  }, [updateResult, updateLoading]);

  useEffect(() => {
    if (!initialData) return;

    // Experience
    setValue("experience", initialData.experience?.toString() || "");

    // Skills
    setValue("skills", initialData.skills?.join(", ") || "");

    // Bio
    setValue("bio", initialData.bio || "");

    // Industry
    if (initialData.industry) {
      const industryName = initialData.industry.split("-")[0];

      const matchedIndustry = industries.find(
        (ind) => ind.name.toLowerCase() === industryName.toLowerCase(),
      );

      if (matchedIndustry) {
        setSelectedIndustry(matchedIndustry);
        setValue("industry", matchedIndustry.name);
      }
    }

    // Sub Industry
    if (initialData.subIndustry) {
      setValue("subIndustry", initialData.subIndustry);
    }
  }, [initialData, industries, setValue]);

  const watchIndustry = watch("industry");
  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-slate-800 via-zinc-900 to-slate-700 shadow-2xl">
        <CardHeader>
          <CardTitle className="bg-gradient-to-r from-white via-blue-200 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
            Complete Your Profile
          </CardTitle>
          <CardDescription className="mt-2 text-zinc-400 leading-6">
            Select your industry to get personalized career insights and
            recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
            {/* Industry fields */}
            <div className="space-y-3">
  <div className="flex items-center justify-between">
    <Label
      htmlFor="industry"
      className="text-sm font-medium text-zinc-200"
    >
      Industry
    </Label>

    <span className="text-xs text-zinc-500">
      Select your primary field
    </span>
  </div>

  <Select
    value={watch("industry")}
    onValueChange={(value) => {
      setValue("industry", value);
      setSelectedIndustry(
        industries.find((ind) => ind.name === value)
      );
      setValue("subIndustry", "");
    }}
  >
    <SelectTrigger
      id="industry"
      className="h-11 rounded-xl border-zinc-800 bg-zinc-900 transition-colors focus:ring-2 focus:ring-blue-500/20"
    >
      <SelectValue placeholder="Select your industry" />
    </SelectTrigger>

    <SelectContent className="rounded-xl border-zinc-800 bg-zinc-950">
      {industries.map((ind) => (
        <SelectItem
          key={ind.id}
          value={ind.name}
          className="cursor-pointer rounded-md"
        >
          {ind.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  {errors.industry && (
    <p className="text-sm font-medium text-red-500">
      {errors.industry.message}
    </p>
  )}
</div>

            {/* SubIndustry fields */}
          {watchIndustry && (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <Label
        htmlFor="subIndustry"
        className="text-sm font-medium text-zinc-200"
      >
        Specialization
      </Label>

      <span className="text-xs text-zinc-500">
        Choose your primary domain
      </span>
    </div>

    <Select
      value={watch("subIndustry")}
      onValueChange={(value) => setValue("subIndustry", value)}
    >
      <SelectTrigger
        id="subIndustry"
        className="h-11 rounded-xl border-zinc-800 bg-zinc-900 transition-colors focus:ring-2 focus:ring-blue-500/20"
      >
        <SelectValue placeholder="Select your specialization" />
      </SelectTrigger>

      <SelectContent className="rounded-xl border-zinc-800 bg-zinc-950">
        {selectedIndustry?.subIndustries.map((ind) => (
          <SelectItem
            key={ind}
            value={ind}
            className="cursor-pointer rounded-md"
          >
            {ind}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>

    {errors.subIndustry && (
      <p className="text-sm font-medium text-red-500">
        {errors.subIndustry.message}
      </p>
    )}
  </div>
)}

            {/* Experience fields */}
           <div className="space-y-3">
  <div className="flex items-center justify-between">
    <Label
      htmlFor="experience"
      className="text-sm font-medium text-zinc-200"
    >
      Years of Experience
    </Label>

    <span className="text-xs text-zinc-500">
      0 - 50 years
    </span>
  </div>

  <Input
    id="experience"
    type="number"
    min="0"
    max="50"
    placeholder="e.g. 2"
    className="h-11 rounded-xl border-zinc-800 bg-zinc-900 transition-colors placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
    {...register("experience")}
  />

  {errors.experience && (
    <p className="text-sm font-medium text-red-500">
      {errors.experience.message}
    </p>
  )}
</div>

            {/* Skills fields */}
           <div className="space-y-3">
  <div className="flex items-center justify-between">
    <Label
      htmlFor="skills"
      className="text-sm font-medium text-zinc-200"
    >
      Skills
    </Label>

    <span className="text-xs text-zinc-500">
      Add your core skills
    </span>
  </div>

  <Input
    id="skills"
    placeholder="e.g. React, Java, Spring Boot, SQL"
    className="h-11 rounded-xl border-zinc-800 bg-zinc-900 transition-colors placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
    {...register("skills")}
  />

  <p className="text-xs leading-5 text-zinc-500">
    Separate multiple skills with commas (e.g. React, Node.js, MongoDB).
  </p>

  {errors.skills && (
    <p className="text-sm font-medium text-red-500">
      {errors.skills.message}
    </p>
  )}
</div>

            {/* Bio fields */}
            <div className="space-y-3">
  <div className="flex items-center justify-between">
    <Label
      htmlFor="bio"
      className="text-sm font-medium text-zinc-200"
    >
      Professional Bio
    </Label>

    <span className="text-xs text-zinc-500">
      Brief introduction
    </span>
  </div>

  <Textarea
    id="bio"
    placeholder="Tell us about your background, experience, interests, and career goals..."
    className="min-h-36 resize-none rounded-xl border-zinc-800 bg-zinc-900 transition-colors placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-blue-500/20"
    {...register("bio")}
  />

  <p className="text-xs leading-5 text-zinc-500">
    A concise summary helps us provide more personalized career recommendations.
  </p>

  {errors.bio && (
    <p className="text-sm font-medium text-red-500">
      {errors.bio.message}
    </p>
  )}
</div>

<Button
  type="submit"
  disabled={updateLoading}
  className="mt-2 h-11 w-full rounded-xl bg-blue-600 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
>
  {updateLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Saving...
    </>
  ) : initialData?.industry ? (
    "Update Profile"
  ) : (
    "Complete Profile"
  )}
</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default OnboardingForm;
