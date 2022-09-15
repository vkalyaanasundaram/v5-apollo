import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from '../../styles/pages/posts.module.scss';

export default function ProductsServiceSitemap({ data }) {
    return (
        <>
            <Header />
            <main className="content content-page my-10">
                {data?.data?.status == "404" ? (
                    <div className="my-10 mx-5">No Result Found</div>
                ) : (
                    <p className={styles.container}>
                        {data?.map((val, key) => (
                            <div key={key} className="mx-5">
                                <div>loc: {`${process.env.NEXT_PUBLIC_URL}/blog/${data[key].slug}`}</div>
                                <sup>modified: {data[key].modified}</sup>
                            </div>
                        ))}
                    </p>
                )}
            </main>
            <Footer />
        </>
    )
}

export async function getStaticProps() {

    const postResponse = await fetch(
        "https://ada-kapitus.com/wp-json/wp/v2/team_members?per_page=50"
    );

    const post = await postResponse.json();
    return {
        props: {
            data: post
        }
    }
}