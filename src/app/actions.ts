"use server";

import { convertHTML, formatImageForGemini } from "@/lib/gemini";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IinitialState } from "./page";

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

      // const prompt = data.prompt?.toString() + " in korean";

      const prompt =
        "View the image and extract the text in JSON format. Write the variable names using camelcase.";

      const result = await model.generateContent(
        base64Data ? [prompt, imageData] : prompt
      );

      const res = result.response;

      const output = res.text();
      return {
        promptHistory: [...promptHistory, prompt],
        outputs: [convertHTML(output), ...outputs],
        prompt: "",
      };
    }
    return {
      promptHistory: [...promptHistory],
      outputs: [...prevState.outputs],
      prompt: "",
    };
  }
}
