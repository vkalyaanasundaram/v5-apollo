
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import Hero from "../components/Hero";
import AdvancedHero from "../components/AdvancedHero";
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";


export default function Page({ data, modelTest }) {
    return (
        <>
            <Header />
            {data?.slug != "developer-documentation" && (
                <Hero
                    title=""
                    buttonText="GET IN TOUCH"
                    buttonURL=""
                    button2Text={null}
                    button2URL=""
                    bgImage={data?.featuredImage?.node?.sourceUrl}
                    // id={styles.home_hero}

                    slug={data?.slug}
                />
            )}

            {/* <h1>{data?.title}</h1> */}
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
        modelTest(id: "${pageURI}", idType: URI) {
           mainTitle
        }
      }
  `;
    const response = await client.query({
        query: GET_PAGE
    });
    return {
        props: {
            data: response?.data?.page,
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