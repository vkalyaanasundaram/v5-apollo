import Link from "next/link";

export default function CategoryComponent({ categories }) {
    return (
        <>
            <div>Category</div>
            {categories?.map((val, key) => (
                <div key={key}>
                    <Link href={val?.uri} passHref>
                        {val?.name}
                    </Link>
                </div>
            ))}
        </>
    )
}