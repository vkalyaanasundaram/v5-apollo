import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Heading from "../../../components/Heading";
import RecentPost from "../../../components/RecentPost";
import Category from "../../../components/Category.js";
import PostLargeImage from "../../../components/PostLargeImage";
import { client } from '../../../lib/apollo';
import { gql } from "@apollo/client";
import Link from "next/link";
// import styles from "../../../styles/components/Posts.module.scss";
import styles from '../../../styles/pages/posts.module.scss';


export default function Categories({
    category,
    categories,
    postMainTitleLevel,
    readMoreText = "Read more",
}) {
    return (
        <>
            <Header />
            <main className="content content-page">
                <div className="blogWrap">
                    <div className="blogContainer">
                        {category?.posts?.nodes?.map((val, key) => (
                            <div key={key}>
                                <div id={`post-${val.id}`}>
                                    <div className={styles.prime}>
                                        <PostLargeImage
                                            imageSrcUrl={val?.featuredImage?.node?.sourceUrl}
                                        />
                                        <Heading level={postMainTitleLevel} className={styles.title}>
                                            <Link href={`/blog/${val.slug}`}>
                                                <a>{val.title}</a>
                                            </Link>
                                        </Heading>
                                        <div dangerouslySetInnerHTML={{ __html: val.content ?? "" }} />
                                        <Link href={`/blog/${val.slug}`}>
                                            <a aria-label={`Read more about ${val.title || "the post"}`}>
                                                {readMoreText}
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="blogNav">
                        <RecentPost />
                        <Category categories={categories?.nodes} />
                    </div>
                </div>

            </main>
            <Footer />
        </>
    )
}

export async function getStaticProps(context) {
    const { params: { pageUri } } = context;
    const SLUG = context.params.slug;

    const GET_PAGE = gql`{
        categories(first: 99) {
            nodes {
              uri
              name
              slug
            }
        }
        category(id: "${SLUG}", idType: SLUG) {
            slug
            posts {
              nodes {
                title
                slug
                featuredImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
                content
              }
            }
        }
      }
  `;
    const response = await client.query({
        query: GET_PAGE
    });

    const category = response?.data?.category;
    const categories = response.data?.categories;

    return {
        props: {
            category: category,
            categories:categories
            
        }
    }

}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}