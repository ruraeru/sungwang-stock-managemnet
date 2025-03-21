import ProductList from '@/components/products/product-list';
import { IProduct } from '@/config/types';
import db from '@/lib/db';
import Link from 'next/link';

async function getProducts(): Promise<IProduct[]> {
    const products = await db.product.findMany({
        include: {
            priceHistory: true,
            stockHistory: true
        }
    });
    return products;
}

export default async function Page() {
    const products = await getProducts();
    return (
        <div className='h-screen flex flex-col'>
            <div className="text-center w-full py-10">
                <Link href="/">
                    <h1 className="font-bold text-3xl">빠재고</h1>
                    <p className="text-lg font-semibold">(빠르게 재고관리 해보자!)</p>
                </Link>
            </div>
            <div className="flex-grow">
                <ProductList products={products} />
            </div>
        </div>
    );
}