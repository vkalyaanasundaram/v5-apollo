import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from '../../styles/pages/posts.module.scss';

export default function ProductsServiceSitemap({data}) {
    // console.log(data);
    return (
        <>
            <Header />
            <main className="content content-page my-10">
                <p className={styles.container}>
                    {data?.map((val, key) => (
                        console.log(val.slug),
                        <div key={key} className="mx-5">
                             <div>loc: {`${process.env.NEXT_PUBLIC_URL}/blog/${val.slug}`}</div>
                            <sup>modified: {val.modified}</sup>
                        </div>
                    ))}
                </p>
            </main>
            <Footer />
        </>
    )
}

export async function getStaticProps() {

    const postResponse = await fetch(
        "https://ada-kapitus.com/wp-json/wp/v2/products_services?per_page=20&order=asc"
    );

    const post = await postResponse.json();
    return {
        props: {
            data: post
        }
    }
}