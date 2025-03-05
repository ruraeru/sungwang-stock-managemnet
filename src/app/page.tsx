"use client"

import { FormEvent, ReactElement, useActionState, useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import questionGemini from "./actions";

export default function Home() {
  const [promptHistory, setHistoryPt] = useState<string[]>([]);
  const [prompt, setPrompt] = useState('');
  const [outputs, setOutPuts] = useState<ReactElement[]>([]);
  const [isLoading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  //prompt 입력창 ref
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const sanitizedData = (data: string) => ({
    __html: DOMPurify.sanitize(data)
  });

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

  const [state, action] = useActionState(questionGemini, null);

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
      <form action={action} className="w-full flex flex-col gap-5">
        <input
          className="bg-transparent rounded-md  
          h-10 focus:outline-none ring-2 focus:ring-4 transition
          ring-neutral-200 focus:ring-slate-500-500 border-none placeholder:text-neutral-400"
          type="file"
          accept="image/*"
          name="imagePart"
        />
        <input
          className="bg-transparent rounded-md 
          min-h-10 focus:outline-none ring-2 focus:ring-4 transition
          ring-neutral-200 focus:ring-slate-500-500 border-none placeholder:text-neutral-400"
          value={prompt}
          ref={inputRef}
          name="prompt"
          onChange={onChange}
        />
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
        {/* {outputs.map((output, index) => (
          <div key={index} className="p-5 rounded-3xl bg-gray-500 ">
            {output}
          </div>
        ))} */}
        {state?.output && (
          <div className="p-5 rounded-3xl bg-gray-500">
            <div dangerouslySetInnerHTML={sanitizedData(state.output)} />
          </div>
        )}
      </div>
    </div>
  );
}
