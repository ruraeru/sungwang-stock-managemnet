import db from "@/lib/db";
import { formatToTimeAgo } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(id: number) {
    const product = await db.product.findUnique({
        where: {
            id
        },
        include: {
            priceHistory: true,
            stockHistory: true
        }
    });
    return product;
}

export default async function DetailProduct({ params }: { params: Promise<{ id: string }> }) {
    const paramsId = (await params).id;
    const product = await getProduct(parseInt(paramsId));

    if (product === null) {
        return notFound();
    }
    const { id, name, description, category, unit, currentStock, imageUrl, priceHistory, stockHistory } = product;
    return (
        <div className="w-full flex flex-col items-center justify-center max-w-screen-sm p-5">
            <div className="w-full">
                {imageUrl && (
                    <div className="relative aspect-square overflow-hidden">
                        <Image src={imageUrl} alt={name} fill className="object-contain" sizes="100vw" />
                    </div>
                )}
            </div>
            <div className="w-full">
                <ul className="flex flex-col items-start">
                    <li>{name}</li>
                    <li>{description}</li>
                    <li>수량: {unit}</li>
                    <li>분류: {category}</li>
                    {priceHistory.map((price) => (
                        <li key={price.id}>
                            {formatToTimeAgo(price.date.toString())} | {price.price}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}