
import Header from "../components/Header";
import Footer from "../components/Footer";
import MediaCenter from "../components/MediaCenter";
import { useState } from "react";
import Hero from "../components/Hero";
import AdvancedHero from "../components/AdvancedHero";
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";


export default function Page({ data, modelTest, pressReleases, pressCoverages }) {
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
          slug={data?.slug}
        />
      )}
      <main className="mx-5">
        <div dangerouslySetInnerHTML={{ __html: data?.content }} />
        {data?.slug == 'media-center' && <MediaCenter presscoverage={pressCoverages} pressrelease={pressReleases} />}
      </main>
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
        pressCoverages(first: 99) {
            nodes {
              content
              title
              link
              uri
              featuredImage {
                node {
                  sourceUrl
                }
              }
            }
        }
        pressReleases(first: 99) {
            nodes {
              content
              title
              link
              uri
              featuredImage {
                node {
                  sourceUrl
                }
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
      data: response?.data?.page,
      modelTest: response?.data?.modelTest,
      pressReleases: response?.data?.pressReleases.nodes,
      pressCoverages: response?.data?.pressCoverages.nodes
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