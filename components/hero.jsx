"use client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import "../app/globals.css";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      if (window.scrollY > 100) {
        imageRef.current.classList.add("scrolled");
      } else {
        imageRef.current.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="mx-auto max-w-5xl space-y-8 text-center">
          <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl xl:text-8xl">
            <span className="bg-gradient-to-r from-white via-zinc-100 to-zinc-300 bg-clip-text text-transparent">
              Your AI Career Companion 
            </span>

            <br />

            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              for Professional Growth
            </span>
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
           Accelerate your career with AI-powered resume building, cover letter generation, 
           interview preparation, personalized career guidance, and real-time industry 
           insights—all in one intelligent platform.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 h-12">
              Get Started
            </Button>
          </Link>
        </div>
        {/* Can add another link button here */}

        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/marg-ai.png"}
              width={1280}
              height={720}
              alt="Banner Marg-AI"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
