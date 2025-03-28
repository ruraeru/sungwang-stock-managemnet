"use client";

import { useFormStatus } from "react-dom";

interface ButtonProps {
    text: string;
}

export default function Button({ text }: ButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button disabled={pending} className="h-10 
        disabled:bg-neutral-400
         disabled:text-neutral-300
         disabled:cursor-not-allowed
         w-full bg-cyan-500 text-white font-medium rounded-md
         text-center hover:bg-cyan-400 transition-colors
         ">
            {pending ? "로딩 중" : text}
        </button>
    )
}