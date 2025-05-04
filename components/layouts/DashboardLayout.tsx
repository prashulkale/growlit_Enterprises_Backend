"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Contact,Gauge, LayoutDashboard, Package, Settings, LogOut } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  // {
  //   title: 'Dashboard',
  //   icon: <LayoutDashboard className="h-5 w-5" />,
  //   href: '/dashboard',
  // },
  {
    title: 'Products',
    icon: <Package className="h-5 w-5" />,
    href: '/products',
  },
  {
    title: 'Contact Queries',
    icon: <Contact className="h-5 w-5" />,
    href: '/queries',
  },
  {
    title: 'Settings',
    icon: <Settings className="h-5 w-5" />,
    href: '/settings',
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background md:flex-row">
      {/* Sidebar for desktop - Fixed and sticky */}
      <div className="hidden h-screen w-64 shrink-0 flex-col border-r bg-muted/40 md:sticky md:top-0 md:flex">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold"
          >
            <Package className="h-6 w-6" />
            <span className="font-bold">ProductDB</span>
          </Link>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <ScrollArea className="h-[calc(100vh-7.5rem)]">
            <nav className="grid gap-4 px-2 py-4">
              {sidebarItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant={
                    pathname === item.href ||
                    (item.href !== '/' && pathname?.startsWith(item.href))
                      ? 'secondary'
                      : 'ghost'
                  }
                  className="justify-start gap-2"
                >
                  <Link href={item.href}>
                    {item.icon}
                    {item.title}
                  </Link>
                </Button>
              ))}
            </nav>
          </ScrollArea>
         
        </div>
      </div>
      
      {/* Main content - Flexible width with independent scroll */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2">
            <Link
              href=""
              className="flex items-center gap-2 font-semibold"
            >
              <Package className="h-6 w-6" />
              <span className="font-bold">ProductDB</span>
            </Link>
          </div>
        </header>
        
        {/* Content with independent scroll */}
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
