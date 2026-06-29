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
    <header className="fixed top-0 w-full border bg-background/80 backdrop-blur-md z-50 supports-backdrop-filter:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/list.png"
            width={200}
            height={60}
            alt="MargAI Logo"
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Show only when signed in */}
          <Show when="signed-in">
            <Link href="/dashboard">
              <Button variant="outline">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>

            {/* Growth Tools */}
            <DropdownMenu>
        <DropdownMenuTrigger
  className={cn(
    buttonVariants(),
    "gap-2"
  )}
>
  <StarsIcon className="h-4 w-4" />
  <span className="hidden md:block">Growth Tools</span>
  <ChevronDown className="h-4 w-4" />
</DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/resume" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Build Resume</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/ai-cover-letter"
                      className="flex items-center gap-2"
                    >
                      <PenBox className="h-4 w-4" />
                      <span>Cover Letter</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link href="/interview" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      <span>Interview Prep</span>
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
