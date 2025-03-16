"use client"

import { ChangeEvent, useActionState, useState } from "react";
import questionGemini from "./actions";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { Input } from "@/components/Input";

export type ProductType = {
  productName: string;
  unitPrice: string;
  quantity: string;
  totalPrice: string;
}

export type TJson = {
  transactionDetails: {
    supplier: {
      companyName: string;
      address: string;
      telephoneNumber: string;
    },
    customer: {
      companyName: string;
      address: string;
      telephoneNumber: string;
    },
    transactionDate: string;
    totalAmount: string;
    creditAmount: string;
    items: ProductType[];
  }
}
export interface IinitialState {
  output: TJson | null;
  prompt: string;
}

const initialState: IinitialState = {
  output: null,
  prompt: "",
}

export default function Home() {
  // const [prompt, setPrompt] = useState('');
  const [previewImg, setPreivew] = useState<string | null>(null);

  const [state, action, isPending] = useActionState(questionGemini, initialState);

  // const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.currentTarget;
  //   setPrompt(value);
  // }

  const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target: { files } } = e;
    if (!files) return;
    const file = files[0];

    setPreivew(URL.createObjectURL(file));
  }

  return (
    <div className="flex flex-col items-start pt-20 p-16 gap-5 max-w-md mx-auto">
      <div className="text-center w-full">
        <h1 className="font-bold text-3xl">빠재고</h1>
        <p className="text-lg font-semibold">(빠르게 재고관리 해보자!)</p>
      </div>
      <form action={action} className="w-full flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed
                    cursor-pointer bg-center bg-no-repeat bg-contain"
          style={{
            backgroundImage: previewImg ? `url(${previewImg})` : "none"
          }}
        >
          {!previewImg ? (
            <>
              <PhotoIcon className="w-20" />
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
        {/* <input
          className="bg-transparent rounded-md 
          min-h-10 focus:outline-none ring-2 focus:ring-4 transition
          ring-neutral-200 focus:ring-slate-500-500 border-none placeholder:text-neutral-400"
          value={prompt}
          name="prompt"
          onChange={onChange}
        /> */}
        <button type="submit" className="bg-neutral-500 p-5 rounded-full">Parsing</button>
      </form>
      <div className="w-full flex flex-col gap-5" >
        <div className="flex items-center justify-center">
          {
            isPending && (
              <div className="
              animate-spin rounded-full h-16 w-16 border-l-2 border-cyan-600"/>
            )
          }
        </div>
        {state.output?.transactionDetails.items && (
          <Input initialProductData={state.output?.transactionDetails.items} />
        )}
      </div>
    </div>
  );
}
