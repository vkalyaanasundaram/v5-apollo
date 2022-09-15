import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from '../../styles/pages/posts.module.scss';

export default function ProductsServiceSitemap({data}) {
    return (
        <>
            <Header />
            <main className="content content-page">
                <p className={styles.container}>
                    {data?.map((val, key) => (
                        <div key={key} className="mx-5">
                            <div>loc: {`${process.env.NEXT_PUBLIC_URL}/blog/${data[key].slug}`}</div>
                            <sup>modified: {data[key].modified}</sup>
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
        "https://kapstaging.com/wp-json/wp/v2/pages?per_page=50&offset=50"
    );

    const post = await postResponse.json();
    return {
        props: {
            data: post
        }
    }
}