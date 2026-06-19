// "use client";
import {
  SignInButton,
  SignUpButton,
  UserButton,
  Show,
} from "@clerk/nextjs";
import React from 'react'

const Header = () => {
  return (
    <div>
            <Show when="signed-out">
        <SignInButton />
        <SignUpButton>
          <button>Sign Up</button>
        </SignUpButton>
      </Show>

      <Show when="signed-in">
        <UserButton />
      </Show>
    </div>
  )
}

export default Header
