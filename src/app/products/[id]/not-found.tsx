import { headers } from "next/headers"

export default async function notFound() {
    const headerList = await headers();
    const domain = headerList.get('host');
    return (
        <div>
            <h1>Not Found, {domain}</h1>
        </div>
    )
}