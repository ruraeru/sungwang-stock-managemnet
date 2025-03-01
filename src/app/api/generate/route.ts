import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

async function imageToBase64(imagePath: string) {
  try {
    const absolutePath = path.join(process.cwd(), imagePath);
    const imageBuffer = fs.readFileSync(absolutePath);
    const base64String = imageBuffer.toString("base64");
    return base64String;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function formatImageForGemini(imagePath: string, mimeType: string) {
  const base64Data = await imageToBase64(imagePath);
  if (!base64Data) return null;

  return {
    inline_data: {
      mime_type: mimeType,
      data: base64Data,
    },
  };
}

export async function POST(req: NextRequest, res: Response) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const data = await req.json();

    const prompt = data.prompt;

    const imagePath = "/public/images/cal.png"; //이미지 경로
    const mimeType = "image/jpeg"; //이미지 타입
    const imageData = await formatImageForGemini(imagePath, mimeType); //api 형식으로 만들어주기

    const result = await model.generateContent([prompt, imageData]);
    const response = result.response;
    const output = response.text();

    return NextResponse.json({ output });
  } catch (err) {
    console.error(err);
  }
}
