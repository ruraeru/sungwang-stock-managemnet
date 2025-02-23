"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  category: z.string(),
  unit: z.string(),
  currentStock: z.string(),
  price: z.string(),
});

export async function createProduct(_: unknown, formData: FormData) {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    unit: formData.get("unit"),
    currentStock: formData.get("currentStock"),
    price: formData.get("price"),
  };
  const results = productSchema.safeParse(data);

  if (!results.success) {
    return results.error.flatten();
  } else {
    const { name, description, category, unit, currentStock, price } =
      results.data;
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
      select: {
        id: true,
      },
    });
    console.log(product);
    redirect("/products");
  }
}
