"use server";

import { formatImageForGemini } from "@/lib/gemini";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IinitialState, TJson } from "./page";

export default async function questionGemini(
  prevState: IinitialState,
  formData: FormData
) {
  {
    const data = {
      imagePart: formData.get("imagePart"),
      prompt: formData.get("prompt"),
    };

    // const { promptHistory, outputs, prompt } = prevState;
    // const { output } = prevState;

    if (data.imagePart instanceof File) {
      const photoData = await data.imagePart.arrayBuffer();
      const imageType = data.imagePart.type;
      const base64Data = Buffer.from(photoData).toString("base64");

      const imageData = await formatImageForGemini(base64Data, imageType);

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt =
        "View an image and extract values in JSON format. Let me show you an example transactionDetails: { supplier: { companyName: Sunil H&C, address: address, telephoneNumber:  telephoneNumber}, customer: { { companyName: companyName, address: address, telephoneNumber: telephoneNumber }, transactionDate: transactionDate, totalAmount: 111,500,creditAmount: 0 }, items: [ { 'productName': 'Stensirinda (8300SS) Bedroom', 'unitPrice': '6500', 'quantity': 5, 'totalPrice': '32,500' }, ]";

      const result = await model.generateContent(
        base64Data ? [prompt, imageData] : prompt
      );

      const res = result.response;

      const output = res.text();

      const match = output.match(/`json\n([\s\S]*)\n`/);

      if (match && match[1]) {
        const json: TJson = JSON.parse(match[1]);

        return {
          output: json,
          prompt: "",
        };
      }

      return {
        output: null,
        prompt: "",
        error: "JSON Code Block Not Found.",
      };
    }
    return {
      output: null,
      prompt: "",
    };
  }
}
