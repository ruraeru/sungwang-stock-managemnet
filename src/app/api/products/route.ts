import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request: Request) {
  try {
    const products = await db.product.findMany({
      include: { priceHistory: true, stockHistory: true },
    });
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    ); // JSON 형식 에러 응답
  }
}

export async function POST(request: Request) {
  try {
    const { name, description, category, unit, currentStock, price } =
      await request.json();

    const product = await db.product.create({
      data: {
        name,
        description,
        category,
        unit,
        currentStock: parseInt(currentStock),
        priceHistory: {
          create: {
            price: parseInt(price),
          },
        },
      },
    });

    return NextResponse.json(product, { status: 201 }); // JSON 형식 응답
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    ); // JSON 형식 에러 응답
  }
}
