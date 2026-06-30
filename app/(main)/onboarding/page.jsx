import { industries } from '@/data/industries'
import React from 'react'

const OnboardingPage = () => {
//Check if user is already onboarded
  return (
    <main>
        <OnboardingForm industries={industries}/>
    </main>
  )
}

export default OnboardingPage