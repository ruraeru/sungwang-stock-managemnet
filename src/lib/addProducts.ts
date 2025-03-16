"use server";

import { ProductType } from "@/app/page";
import db from "./db";

export async function AddProducts(datas: ProductType[]): Promise<boolean> {
  datas.map(async (data) => {
    const isDefined = await SearchProduct(data.productName);
    if (isDefined?.id) {
      await db.product.update({
        where: {
          id: isDefined.id,
        },
        data: {
          currentStock: isDefined.currentStock + parseInt(data.quantity),
        },
        select: {
          id: true,
        },
      });
    } else {
      await db.product.create({
        data: {
          name: data.productName,
          description: data.productName,
          category: "전기",
          unit: data.quantity.toString(),
          currentStock: parseInt(data.quantity),
          priceHistory: {
            create: {
              price: parseInt(data.unitPrice),
            },
          },
        },
      });
    }
  });
  return true;
}

async function SearchProduct(name: string) {
  const product = await db.product.findUnique({
    where: { name },
    select: {
      id: true,
      currentStock: true,
    },
  });
  return product;
}
