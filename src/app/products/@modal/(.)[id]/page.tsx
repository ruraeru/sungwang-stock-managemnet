import CloseBtn from "@/components/modal/modal-button";
import ModalLayout from "@/components/modal/modal-layout";
import { getProduct } from "@/lib/product";
import { PhotoIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default async function Modal({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProduct(id);

    return (
        <ModalLayout>
            <CloseBtn />
            <div className="max-w-screen-sm h-1/2 flex justify-center w-full">
                <div className="aspect-square bg-neutral-700 text-neutral-200 rounded-md flex justify-center items-center flex-col p-5">
                    {product?.imageUrl ? (
                        <div className="relative w-full h-full">
                            <Image src={product?.imageUrl} fill alt={product?.name} className="object-cover rounded-md" sizes="(max-width: 768px) 100vw, 50vw" />
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
        </ModalLayout>
    )
}