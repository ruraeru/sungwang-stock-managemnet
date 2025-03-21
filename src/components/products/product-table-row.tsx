import { IProduct } from "@/config/types";
import Link from "next/link";

export default function ProductTableRow({ product }: { product: IProduct }) {
    return (
        <tr key={product.id} className="border-b hover:bg-gray-50 hover:text-black transition duration-300 text-center">
            <td className="py-2 px-4">{product.id}</td>
            <td className="py-2 px-4">
                <Link href={`/products/${product.id}`} className="hover:underline text-left">
                    {product.name}
                </Link>
            </td>
            <td className="py-2 px-4">{product.currentStock}</td>
            <td className="py-2 px-4">{product.priceHistory[0].price}</td>
            <td className="py-2 px-4 max-md:hidden">
                <div className="flex gap-2 justify-around">
                    <button className="px-3 py-1 rounded hover:bg-gray-200">수정</button>
                    <button className="px-3 py-1 rounded hover:bg-gray-200">삭제</button>
                </div>
            </td>
        </tr>
    )
}