import db from "@/lib/db";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getProduct(id: number) {
    const product = await db.product.findUnique({
        where: {
            id
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
    const { id, name, description, category, unit, currentStock, imageUrl } = product;
    return (
        <div>
            <ul>
                {imageUrl && (
                    <li>
                        <Image src={imageUrl} width={1000} height={1000} alt="w" priority />
                    </li>
                )}
                <li>{id}</li>
                <li>{name}</li>
                <li>{description}</li>
                <li>{unit}</li>
                <li>{category}</li>
            </ul>
        </div>
    )
}