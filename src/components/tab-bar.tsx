"use client"

import { HomeIcon as SolidHomeIcon, UserCircleIcon as SolidUserCircleIcon, CubeIcon as SolidCubeIcon } from "@heroicons/react/24/solid";
import { HomeIcon as OutlineHomeIcon, UserCircleIcon as OutlineUserCircleIcon, CubeIcon as OutlineCubeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
    const pathname = usePathname();
    return (
        <div className="fixed bottom-0 w-full mx-auto max-w-screen-sm grid grid-cols-3 border-neutral-600 border-t px-5 py-3 *:text-white bg-neutral-800">
            <Link href="/" className="flex flex-col items-center gap-px">
                {pathname === "/" ? (
                    <SolidHomeIcon className="w-7 h-7" />
                ) : (
                    <OutlineHomeIcon className="w-7 h-7" />
                )}
                <span>홈</span>
            </Link>
            <Link href="/products" className="flex flex-col items-center gap-px">
                {pathname === "/products" ? (
                    <SolidCubeIcon className="w-7 h-7" />
                ) : (
                    <OutlineCubeIcon className="w-7 h-7" />
                )}
                <span>제품</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-px">
                {pathname === "/profile" ? (
                    <SolidUserCircleIcon className="w-7 h-7" />
                ) : (
                    <OutlineUserCircleIcon className="w-7 h-7" />
                )}
                <span>내 정보</span>
            </Link>
        </div>
    )
}