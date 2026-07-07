import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/data/industries";
import { redirect } from "next/navigation";
import React from "react";
import OnboardingForm from "./_components/onboarding-form";

const OnboardingPage = async () => {
  const { isOnboarded, user } = await getUserOnboardingStatus();

  // Only redirect if already onboarded AND this is not edit mode
  // (We'll improve this logic later if you're using ?edit=true)

  return (
    <main>
      <OnboardingForm
        industries={industries}
        initialData={user}
      />
    </main>
  );
};

export default OnboardingPage;