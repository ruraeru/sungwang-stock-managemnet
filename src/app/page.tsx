"use client"

import { FormEvent, ReactElement, useEffect, useRef, useState } from "react";
import { unified } from "unified";
import markdown from "remark-parse";
import remarkRehype from "remark-rehype";
import html from "rehype-stringify";

export default function Home() {
  // const prompt = "한국어로 인사해봐";
  const [promptHistory, setHistoryPt] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [outputs, setOutPuts] = useState<ReactElement[]>([]);
  const [isLoading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<{ imageData: null | string, imageType: null | string }>({ imageData: null, imageType: null });

  //prompt 입력창 ref
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const generateText = async () => {
    try {
      setLoading(true);
      //next api route로 값 받아오기
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(({ prompt: prompt, imageData: image.imageData, imageType: image.imageType }))
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

  //prompt에서 받아온 md text를 html로 변환
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
    setHistoryPt(prev => [...prev, prompt])
    setPrompt("");
  }

  const selectPrompt = (prompt: string) => {
    setPrompt(prompt);
    inputRef.current?.focus();
  }

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e;
    if (!files) return;
    const file = files[0];

    const photoData = await file.arrayBuffer();
    const imageType = file.type;
    const base64Data = Buffer.from(photoData).toString("base64");

    setImage({
      imageData: base64Data,
      imageType
    });
  }

  return (
    <div className="flex flex-col items-start pt-20 p-16 gap-5">
      <h1 className="font-bold text-5xl text-center w-full">gemini 2.0 flash</h1>
      <h1>이전 질문들?!</h1>
      <ul>
        {promptHistory.map((history, index) => (
          <li key={index} onClick={() => selectPrompt(history)}>
            {index + 1}: {history}
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
        <input
          className="bg-transparent rounded-md  
          h-10 focus:outline-none ring-2 focus:ring-4 transition
          ring-neutral-200 focus:ring-slate-500-500 border-none placeholder:text-neutral-400"
          type="file"
          accept="image/*"
          onChange={onImageChange}
        />
        <input
          className="bg-transparent rounded-md 
          min-h-10 focus:outline-none ring-2 focus:ring-4 transition
          ring-neutral-200 focus:ring-slate-500-500 border-none placeholder:text-neutral-400"
          value={prompt}
          ref={inputRef}
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
              animate-spin rounded-full h-16 w-16 border-l-2 border-cyan-600"/>
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
