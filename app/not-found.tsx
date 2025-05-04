import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import Header from '@/components/layouts/header'
// import { ThemeToggle } from '@/components/theme-toggle'

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* <header className="px-4 lg:px-6 h-14 flex items-center justify-between">
        <Link className="flex items-center" href="/">
          <MountainIcon className="h-6 w-6" />
          <span className="ml-2 font-semibold">Growlit Enterprises</span>
        </Link>
      </header> */}



      
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="space-y-4 max-w-[600px]">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold tracking-tighter text-primary sm:text-7xl">
              404
            </h1>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Page Not Found
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              The thermal energy you`re seeking has dissipated. Let`s redirect you to warmer paths.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           
            <Button asChild variant="outline" size="lg">
              <Link href="/">
                Home
                <HomeIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Growlit Enterprises. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}