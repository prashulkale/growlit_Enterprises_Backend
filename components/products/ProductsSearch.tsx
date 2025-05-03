"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';

export function ProductsSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || '');
  
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    if (search) {
      params.set('search', search);
    }
    
    if (category) {
      params.set('category', category);
    }
    
    router.push(`/dashboard/products?${params.toString()}`);
  };
  
  const handleReset = () => {
    setSearch('');
    setCategory('');
    router.push('/dashboard/products');
  };
  
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex w-full max-w-lg items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            type="search"
            className="w-full appearance-none bg-background pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Select
          value={category}
          onValueChange={setCategory}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            <SelectItem value="heat-exchangers">Heat Exchangers</SelectItem>
            <SelectItem value="pumps">Pumps</SelectItem>
            <SelectItem value="valves">Valves</SelectItem>
            <SelectItem value="filters">Filters</SelectItem>
            <SelectItem value="tanks">Tanks</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>Search</Button>
        {(search || category) && (
          <Button variant="ghost" size="icon" onClick={handleReset}>
            <X className="h-4 w-4" />
            <span className="sr-only">Reset</span>
          </Button>
        )}
      </div>
    </div>
  );
}