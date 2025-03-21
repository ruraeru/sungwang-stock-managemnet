"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import fs from "fs/promises";

const productSchema = z.object({
  name: z.string({
    required_error: "상품명을 입력해주세요",
  }),
  description: z.string({
    required_error: "상품명을 입력해주세요",
  }),
  category: z.string({
    required_error: "상품명을 입력해주세요",
  }),
  unit: z.string({
    required_error: "상품명을 입력해주세요",
  }),
  currentStock: z.coerce.number({
    required_error: "상품명을 입력해주세요",
  }),
  price: z.coerce.number({
    required_error: "상품명을 입력해주세요",
  }),
  photo: z.any(),
});

type ProductInput = z.infer<typeof productSchema>;

async function createProductInDB(data: ProductInput) {
  return await db.product.create({
    data: {
      name: data.name,
      description: data.description,
      category: data.category,
      unit: data.unit,
      currentStock: data.currentStock,
      priceHistory: {
        create: {
          price: data.price,
        },
      },
      imageUrl: data.photo,
    },
  });
}

export async function createProduct(_: unknown, formData: FormData) {
  const data = {
    name: formData.get("name"),
    description: formData.get("description"),
    category: formData.get("category"),
    unit: formData.get("unit"),
    currentStock: formData.get("currentStock"),
    price: formData.get("price"),
    photo: formData.get("photo"),
  };
  if (data.photo instanceof File) {
    if (data.photo.size === 0) {
      data.photo = null;
    } else {
      const randomFileName = `${Math.random().toString(36).substring(2, 11)}.${
        data.photo.type.split("/")[1]
      }`;
      const photoData = await data.photo.arrayBuffer();
      await fs.appendFile(
        `./public/images/${randomFileName}`,
        Buffer.from(photoData)
      );

      data.photo = `/images/${randomFileName}`;
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
