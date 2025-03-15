"use client"

import { ChangeEvent, useActionState, useState } from "react";
import questionGemini from "./actions";
import { AddProducts } from "@/lib/addProducts";

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

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [previewImg, setPreivew] = useState<string | null>(null);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setPrompt(value);
  }

  const initialState: IinitialState = {
    output: null,
    prompt: "",
  }

  const onUpload = () => {
    if (state.output?.transactionDetails.items) {
      AddProducts(state.output?.transactionDetails.items);
    }
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
      <div className="text-center w-full">
        <h1 className="font-bold text-3xl">빠재고</h1>
        <p className="text-lg font-semibold">(빠르게 재고관리 해보자!)</p>
      </div>
      <form action={action} className="w-full flex flex-col gap-5">
        <label
          htmlFor="photo"
          className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed
                    cursor-pointer bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: previewImg ? `url(${previewImg})` : "none"
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
          name="prompt"
          onChange={onChange}
        />
        <button type="submit" className="bg-neutral-500 p-5 rounded-full">제출</button>
      </form>

      {/* <div className="flex items-center gap-5">
        <h1>답변</h1>
        <button>답변 초기화</button>
      </div> */}

      <div className="w-full flex flex-col gap-5" >
        <div className="flex items-center justify-center">
          {
            isPending && (
              <div className="
              animate-spin rounded-full h-16 w-16 border-l-2 border-cyan-600"/>
            )
          }
        </div>
        {
          state.output && (
            <div className="flex flex-col gap-5">
              {state.output.transactionDetails.items.map((item) => (
                <div key={item.productName} className="bg-gray-700">
                  <p>이름 : {item.productName}</p>
                  <p>수량 : {item.quantity}</p>
                  <p>총 가격 : {item.totalPrice}</p>
                  <p>개당 가격 : {item.unitPrice}</p>
                </div>
              ))}
            </div>
          )
        }
        <button onClick={onUpload}>업로드 하기!</button>
      </div>
    </div>
  );
}
