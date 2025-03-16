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

    const deleteProduct = async () => {
        "use server";

        // await db.product.delete({
        //     where: {
        //         id
        //     }
        // });
    }

    return (
        <div className='w-full p-5'>
            <Link href="/">
                <p>메인으로</p>
            </Link>
            <Link href="/products/add">
                <p>상품 추가</p>
            </Link>
            <table className='*:border-b text-nowrap w-full'>
                <thead>
                    <tr className='*:text-center'>
                        <th>ID</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th colSpan={2} className='max-md:hidden'>더보기</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className='border-b *:text-center *:p-2 text-md'>
                            <td>
                                <p>{product.id}</p>
                            </td>
                            <td>
                                <Link href={`/products/${product.id}`} key={product.id}>
                                    <p className='text-left'>{product.name}</p>
                                </Link>
                            </td>
                            <td>{product.currentStock}</td>
                            <td>{product.priceHistory[0].price}</td>
                            <td colSpan={2} className='max-md:hidden flex items-center justify-center gap-2'>
                                <button>수정</button>
                                <form action={deleteProduct}>
                                    <button>Delete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}