"use server";

import db from "./db";

export const getProduct = async (id: string) => {
  const product = await db.product.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return product;
};
