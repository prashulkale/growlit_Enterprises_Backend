import { Metadata } from 'next';
import { ProductForm } from '@/components/products/ProductForm';

export const metadata: Metadata = {
  title: 'Add New Product',
  description: 'Add a new product to your inventory',
};

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground">Create a new product in your inventory</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
        <ProductForm />
      </div>
    </div>
  );
}