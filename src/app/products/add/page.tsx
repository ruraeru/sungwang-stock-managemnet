"use client"

import { useActionState, useState } from "react";
import { useForm } from "react-hook-form"
import { createProduct } from "./actions";

interface ProductFormData {
    name: string;
    description?: string;
    category: string;
    unit: string;
    currentStock: string;
    price: string;
    imageUrl: string;
}

export default function AddProduct() {
    const { register } = useForm<ProductFormData>();
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
        <div>
            <form action={action} className='flex flex-col max-w-sm justify-center *:text-black'>
                <label
                    htmlFor="photo"
                    className="border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed
                    cursor-pointer bg-center bg-no-repeat bg-cover"
                    style={{
                        backgroundImage: `url(${preview})`
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

                <label htmlFor="name">Name:</label>
                <input type="text" id="name" {...register("name", { required: "Name is required" })} placeholder="Name" />
                {state?.fieldErrors.name && <p>{state?.fieldErrors.name}</p>}

                <label htmlFor="description">Description:</label>
                <textarea id="description" {...register("description")} placeholder="Description" />

                <label htmlFor="category">Category:</label>
                <input type="text" id="category" {...register("category", { required: "Category is required" })} placeholder="Category" />
                {state?.fieldErrors.category && <p>{state?.fieldErrors.category}</p>}

                <label htmlFor="unit">Unit:</label>
                <input type="text" id="unit" {...register("unit", { required: "Unit is required" })} placeholder="Unit" />
                {state?.fieldErrors.unit && <p>{state?.fieldErrors.unit}</p>}

                <label htmlFor="currentStock">Current Stock:</label>
                <input type="number" id="currentStock" {...register("currentStock", { required: "Current Stock is required", valueAsNumber: true })} placeholder="Current Stock" />
                {state?.fieldErrors.currentStock && <p>{state?.fieldErrors.currentStock}</p>}

                <label htmlFor="price">Price:</label>
                <input type="number" id="price" {...register("price", { required: "Price is required", valueAsNumber: true })} placeholder="Price" />
                {state?.fieldErrors.price && <p>{state?.fieldErrors.price}</p>}

                <button type="submit" className="bg-white w-full">Add Product</button>
            </form>
        </div>
    )
}