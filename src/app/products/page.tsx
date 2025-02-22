'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>상품 목록</h1>
            <Link href="/products/add">
                <button>상품 추가</button>
            </Link>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
}