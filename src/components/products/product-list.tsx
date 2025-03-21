"use client"
import { IProduct } from "@/config/types";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import ProductTableRow from "./product-table-row";
import ProductTableHeader from "./product-table-header";

export default function ProductList({ products }: { products: IProduct[] }) {
    const [keyword, setKeyword] = useState("");

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }, []);


    const filteredProducts = useMemo(() => {
        const trimKeyword = keyword.toLocaleLowerCase().replace(/\s+/g, '');
        if (trimKeyword.length < 2) return products;

        return products.filter(product => product.name.toLocaleLowerCase().includes(trimKeyword));
    }, [products, keyword]);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex w-full flex-col">
                <div className="min-w-[200px]">
                    <input className="w-full bg-transparent placeholder:text-slate-300 text-white text-sm border border-slate-400 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-50 hover:border-slate-300 shadow-sm focus:shadow" placeholder="제품 검색"
                        value={keyword}
                        onChange={onChange}
                    />
                </div>
            </div>
            <table className="w-full border-collapse">
                <ProductTableHeader />
                <tbody>
                    {filteredProducts.map((product) => (
                        <ProductTableRow key={product.id} product={product} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}