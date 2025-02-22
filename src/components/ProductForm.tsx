'use client';

import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

// Product interface 정의 (타입 추가)
interface Product {
    id: number;
    name: string;
    description?: string;
    category: string;
    unit: string;
    currentStock: number;
    priceHistory: PriceChange[];
    stockHistory: StockChange[];
}

// PriceChange interface 정의 (타입 추가)
interface PriceChange {
    id: number;
    productId: number;
    price: number;
    date: string;
}

// StockChange interface 정의 (타입 추가)
interface StockChange {
    id: number;
    productId: number;
    quantity: number;
    date: string;
}

// ProductFormData interface 정의 (타입 추가)
interface ProductFormData {
    name: string;
    description?: string;
    category: string;
    unit: string;
    currentStock: string;
    price: string;
}

export default function ProductForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<ProductFormData>({
        defaultValues: {
            name: '',
            description: '',
            category: '',
            unit: '',
            currentStock: '',
            price: '',
        },
    });

    const onSubmit: SubmitHandler<ProductFormData> = async (data) => {
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create product');
            }

            const responseData: Product = await response.json(); // 응답 데이터 타입 지정
            console.log('Product created:', responseData);
            router.push('/products');
        } catch (error) {
            console.error('Failed to create product:', error);
            alert(`상품 추가에 실패했습니다: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-20 *:text-black'>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" {...register("name", { required: "Name is required" })} placeholder="Name" />
            {errors.name && <p>{errors.name.message}</p>}

            <label htmlFor="description">Description:</label>
            <textarea id="description" {...register("description")} placeholder="Description" />

            <label htmlFor="category">Category:</label>
            <input type="text" id="category" {...register("category", { required: "Category is required" })} placeholder="Category" />
            {errors.category && <p>{errors.category.message}</p>}

            <label htmlFor="unit">Unit:</label>
            <input type="text" id="unit" {...register("unit", { required: "Unit is required" })} placeholder="Unit" />
            {errors.unit && <p>{errors.unit.message}</p>}

            <label htmlFor="currentStock">Current Stock:</label>
            <input type="number" id="currentStock" {...register("currentStock", { required: "Current Stock is required", valueAsNumber: true })} placeholder="Current Stock" />
            {errors.currentStock && <p>{errors.currentStock.message}</p>}

            <label htmlFor="price">Price:</label>
            <input type="number" id="price" {...register("price", { required: "Price is required", valueAsNumber: true })} placeholder="Price" />
            {errors.price && <p>{errors.price.message}</p>}

            <button type="submit">Add Product</button>
        </form>
    );
}