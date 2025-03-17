import ProductList from '@/components/product-list';
import db from '@/lib/db';
export interface IProduct {
    id: number;
    name: string;
    description?: string;
    category: string;
    unit: string;
    currentStock: number;
    priceHistory: PriceChange[];
    stockHistory: StockChange[];
}
interface PriceChange {
    id: number;
    productId: number;
    price: number;
    date: Date;
}
interface StockChange {
    id: number;
    productId: number;
    quantity: number;
    date: Date;
}

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
        <div className='h-screen flex flex-col justify-center'>
            <div className="text-center w-full h-full absolute top-10">
                <h1 className="font-bold text-3xl">빠재고</h1>
                <p className="text-lg font-semibold">(빠르게 재고관리 해보자!)</p>
            </div>
            <ProductList products={products} />
        </div>
    );
}