
import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";



export default function Page({ data }) {
    return (
        <>
            <Header />
            <Hero
            title=''
            // title={page?.title() }
            bgImage={data?.featuredImage?.node.sourceUrl} />
            {/* <PostLargeImage imageSrcUrl={data?.featuredImage?.node?.sourceUrl} /> */}
            <h1>{data?.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: data?.content }} />
            <Footer />
        </>
    )
}

export async function getStaticProps(context) {

    const { params: { pageUri } } = context;
    const pageURI = context.params.pageUri;


    const GET_PAGE = gql`
    {
        page(id: "${pageURI}", idType: URI) {
          title
          slug
          content
          uri
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
  `;
    const response = await client.query({
        query: GET_PAGE
    });
    return {
        props: {
            data: response?.data?.page
        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
        // fallback: false
    };
}