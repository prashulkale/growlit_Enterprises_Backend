import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ProductForm } from '@/components/products/ProductForm';
import prisma from '@/lib/prisma';





interface EditProductPageProps {
  params: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata({ params }: EditProductPageProps): Promise<Metadata> {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      return {
        title: 'Product Not Found',
      };
    }

    return {
      title: `Edit ${product.name}`,
      description: `Edit details for ${product.name}`,
    };
  } catch (error) {
    return {
      title: 'Edit Product',
      description: 'Edit product details',
    };
  }
}

export default async function EditProductPage({ params }: EditProductPageProps) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!product) {
      notFound();
    }

    return (
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/products/${params.id}`}>
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to product</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Edit {product.name}</h1>
        </div>
        
        <Separator />
        
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <ProductForm 
            initialData={product} 
            productId={params.id} 
          />
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}