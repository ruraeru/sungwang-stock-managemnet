"use server";

import { ProductType } from "@/config/types";
import db from "./db";
import { existsProduct, updateExistsProduct } from "./product";

export async function AddProducts(datas: ProductType[]): Promise<boolean> {
  datas.map(async (data) => {
    const isDefined = await existsProduct(data.productName);
    if (isDefined) {
      updateExistsProduct(data, isDefined);
    } else {
      await db.product.create({
        data: {
          imageUrl: "/images/default.png",
          name: data.productName,
          description: data.productName,
          category: "미분류",
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
