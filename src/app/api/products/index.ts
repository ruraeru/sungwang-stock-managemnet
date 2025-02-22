import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db"; // 위에서 생성한 Prisma Client import

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const products = await db.product.findMany({
        include: { priceHistory: true, stockHistory: true }, // 필요한 정보 include
      });
      res.status(200).json(products);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, description, category, unit, currentStock } = req.body;
      const product = await db.product.create({
        data: {
          name,
          description,
          category,
          unit,
          currentStock: parseInt(currentStock), // currentStock은 정수형으로 변환
        },
      });
      res.status(201).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create product" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
