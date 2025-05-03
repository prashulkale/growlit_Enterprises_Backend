"use client";

import Image from 'next/image';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    capacity: string;
    category: string;
    description: string;
    features: string[];
    applications: string[];
    images: string[];
  };
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [activeImage, setActiveImage] = useState(product.images[0] || '');
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-muted/30">
            {activeImage ? (
              <div className="relative aspect-square h-full w-full">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="object-cover transition-all hover:scale-105"
                />
              </div>
            ) : (
              <div className="flex aspect-square h-full w-full items-center justify-center bg-muted">
                <span className="text-muted-foreground">No image available</span>
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="px-2">
              <Carousel>
                <CarouselContent>
                  {product.images.map((image, index) => (
                    <CarouselItem key={index} className="basis-1/4 md:basis-1/5 lg:basis-1/6">
                      <div
                        className={`cursor-pointer overflow-hidden rounded-md border-2 ${
                          activeImage === image
                            ? 'border-primary'
                            : 'border-transparent'
                        }`}
                        onClick={() => setActiveImage(image)}
                      >
                        <div className="aspect-square relative">
                          <img
                            src={image}
                            alt={`${product.name} - view ${index + 1}`}
                            className="object-cover h-full w-full"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="ml-2" />
                <CarouselNext className="mr-2" />
              </Carousel>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {product.name}
            </h1>
            <h2 className="text-lg font-medium text-muted-foreground">
              {product.capacity}
            </h2>
          </div>
          
          <Separator />
          
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Category</h3>
              <Badge variant="outline">{product.category}</Badge>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Features</h3>
            <ul className="list-disc pl-5 text-muted-foreground space-y-1">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Applications</h3>
            <div className="flex flex-wrap gap-2">
              {product.applications.map((application, index) => (
                <Badge key={index} variant="secondary">{application}</Badge>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}