import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from '../../styles/pages/posts.module.scss';


export default function PostSitemapOne({ data }) {
    // console.log(data);
    return (
        <>
            <Header />
            <main className="content content-page my-10">
                <div className={styles.container}>
                    {data.map((val, key) => (
                        <div key={key} className="mx-5">
                            <div>loc: {val.link}</div>
                            <sup>modified: {val.modified}</sup>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </>
    )
}

export async function getServerSideProps() {

    const postResponse = await fetch(
        "https://ada-kapitus.com/wp-json/wp/v2/posts?_fields[]=link&_fields[]=modified&per_page=100&offset=400"
    );

    const post = await postResponse.json();
    return {
        props: {
            data: post
        }
    }
}