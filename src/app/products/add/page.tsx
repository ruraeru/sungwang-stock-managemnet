"use client"

import { useActionState, useState } from "react";
import { createProduct } from "./actions";
import Input from "@/components/products/add/input";
import Button from "@/components/button";

// interface ProductFormData {
//     name: string;
//     description?: string;
//     category: string;
//     unit: string;
//     currentStock: string;
//     price: string;
//     imageUrl: string;
// }

export default function AddProduct() {
    // const { register } = useForm<ProductFormData>();
    const [state, action] = useActionState(createProduct, null);
    const [preview, setPreview] = useState<null | string>(null);
    const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { files } } = e;
        if (!files) return;
        const file = files[0];

        const allowedFileTypes = ["png", "jpg", "jpeg"];
        if (allowedFileTypes.indexOf(file.type.split("/")[1]) === -1) {
            alert("file upload is only .png, .jpg, .jpeg");
            return;
        }
        if (file.size > 4000000) {
            alert("file is very big!!!!");
            return;
        }
        setPreview(URL.createObjectURL(file));
    }
    return (
        <div className="max-w-md mx-auto p-5">
            <form action={action} className='flex flex-col justify-center gap-5'>
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed
                    cursor-pointer bg-center bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: preview ? `url(${preview})` : "none"
                    }}
                >
                    {!preview ? (
                        <>
                            <p>이미지 아이콘</p>
                            {/* <PhotoIcon className="w-20" /> */}
                            <div className="text-neutral-400 text-sm">
                                사진을 추가해주세요.
                                {state?.fieldErrors.photo}
                            </div>
                        </>
                    ) : null}
                </label>
                <input
                    onChange={onImageChange}
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/*"
                    className="hidden"
                    required
                />

                <Input
                    required
                    placeholder="제품명"
                    name="name"
                    errors={state?.fieldErrors.name}
                />
                <Input
                    required
                    placeholder="제품 설명"
                    name="description"
                    errors={state?.fieldErrors.description}
                />

                <Input
                    required
                    placeholder="카테고리"
                    name="category"
                    errors={state?.fieldErrors.category}
                />
                <Input
                    required
                    type="number"
                    placeholder="수량"
                    name="unit"
                    errors={state?.fieldErrors.unit}
                />
                <Input
                    required
                    type="number"
                    placeholder="현재 수량"
                    name="currentStock"
                    errors={state?.fieldErrors.currentStock}
                />
                <Input
                    required
                    type="number"
                    placeholder="가격"
                    name="price"
                    errors={state?.fieldErrors.price}
                />
                <Button text="추가하기!" />
            </form>
        </div>
    )
}