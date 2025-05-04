"use client";

import Link from 'next/link';
import { Package, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const recentProducts = [
  {
    id: '1',
    name: 'Plate Heat Exchanger',
    category: 'heat-exchangers',
    added: '2 days ago',
  },
  {
    id: '2',
    name: 'Centrifugal Pump',
    category: 'pumps',
    added: '5 days ago',
  },
  {
    id: '3',
    name: 'Pressure Relief Valve',
    category: 'valves',
    added: '1 week ago',
  },
  {
    id: '4',
    name: 'Cartridge Filter',
    category: 'filters',
    added: '2 weeks ago',
  },
];

export function RecentProducts() {
  return (
    <div className="space-y-4">
      {recentProducts.map((product) => (
        <div key={product.id} className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
              <Package className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium leading-none">{product.name}</p>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">{product.added}</div>
            <Button variant="ghost" size="icon" asChild>
              <Link href={`/products/${product.id}`}>
                <ExternalLink className="h-4 w-4" />
                <span className="sr-only">View product</span>
              </Link>
            </Button>
          </div>
        </div>
      ))}
      <Button variant="outline" className="w-full" asChild>
        <Link href="/products">View all products</Link>
      </Button>
    </div>
  );
}