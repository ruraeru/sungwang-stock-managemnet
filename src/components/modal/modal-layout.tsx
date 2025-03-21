"use client"

import { useEffect } from "react";

export default function ModalLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, []);

    return (
        <div className="absolute w-full h-full flex items-center z-50 justify-center bg-black bg-opacity-60 left-0 top-0">
            {children}
        </div>
    )
}