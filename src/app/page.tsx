"use client"

import { FormEvent, ReactElement, useState } from "react";
import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";

export default function Home() {

  // const prompt = "한국어로 인사해봐";
  const [prompt, setPrompt] = useState('');
  const [outputs, setOutPuts] = useState<ReactElement[]>([]);
  const [isLoading, setLoading] = useState(false);


  const generateText = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(({ body: prompt }))
      })
      const data = await response.json();

      if (response.ok) {
        setOutPuts(prev => [convertHTML(data.output)!, ...prev]);
        setLoading(false);
      } else {
        setOutPuts(data.error);
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

      return <div dangerouslySetInnerHTML={{ __html: html_text.value }} />;
    }
    catch (err) {
      console.error("Markdown parsing error: ", err);
      setOutPuts([<div key="error" dangerouslySetInnerHTML={{ __html: md }} />]);
    }
  }
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setPrompt(value);
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPrompt("");
  }

  return (
    <div className="flex flex-col items-start pt-20 p-16 gap-5">
      <h1 className="font-bold text-5xl text-center w-full">gemini 2.0 flash</h1>
      <form onSubmit={onSubmit} className="w-full">
        <input
          className="bg-transparent rounded-md w-full 
          h-10 focus:outline-none ring-2 focus:ring-4 transition
          ring-neutral-200 focus:ring-slate-500-500 border-none placeholder:text-neutral-400"
          value={prompt}
          onChange={onChange}
        />
        <button onClick={generateText} />
      </form>

      <div className="flex items-center gap-5">
        <h1>답변</h1>
        <button onClick={() => setOutPuts([])}>답변 초기화</button>
      </div>

      <div className="w-full flex flex-col gap-5">
        <div className="flex items-center justify-center">
          {
            isLoading && (
              <div className="
              animate-spin rounded-full h-16 w-16 border-l-2 border-cyan-600 border-transparent" />
            )
          }
        </div>
        {outputs.map((output, index) => (
          <div key={index} className="p-5 rounded-3xl bg-gray-500 ">
            {output}
          </div>
        ))}
      </div>
    </div>
  );
}
