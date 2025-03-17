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
        <div className='w-full p-5'>
            <ProductList products={products} />
        </div>
    );
}