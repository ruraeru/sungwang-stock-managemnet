import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

async function formatImageForGemini(base64Data: string, mimeType: string) {
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

    const imageData = await formatImageForGemini(
      data.imageData, //사용자로부터 입력받은 이미지의 base64 데이터
      data.imageType //이미지 타입
    );

    const result = await model.generateContent([prompt, imageData]);

    const response = result.response;
    const output = response.text();

    return NextResponse.json({ output });
  } catch (err) {
    console.error(err);
  }
}
