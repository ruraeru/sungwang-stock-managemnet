import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const product = await db.product.findUnique({
        where: { id: parseInt(id as string) },
        include: { priceHistory: true, stockHistory: true },
      });
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, description, category, unit, currentStock } = req.body;
      const product = await db.product.update({
        where: { id: parseInt(id as string) },
        data: {
          name,
          description,
          category,
          unit,
          currentStock: parseInt(currentStock),
        },
      });
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update product" });
    }
  } else if (req.method === "DELETE") {
    try {
      await db.product.delete({
        where: { id: parseInt(id as string) },
      });
      res.status(204).end(); // No Content
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else {
    res.status(405).end();
  }
}
