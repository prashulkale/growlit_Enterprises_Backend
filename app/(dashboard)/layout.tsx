import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Toaster } from '@/components/ui/sonner';


import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>

      <DashboardLayout>
  
        {children}
      </DashboardLayout>
  

      <Toaster />
   
    </>
  );
}



// import { type Metadata } from 'next'



// export default function Layout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <ClerkProvider>
//       <html lang="en">
//         <body className={`antialiased`}>
//           <header className="flex justify-end items-center p-4 gap-4 h-16">
//             <SignedOut>
//               <SignInButton />
//               <SignUpButton />
//             </SignedOut>
//             <SignedIn>
//               <UserButton />
//             </SignedIn>
//           </header>
//           <DashboardLayout>
//             {children}
//           </DashboardLayout>
//           <Toaster />
//         </body>
//       </html>
//     </ClerkProvider>
//   )
// }


// <header className="flex justify-end items-center p-4 gap-4 h-16">
// <SignedOut>
//   <SignInButton />
//   <SignUpButton />
// </SignedOut>
// <SignedIn>
//   <UserButton />
// </SignedIn>
// </header>
// </div>
// </div>
// </header>





// import { ClerkProvider } from '@clerk/nextjs'
// // import { dark } from '@clerk/themes'
// import React from 'react'

// const Layout = ({children} : {children : React.ReactNode}) => {
//   return (
//  <ClerkProvider >


  

    
//     <div>{children}</div>
//     </ClerkProvider>
//   )
// }

// export default Layout