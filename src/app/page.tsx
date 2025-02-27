"use client"

import { ReactElement, useState } from "react";
import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";

export default function Home() {

  // const prompt = "한국어로 인사해봐";
  const [prompt, setPrompt] = useState('');
  const [output, setOutPut] = useState('');
  const [test, setTest] = useState<ReactElement>();


  const generateText = async () => {
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(({ body: prompt }))
      })
      const data = await response.json();

      if (response.ok) {
        console.log(convertHTML(data.output))
        setOutPut(data.output);
      } else {
        setOutPut(data.error);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const convertHTML = (md: string) => {
    try {
      const html_text = unified()
        .use(markdown)
        .use(remarkRehype)
        .use(html)
        .processSync(md);

      setTest(<div dangerouslySetInnerHTML={{ __html: html_text.value }} />);

      return html_text.value;
    }
    catch (err) {
      console.error("Markdown parsing error: ", err);
      setTest(<div dangerouslySetInnerHTML={{ __html: md }} />);
    }
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setPrompt(value);
  }

  return (
    <div className="flex flex-col items-center">
      <form onSubmit={(e) => e.preventDefault()}>
        <input onChange={onChange} className="bg-black" value={prompt} />
        <button onClick={generateText}>눌러줘요</button>
      </form>
      {test}
    </div>
  );
}
