import db from '@/lib/db';
import Link from 'next/link';

// Product 인터페이스 정의 (타입 추가)
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

// PriceChange 인터페이스 정의 (타입 추가)
interface PriceChange {
    id: number;
    productId: number;
    price: number;
    date: Date;
}

// StockChange 인터페이스 정의 (타입 추가)
interface StockChange {
    id: number;
    productId: number;
    quantity: number;
    date: Date;
}

async function getProducts(): Promise<Product[]> {
    const products = await db.product.findMany({
        include: {
            priceHistory: true,
            stockHistory: true
        }
    });
    return products;
}

export default async function ProductList() {
    const products = await getProducts();

    return (
        <div>
            <h1>상품 목록</h1>
            <Link href="/products/add">
                <button>상품 추가</button>
            </Link>
            <table className='table-auto border-collapse w-full'>
                <thead>
                    <tr className='border-b *:p-2 *:text-center'>
                        <th>상품명</th>
                        <th>분류</th>
                        <th>설명</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className='border-b *:p-2 *:text-center'>
                            <td>
                                <Link href={`/products/${product.id}`} key={product.id}>
                                    {product.name}
                                </Link>
                            </td>
                            <td>{product.category}</td>
                            <td>{product.description}</td>
                            <td>{product.unit}</td>
                            <td>{product.priceHistory[0].price}</td>
                            <td>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}