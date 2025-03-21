"use server";

import { ProductType } from "@/config/types";
import db from "./db";
import { ProductInput } from "@/app/products/add/actions";

export const getProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return product;
};

type TexistsProduct = {
  id: number;
  currentStock: number;
};

export async function existsProduct(name: string) {
  const product = await db.product.findUnique({
    where: { name },
    select: {
      id: true,
      currentStock: true,
    },
  });
  return product;
}

export async function updateExistsProduct(
  data: ProductType | ProductInput,
  target: TexistsProduct
) {
  await db.product.update({
    where: {
      id: target.id,
    },
    data: {
      currentStock: target.currentStock + parseInt(data.quantity),
    },
  });
}
