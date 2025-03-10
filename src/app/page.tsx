"use client"

import { ChangeEvent, ReactElement, useActionState, useEffect, useRef, useState } from "react";
import DOMPurify from "dompurify";
import questionGemini from "./actions";

export interface IinitialState {
  promptHistory: string[];
  outputs: string[];
  prompt: string;
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [previewImg, setPreivew] = useState<string | null>(null);
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

  const selectPrompt = (prompt: string) => {
    setPrompt(prompt);
    inputRef.current?.focus();
  }

  const initialState: IinitialState = {
    promptHistory: [],
    outputs: [],
    prompt: "",
  }

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e;
    if (!files) return;
    const file = files[0];

    setPreivew(URL.createObjectURL(file));
  }

  const [state, action, isPending] = useActionState(questionGemini, initialState);

  return (
    <div className="flex flex-col items-start pt-20 p-16 gap-5">
      <h1 className="font-bold text-5xl text-center w-full">gemini 2.0 flash</h1>
      <h1>이전 질문들?!</h1>
      <ul>
        {state.promptHistory.map((history, index) => (
          <li key={index} onClick={() => selectPrompt(history)}>
            {index + 1}: {history}
          </li>
        ))}
      </ul>
      <form action={action} className="w-full flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed
                    cursor-pointer bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: `url(${previewImg})`
          }}
        >
          {!previewImg ? (
            <>
              <p>이미지 아이콘</p>
              {/* <PhotoIcon className="w-20" /> */}
              <div className="text-neutral-400 text-sm">
                사진을 추가해주세요.
                {/* {state?.fieldErrors.photo} */}
              </div>
            </>
          ) : null}
        </label>
        <input
          id="photo"
          className="bg-transparent rounded-md hidden
          h-10 focus:outline-none ring-2 focus:ring-4 transition
          ring-neutral-200 focus:ring-slate-500-500 border-none placeholder:text-neutral-400"
          type="file"
          accept="image/*"
          name="imagePart"
          onChange={onImageChange}
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
        <button>답변 초기화</button>
      </div>

      <div className="w-full flex flex-col gap-5">
        <div className="flex items-center justify-center">
          {
            isPending && (
              <div className="
              animate-spin rounded-full h-16 w-16 border-l-2 border-cyan-600"/>
            )
          }
        </div>
        {state.outputs.map((output, index) => (
          <div key={index} className="p-5 rounded-3xl bg-gray-500 ">
            <div dangerouslySetInnerHTML={sanitizedData(output)} />
          </div>
        ))}
      </div>
    </div>
  );
}
