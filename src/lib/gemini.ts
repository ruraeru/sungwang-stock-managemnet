import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";

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
