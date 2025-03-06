"use server";

import { convertHTML } from "@/lib/gemini";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";
import { IinitialState } from "./page";

async function formatImageForGemini(
  base64Data: Base64URLString,
  mimeType: string
): Promise<Part> {
  return {
    inlineData: {
      mimeType: mimeType,
      data: base64Data,
    },
  };
}

export default async function questionGemini(
  prevState: IinitialState,
  formData: FormData
) {
  {
    const data = {
      imagePart: formData.get("imagePart"),
      prompt: formData.get("prompt"),
    };

    const { promptHistory, outputs, prompt } = prevState;

    if (data.imagePart instanceof File && data.prompt !== null) {
      const photoData = await data.imagePart.arrayBuffer();
      const imageType = data.imagePart.type;
      const base64Data = Buffer.from(photoData).toString("base64");

      const imageData = await formatImageForGemini(base64Data, imageType);

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = data.prompt?.toString() + " in korean";

      const result = await model.generateContent(
        base64Data ? [prompt, imageData] : prompt
      );

      const res = result.response;

      const output = res.text();
      return {
        promptHistory: [...promptHistory, prompt],
        outputs: [convertHTML(output), ...outputs],
        prompt: "",
        // output: convertHTML(output),
      };
    }
    return {
      promptHistory: [...promptHistory],
      outputs: [...prevState.outputs],
      prompt: "",
      // output: convertHTML(output),
    };
  }
}
