// "use client";
import { SignInButton, SignUpButton, UserButton, Show } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Header = () => {
  return (
    <header className="fixed top-0 w-full border bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto container px-4 h-16 flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src="/list.png"
            width={200}
            height={60}
            alt="MargAI logo"
            className="h-12 py-1 w-auto object-contain"
          />
        </Link>

        <div>
          <SignInButton>
            <Link href={"/dashboard"}>
              <Button>
                <LayoutDashboard className="h-4 w-4 " />
                <span className="hidden md:block">Industry Insights</span>
              </Button>
            </Link>
          </SignInButton>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <Show when="signed-out">
        <SignInButton />
        <SignUpButton>
          <button>Sign Up</button>
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </header>
  );
};

export default Header;
