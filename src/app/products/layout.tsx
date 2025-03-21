export default function ProductLayout({ children, modal }: {
    children: React.ReactNode,
    modal: React.ReactNode
}) {
    return (
        <>
            {modal}
            {children}
        </>
    )
}