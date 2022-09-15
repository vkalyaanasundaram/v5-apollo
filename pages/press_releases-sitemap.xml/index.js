import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from '../../styles/pages/posts.module.scss';


export default function PressRelease({ data }) {
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
                            <div>loc: {`${process.env.NEXT_PUBLIC_URL}/blog/${val.slug}`}</div>
                            <sup>modified: {val.modified}</sup>
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
        "https://ada-kapitus.com/wp-json/wp/v2/press_releases?per_page=100"
    );

    const post = await postResponse.json();
    return {
        props: {
            data: post
        }
    }
}