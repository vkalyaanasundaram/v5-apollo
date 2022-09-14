
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../../lib/apollo';
import { gql } from "@apollo/client";
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import AdvancedHero from "../../components/AdvancedHero"

export default function IndividualProducts({ data, modelTest }) {
    return (
        <>
            <Header />
            <AdvancedHero
                title={modelTest?.mainTitle}
                indexTitle=''
                // bgImage={productsService?.heroAdvanced?.desktopBanner?.sourceUrl()}
                bgImage={data?.featuredImage?.node?.sourceUrl}
                column='two'
                slug={data?.slug}
            />
            <div dangerouslySetInnerHTML={{ __html: data?.content }}></div>
            <Footer />
        </>
    )
}

export async function getStaticProps(context) {
    const { params: { pageUri } } = context;
    const pageURI = context.params.pageUri;

    const GET_PAGE = gql`
    {
        productsService(id: "/products-services/${pageURI}", idType: URI) {
          uri
          title
          slug
          content
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
        modelTest(id: "${pageURI}", idType: SLUG) {
            mainTitle
        }
        
      }
      `;
    const response = await client.query({
        query: GET_PAGE
    });
    return {
        props: {
            data: response?.data?.productsService,
            modelTest: response?.data?.modelTest
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