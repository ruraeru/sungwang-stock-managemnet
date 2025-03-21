import CloseBtn from "@/components/modal/modal-button";
import { getProduct } from "@/lib/product";
import { PhotoIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import Link from "next/link";

export default async function Modal({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);
    return (
        <div className="absolute w-full h-full flex items-center z-50 justify-center bg-black bg-opacity-60 left-0 top-0">
            <CloseBtn />
            <div className="max-w-screen-sm h-1/2 flex justify-center w-full">
                <div className="aspect-square bg-neutral-700 text-neutral-200 rounded-md flex justify-center items-center flex-col p-5">
                    {product?.imageUrl ? (
                        <div className="relative w-full h-full">
                            <Link href={`/products/${id}`}>
                                <Image src={product?.imageUrl} fill alt="dd" className="object-cover" sizes="full" />
                            </Link>
                        </div>
                    ) : (
                        <PhotoIcon className="h-28" />
                    )}
                    <div className="w-full p-3">
                        <ul>
                            <li>이름: {product?.name}</li>
                            <li>설명: {product?.description}</li>
                            <li>수량: {product?.unit}</li>
                            <li>재고 수량: {product?.currentStock}</li>
                            <li>분류: {product?.category}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}