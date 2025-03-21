"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import fs from "fs/promises";
import { existsProduct, updateExistsProduct } from "@/lib/product";

const productSchema = z.object({
  productName: z.string({
    required_error: "상품명을 입력해주세요",
  }),
  description: z.string({
    required_error: "상품명을 입력해주세요",
  }),
  category: z.string({
    required_error: "상품명을 입력해주세요",
  }),
  quantity: z.string({
    required_error: "상품명을 입력해주세요",
  }),
  currentStock: z.coerce.number({
    required_error: "상품명을 입력해주세요",
  }),
  price: z.coerce.number({
    required_error: "상품명을 입력해주세요",
  }),
  imageUrl: z.any(),
});

export type ProductInput = z.infer<typeof productSchema>;

async function createProductInDB(data: ProductInput) {
  const isDefined = await existsProduct(data.productName);

  if (isDefined) {
    return await updateExistsProduct(data, isDefined);
  }
  return await db.product.create({
    data: {
      name: data.productName,
      description: data.description,
      category: data.category,
      unit: data.quantity,
      currentStock: data.currentStock,
      priceHistory: {
        create: {
          price: data.price,
        },
      },
      imageUrl: data.imageUrl,
    },
  });
}

export async function createProduct(_: unknown, formData: FormData) {
  const data = {
    productName: formData.get("productName"),
    description: formData.get("description"),
    category: formData.get("category"),
    quantity: formData.get("quantity"),
    currentStock: formData.get("currentStock"),
    price: formData.get("price"),
    imageUrl: formData.get("photo"),
  };
  if (data.imageUrl instanceof File) {
    if (data.imageUrl.size === 0) {
      data.imageUrl = null;
    } else {
      const randomFileName = `${Math.random().toString(36).substring(2, 11)}.${
        data.imageUrl.type.split("/")[1]
      }`;
      const photoData = await data.imageUrl.arrayBuffer();
      await fs.appendFile(
        `./public/images/${randomFileName}`,
        Buffer.from(photoData)
      );

      data.imageUrl = `/images/${randomFileName}`;
    }
  }
  const results = productSchema.safeParse(data);

  if (!results.success) {
    return results.error.flatten();
  } else {
    await createProductInDB(results.data);
    redirect("/products");
  }
}
