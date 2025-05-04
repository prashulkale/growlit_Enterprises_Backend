import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Edit } from 'lucide-react';
import { Metadata } from 'next';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductDetails } from '@/components/products/ProductDetails';
import prisma from '@/lib/prisma';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
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
      title: product.name,
      description: product.description,
    };
  } catch (error) {
    return {
      title: 'Product',
      description: 'Product details',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/products">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to products</span>
              </Link>
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
          </div>
          <Button asChild>
            <Link href={`/products/${params.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Product
            </Link>
          </Button>
        </div>
        
        <Separator />
        
        <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
          <Card>
            <CardContent className="pt-6">
              <ProductDetails product={product} />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    return notFound();
  }
}