
import Header from "../components/Header";
import Footer from "../components/Footer";
import MediaCenter from "../components/MediaCenter";
import { useState } from "react";
import Hero from "../components/Hero";
import AdvancedHero from "../components/AdvancedHero";
import CommonCard from "../components/CommonCard";
import Carousel from "../components/Carousel";
import LastCTA from "../components/LastCTA";
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";


export default function Page({ page, modelTest, pressReleases, pressCoverages }) {
  const slug = page?.slug;
  const cardGroup = [page?.CardRows?.cardGroup1, page?.CardRows?.cardGroup2, page?.CardRows?.cardGroup3]
  const cardGroup1 = [page?.CardRows?.cardGroup4, page?.CardRows?.cardGroup5, page?.CardRows?.cardGroup6]
  const cardGroup2 = [page?.CardRows?.cardGroup7, page?.CardRows?.cardGroup8, page?.CardRows?.cardGroup9]
  const carousel = [page?.carousel?.carouselGroup1, page?.carousel?.carouselGroup2, page?.carousel?.carouselGroup3]
  return (
    <>
      <Header />
      {page?.heroAdvanced?.advancedBannerEditor &&
        <AdvancedHero
          indexTitle=''
          title={page?.heroAdvanced?.advancedBannerEditor}
          bgImage={page?.heroAdvanced?.desktopBanner?.url}
          column='one'
          slug={page?.slug}
        />
      }
      {/* Carousel  */}


      {/* Common Card */}
      {page?.CardRows?.cardMainTitle &&
        <CommonCard
          cardMainTitle={page?.CardRows?.cardMainTitle}
          cardData={cardGroup}
          cardData1={cardGroup1}
          cardData2={cardGroup2}
        />

      }
      {slug == 'media-center' && <MediaCenter presscoverage={pressCoverages} pressrelease={pressReleases} />}
      {slug == 'developer-documentation' && <DeveloperDocument />}
      {/* {data?.slug != "developer-documentation" && (
        <Hero
          title=""
          buttonText="GET IN TOUCH"
          buttonURL=""
          button2Text={null}
          button2URL=""
          bgImage={data?.featuredImage?.node?.sourceUrl}
          slug={data?.slug}
        />
      )} */}
      <main className="mx-5">
        <div dangerouslySetInnerHTML={{ __html: page?.content }} />
      </main>
      {carousel[0]?.companyTitle && <Carousel data={carousel} />}
      {page?.finalCta?.finalSectionTitle &&
        <section >
          <LastCTA
            title={page?.finalCta?.finalSectionTitle}
            subtitle={''}
            description={page?.finalCta.finalSectionDescription}
            buttonText={page?.finalCta?.finalSectionButton?.title}
            buttonURL={page?.finalCta?.finalSectionButton?.url}
          />
        </section>
      }
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
          heroAdvanced {
            mobileBanner {
              altText
              sourceUrl
            }
            desktopBanner {
              target
              title
              url
            }
            advancedBannerEditor
          }
          heroBasic {
            desktopBanner {
              title
              url
            }
            mobileBanner {
              sourceUrl
              altText
            }
          }
          CardRows {
            cardGroup1 {
              cardTitle
              cardDescription
              cardButton {
                url
                title
                target
              }
              cardIcon {
                altText
                sourceUrl
                title
              }
            }
            cardGroup2 {
              cardTitle
              cardDescription
              cardButton {
                url
                title
                target
              }
              cardIcon {
                altText
                sourceUrl
                title
              }
            }
            cardMainTitle
            cardGroup3 {
              cardTitle
              cardDescription
              cardButton {
                url
                title
                target
              }
              cardIcon {
                altText
                sourceUrl
                title
              }
            }
            cardGroup4 {
              cardTitle
              cardDescription
              cardButton {
                url
                title
                target
              }
              cardIcon {
                altText
                sourceUrl
                title
              }
            }
            cardGroup5 {
              cardTitle
              cardDescription
              cardButton {
                url
                title
                target
              }
              cardIcon {
                altText
                sourceUrl
                title
              }
            }
            cardGroup6 {
              cardTitle
              cardDescription
              cardButton {
                url
                title
                target
              }
              cardIcon {
                altText
                sourceUrl
                title
              }
            }
            cardGroup7 {
              cardTitle
              cardDescription
              cardButton {
                url
                title
                target
              }
              cardIcon {
                altText
                sourceUrl
                title
              }
            }
            cardGroup8 {
              cardTitle
              cardDescription
              cardButton {
                url
                title
                target
              }
              cardIcon {
                altText
                sourceUrl
                title
              }
            }
            cardGroup9 {
              cardTitle
              cardDescription
              cardButton {
                url
                title
                target
              }
              cardIcon {
                altText
                sourceUrl
                title
              }
            }
          }
          carousel {
            carouselGroup1 {
              companyTitle
              testimonial
              carouselImageMobile {
                altText
                sourceUrl
              }
              carouselImageDesktop {
                altText
                sourceUrl
              }
            }
            carouselGroup2 {
              companyTitle
              testimonial
              companyOwnerName
              carouselImageMobile {
                altText
                sourceUrl
              }
              carouselImageDesktop {
                altText
                sourceUrl
              }
            }
            carouselGroup3 {
              carouselImageDesktop {
                altText
                sourceUrl
              }
              carouselImageMobile {
                altText
                sourceUrl
              }
              companyTitle
              testimonial
            }
          }
          finalCta {
            finalSectionTitle
            finalSectionDescription
            finalSectionButton {
              url
              title
              target
            }
          }
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
      page: response?.data?.page,
      // modelTest: response?.data?.modelTest,
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