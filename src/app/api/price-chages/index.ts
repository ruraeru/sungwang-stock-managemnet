import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // ... (가격 변동 기록 조회 로직)
  } else if (req.method === "POST") {
    try {
      const { productId, price } = req.body;
      const priceChange = await db.priceChange.create({
        data: {
          price: parseInt(price),
          product: { connect: { id: parseInt(productId) } },
        },
      });
      res.status(201).json(priceChange);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create price change" });
    }
  } else {
    res.status(405).end();
  }
}
