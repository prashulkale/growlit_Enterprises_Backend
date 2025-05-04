import Link from 'next/link';
import { Metadata } from 'next';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ProductsTable } from '@/components/products/ProductsTable';
import { ProductsSearch } from '@/components/products/ProductsSearch';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Manage your product inventory',
};

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button asChild>
          <Link href="/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      
      <div className="space-y-4">
        <ProductsSearch />
        <ProductsTable />
      </div>
    </div>
  );
}