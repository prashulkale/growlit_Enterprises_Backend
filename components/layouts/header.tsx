

import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
  } from '@clerk/nextjs'



import React from 'react'

const Header = () => {
  return (
    <div>


<header className="border-b  bg-background">
<div className="container flex h-16 items-center justify-between px-4 sm:px-8">
  <div className="flex gap-2 font-bold text-xl items-center">
    {/* <Package className="h-6 w-6" /> */}
    <span>Growlit Enterprises</span>
  </div>
  <div className="p-4">
  <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
</div>
</div>
</header>



    </div>
  )
}

export default Header