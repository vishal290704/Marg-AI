"use client";

import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./ui/button";
import {
  ChevronDown,
  FileText,
  GraduationCap,
  LayoutDashboard,
  PenBox,
  StarsIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
// import { checkUser } from "@/lib/checkUser";

const Header = () => {
  // await checkUser()
  return (
    <header className="fixed top-0 w-full border bg-background backdrop-blur-md z-50 supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/marg-ai.png"
            width={250}
            height={90}
            alt="MargAI Logo"
            className="h-18 py-1 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Show only when signed in */}
          {/* Show only when signed in */}
          <Show when="signed-in">
            {/* Dashboard */}
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "group hidden lg:flex items-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-400",
              )}
            >
              <LayoutDashboard className="h-4 w-4 text-blue-400 transition-colors duration-200 group-hover:text-blue-400" />
              Dashboard
            </Link>

            {/* Resume Builder */}
            <Link
              href="/resume"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "group hidden lg:flex items-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-400",
              )}
            >
              <FileText className="h-4 w-4 text-emerald-400 transition-colors duration-200 group-hover:text-blue-400" />
              Resume
            </Link>

            {/* AI Cover Letter */}
            <Link
              href="/ai-cover-letter"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "group hidden lg:flex items-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-400",
              )}
            >
              <PenBox className="h-4 w-4 text-violet-400 transition-colors duration-200 group-hover:text-blue-400" />
              Cover Letter
            </Link>

            {/* Interview Prep */}
            <Link
              href="/interview"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "group hidden lg:flex items-center gap-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-blue-500/10 hover:text-blue-400",
              )}
            >
              <GraduationCap className="h-4 w-4 text-orange-400 transition-colors duration-200 group-hover:text-blue-400" />
              Interview Prep
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "group h-10 gap-2 rounded-xl px-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20 data-[state=open]:bg-primary",
                )}
              >
                <StarsIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-12" />

                <span className="hidden font-medium md:block">
                  Growth Tools
                </span>

                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-64 rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl"
              >
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer rounded-xl px-3 py-3 transition-colors focus:bg-zinc-900"
                  >
                    <Link href="/dashboard" className="flex items-center gap-3">
                      <LayoutDashboard className="h-5 w-5 text-blue-400" />
                      <div className="flex flex-col">
                        <span className="font-medium">Dashboard</span>
                        <span className="text-xs text-muted-foreground">
                          Overview & analytics
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer rounded-xl px-3 py-3 transition-colors focus:bg-zinc-900"
                  >
                    <Link href="/resume" className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-emerald-400" />
                      <div className="flex flex-col">
                        <span className="font-medium">Resume Builder</span>
                        <span className="text-xs text-muted-foreground">
                          Create ATS-friendly resumes
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer rounded-xl px-3 py-3 transition-colors focus:bg-zinc-900"
                  >
                    <Link
                      href="/ai-cover-letter"
                      className="flex items-center gap-3"
                    >
                      <PenBox className="h-5 w-5 text-violet-400" />
                      <div className="flex flex-col">
                        <span className="font-medium">AI Cover Letter</span>
                        <span className="text-xs text-muted-foreground">
                          Generate tailored cover letters
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="cursor-pointer rounded-xl px-3 py-3 transition-colors focus:bg-zinc-900"
                  >
                    <Link href="/interview" className="flex items-center gap-3">
                      <GraduationCap className="h-5 w-5 text-orange-400" />
                      <div className="flex flex-col">
                        <span className="font-medium">
                          Interview Preparation
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Practice with AI mock interviews
                        </span>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Show>

          {/* Auth Buttons */}
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <Button variant="outline">Sign In</Button>
            </SignInButton>

            {/* <SignUpButton mode="redirect">
              <Button>Get Started</Button>
            </SignUpButton> */}
          </Show>

          {/* User Menu */}
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </Show>
        </div>
      </nav>
    </header>
  );
};

export default Header;
