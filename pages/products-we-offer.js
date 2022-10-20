import Head from 'next/head';
import React from 'react';
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";
import styles from '../styles/pages/products-we-offer.module.scss';
import SEO from '../components/SEO/SEO'
import FastApp from '../components/Forms/FastApp'
import ErrorComponent from './404'
import SecondaryMobileMenu from "../components/SecondaryMobileMenu"
import SecondaryMenu from "../components/SecondaryMenu"
import { useInView } from "react-cool-inview";
import AdvancedHero from '../components/AdvancedHero';
import { useRouter } from 'next/router';
import Header from "../components/Header";
import LastCTA from '../components/LastCTA';
import Footer from "../components/Footer";
import CommonCard from "../components/CommonCard";
import Carousel from "../components/Carousel";
import Intro from "../components/Intro";

export default function Products({ page, username, password, products, modelTest }) {
    const router = useRouter();

    const cardGroup = [page?.CardRows?.cardGroup1, page?.CardRows?.cardGroup2, page?.CardRows?.cardGroup3]
    const cardGroup1 = [page?.CardRows?.cardGroup4, page?.CardRows?.cardGroup5, page?.CardRows?.cardGroup6]
    const cardGroup2 = [page?.CardRows?.cardGroup7, page?.CardRows?.cardGroup8, page?.CardRows?.cardGroup9]
    const carousel = [page?.carousel?.carouselGroup1, page?.carousel?.carouselGroup2, page?.carousel?.carouselGroup3]




    const { observe, inView } = useInView({
        // Stop observe when the target enters the viewport, so the "inView" only triggered once
        unobserveOnEnter: true,
        // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
        rootMargin: "50px",
    });


    return (
        <>

            <Header
                // title={generalSettings.title}
                // description={generalSettings.description}
                // metaDesc={page?.seo?.metaDesc}
                // opengraphTitle={page?.seo?.metaTitle}
                // targetKeywords={page?.seo?.targetKeywords}
                output={{}}
            />
            <SecondaryMenu title="" />
            {/* FIRST SECTION OF PAGE */}
            <AdvancedHero
                title={page?.heroAdvanced?.advancedBannerEditor}
                indexTitle=''
                bgImage={page?.heroAdvanced?.desktopBanner?.url}
                slug={page?.slug}
            />
            <section ref={observe}>
                {inView && <Intro
                    introTitle={page?.intro?.introTitle}
                    subtitle={page?.intro?.introDescription}
                />}
            </section>

            <section ref={observe}>
                {inView && <CommonCard
                    cardMainTitle={page?.CardRows?.cardMainTitle}
                    cardData={cardGroup}
                    cardData1={cardGroup1}
                    cardData2={cardGroup2}
                />}
            </section>
            <section ref={observe}>
                {inView && <Carousel data={carousel} />}
            </section>

            <section ref={observe}>
                {inView && <LastCTA
                    title={page?.finalCta?.finalSectionTitle}
                    subtitle={''}
                    description={page?.finalCta.finalSectionDescription}
                    buttonText={page?.finalCta?.finalSectionButton?.title}
                    buttonURL={page?.finalCta?.finalSectionButton?.url}
                />}
            </section>
            {/* Mobile Products */}
            {/* <Products /> */}
            <section ref={observe}>{inView && <Footer  />}</section>
        </>
    )
}

export async function getStaticProps() {
    const GET_PAGE = gql`
    {
        page(id: "/products-we-offer", idType: URI) {
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
        modelTest(id: "/products-we-offer", idType: URI) {
           mainTitle
        }
        productsServices(first: 10) {
            nodes {
              title
              slug
              uri
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
            modelTest: response?.data?.modelTest,
            products: response?.data?.productsServices?.nodes
        }
    }


}
