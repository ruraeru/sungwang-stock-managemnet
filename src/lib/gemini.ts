import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";
import { Part } from "@google/generative-ai";

export const formatImageForGemini = async (
  base64Data: Base64URLString,
  mimeType: string
): Promise<Part> => {
  return {
    inlineData: {
      mimeType: mimeType,
      data: base64Data,
    },
  };
};

export const convertHTML = (mdText: string): string => {
  try {
    const html_text = unified()
      .use(markdown)
      .use(remarkRehype)
      .use(html)
      .processSync(mdText);

    return html_text.toString();
  } catch (err) {
    console.error(err);
    return "Markdown parsing error";
  }
};
