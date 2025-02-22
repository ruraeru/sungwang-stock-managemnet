import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // ... (재고 변동 기록 조회 로직)
  } else if (req.method === "POST") {
    try {
      const { productId, quantity } = req.body;
      const stockChange = await db.stockChange.create({
        data: {
          quantity: parseInt(quantity),
          product: { connect: { id: parseInt(productId) } },
        },
      });
      res.status(201).json(stockChange);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create stock change" });
    }
  } else {
    res.status(405).end();
  }
}
