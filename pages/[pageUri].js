
import Head from 'next/head';
import Image from 'next/image';
import Header from "../components/Header";
import Footer from "../components/Footer";
import MediaCenter from "../components/MediaCenter";
import Hero from "../components/Hero";
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";
import { loadGetInitialProps } from 'next/dist/shared/lib/utils';



export default function Page({ data, pressReleases, pressCoverages }) {
  const slug = data?.slug;
  return (
    <>
      <Header />
      {data?.featuredImage?.node.sourceUrl && (
        <Hero
          title=''
          bgImage={data?.featuredImage?.node.sourceUrl} />
      )}
      <h1>{data?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: data?.content }} />
      {slug == 'media-center' && <MediaCenter presscoverage={pressCoverages} pressrelease={pressReleases} />}
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
        pressReleases(first: 100) {
            nodes {
                slug
                title
                uri
                featuredImage {
                   node {
                     sourceUrl
                   }
                }
            }
        }
        pressCoverages(first: 300) {
            nodes {
              title
              slug
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
      pressReleases: response?.data?.pressReleases,
      pressCoverages: response?.data?.pressCoverages,
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