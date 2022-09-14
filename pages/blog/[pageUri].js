
import { client } from '../../lib/apollo';
import { gql } from "@apollo/client";
import Image from "next/image"
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PostLargeImage from "../../components/PostLargeImage";

export default function BlogPage({ data }) {
    return (
        <>
            <Header />
            <div>
                <h3>{data?.title}</h3>
                <PostLargeImage imageSrcUrl={data?.featuredImage?.node?.sourceUrl} />
            </div>
            <div dangerouslySetInnerHTML={{__html: data?.content}} />
            <Footer />
        </>
    )
}

export async function getStaticProps(context) {
    const { params: { pageUri } } = context;
    const SLUG = context.params.pageUri;


    const GET_POST = gql`{
        post(id: "${SLUG}", idType: SLUG) {
          slug
          title
          content
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
        }
      }`;
    const response = await client.query({
        query: GET_POST
    });

    return {
        props: {
            data: response?.data?.post
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    };
}