"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductForm from '@/components/ProductForm';

interface ProductFormData {
    name: string;
    description?: string;
    category: string;
    unit: string;
    currentStock: string;
    price: string;
}

export default function ProductAdd() {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        description: '',
        category: '',
        unit: '',
        currentStock: '',
        price: '',
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create product');
            }

            const data = await response.json();
            console.log('Product created:', data);
            router.push('/products');
        } catch (error) {
            console.error('Failed to create product:', error);
            alert(`상품 추가에 실패했습니다: ${error.message}`);
        }
    };

    return (
        <div>
            <h1>상품 추가</h1>
            <ProductForm />
        </div>
    );
}