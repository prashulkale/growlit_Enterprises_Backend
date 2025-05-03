import { NextResponse, NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

import prisma from '@/lib/prisma';

// GET all products
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    
    const products = await prisma.product.findMany({
      where: query,
      orderBy: { createdAt: 'desc' },
    });
    
    return NextResponse.json(products , {  headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },});
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500, headers: {
        'Access-Control-Allow-Origin': '*',
      } }
    );
  }
}




export async function POST(req: Request) {
  try {
    const body = await req.json();
  
    
    const product = await prisma.product.create({
      data: body,
    });
    


    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 400 }
    );
  }
}
  