import Link from 'next/link';
import { LogOut, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
          <div className="flex gap-2 font-bold text-xl items-center">
            <Package className="h-6 w-6" />
            <span>ProductDB</span>
          </div>
          <div className="p-4">
          <Button variant="outline" className="w-full gap-2">
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-10 md:pb-12 md:pt-12 lg:py-24">
          <div className="container flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Manage your product inventory with ease
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              A comprehensive product management dashboard with full CRUD operations, 
              Cloudinary integration, and MongoDB database.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/products">
                  Go to Dashboard
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </section>
        <section className="container space-y-8 py-12 md:py-12">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Key Features
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Our product management solution offers a comprehensive set of features to streamline your inventory management.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Product Management</h3>
              <p className="mt-2 text-muted-foreground">
                Create, view, update, and delete products with a user-friendly interface.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold">Cloudinary Integration</h3>
              <p className="mt-2 text-muted-foreground">
                Upload and manage product images with Cloudinarys powerful image services.
              </p>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Package className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold">MongoDB Database</h3>
              <p className="mt-2 text-muted-foreground">
                Store and manage your product data with MongoDBs flexible document database.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background">
        <div className="container flex h-16 items-center px-4 sm:px-8">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ProductDB. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}