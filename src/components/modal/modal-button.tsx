"use client"

import { XMarkIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

export default function CloseBtn() {
    const router = useRouter();
    const onCloseClick = () => {
        router.back();
    }
    return (
        <button onClick={onCloseClick} className="absolute right-5 top-5">
            <XMarkIcon className="size-10" />
        </button>
    )
}