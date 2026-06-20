// "use client";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  Show,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from 'react'

const Header = () => {
  return (
    <header>
            <nav>
                <Link href='/'> 
                    <Image src="/list.png" width={200} height={60} alt="MargAI logo"
                    className="h-12 py-1 w-auto object-contain"
                    />
                </Link>
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
  )
}

export default Header
