export default function ProductTableHeader() {
    return (
        <thead>
            <tr className="bg-gray-100 text-gray-600 *:text-center">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">상품명</th>
                <th className="py-2 px-4 text-left">수량</th>
                <th className="py-2 px-4 text-left">가격</th>
                <th className="py-2 px-4 text-left max-md:hidden">더보기</th>
            </tr>
        </thead>
    );
}