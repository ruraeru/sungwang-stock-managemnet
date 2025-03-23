"use client"

import { ProductType } from "@/config/types";
import { AddProducts } from "@/lib/addProducts";
import { redirect } from "next/navigation";
import React, { ChangeEvent, useCallback, useState } from "react";

function ProductInfoChangeForm({ initialProductData }: { initialProductData: ProductType[] }) {
    const [productData, setProductData] = useState<ProductType[]>(initialProductData);

    const onChangeInfo = useCallback((e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;

        setProductData(prevData => {
            return prevData.map((item, itemIndex) => {
                if (index === itemIndex) {
                    return { ...item, [name]: value };
                }
                return item;
            });
        });
    }, []);

    const onUpload = useCallback(async () => {
        if (await AddProducts(productData)) {
            alert("업로드 성공!");
            redirect("/products");
        }
    }, [productData]);
    return (
        <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-5">
                {productData.map((item, index) => (
                    <div key={index} className="bg-gray-700 *:text-black w-full p-2 *:w-full flex flex-col gap-2">
                        <div className="flex flex-col">
                            <label>이름</label>
                            <input value={item.productName} name="productName" onChange={(e) => onChangeInfo(e, index)} />
                        </div>
                        <div className="flex flex-col">
                            <label>수량</label>
                            <input value={item.quantity} name="quantity" onChange={(e) => onChangeInfo(e, index)} />
                        </div>
                        <div className="flex flex-col">
                            <label>합계 가격</label>
                            <input disabled value={parseInt(item.unitPrice) * parseInt(item.quantity)} name="totalPrice" onChange={(e) => onChangeInfo(e, index)} />
                        </div>
                        <div className="flex flex-col">
                            <label>단가</label>
                            <input value={item.unitPrice} name="unitPrice" onChange={(e) => onChangeInfo(e, index)} />
                        </div>
                    </div>
                ))
                }
            </div>
            <button onClick={onUpload} className="h-10 
        disabled:bg-neutral-400
         disabled:text-neutral-300
         disabled:cursor-not-allowed
         w-full bg-cyan-500 text-white font-medium rounded-md
         text-center hover:bg-cyan-400 transition-colors">업로드 하기!</button>
        </div>
    );
}

export default React.memo(ProductInfoChangeForm);