import { IProduct } from "@/app/products/page";
import Link from "next/link";

export default function ProductList({ products }: { products: IProduct[] }) {
    return (
        <div>
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
                    {
                        products.map((product) => (
                            <tr key={product.id} className='border-b *:text-center *:p-2 text-md hover:bg-white bg-opacity-50 hover:text-black transform hover:-translate-y-1'>
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
                                    <button>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}