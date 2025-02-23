"use client"

import { useActionState } from "react";
import { useForm } from "react-hook-form"
import { createProduct } from "./actions";

interface ProductFormData {
    name: string;
    description?: string;
    category: string;
    unit: string;
    currentStock: string;
    price: string;
}

export default function AddProduct() {
    const { register } = useForm<ProductFormData>();
    const [state, action] = useActionState(createProduct, null);
    return (
        <div>
            <form action={action} className='flex flex-col w-20 *:text-black'>
                {/* ... your form JSX ... */}
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

                <button type="submit">Add Product</button>
            </form>
        </div>
    )
}