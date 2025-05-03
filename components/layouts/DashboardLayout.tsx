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
      {/* Sidebar for desktop */}
      <div className="hidden border-r bg-muted/40 md:flex md:w-64 md:flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Package className="h-6 w-6" />
            <span className="font-bold">ProductDB</span>
          </Link>
        </div>
        <ScrollArea className="flex-1">
          <nav className="grid gap-4 px-2 py-4">
            {sidebarItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant={
                  pathname === item.href ||
                  (item.href !== '/dashboard' && pathname?.startsWith(item.href))
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
        <div className="border-t p-4">
          <Button variant="outline" className="w-full  gap-2">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
        </ScrollArea>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 md:hidden lg:h-[60px] lg:px-6">
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Package className="h-6 w-6" />
              <span className="font-bold">ProductDB</span>
            </Link>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}