import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const data = await req.json();

    const prompt = data.body;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = await response.text();

    // const image_path = r'

    return NextResponse.json({ output });
  } catch (err) {
    console.error(err);
  }
}
