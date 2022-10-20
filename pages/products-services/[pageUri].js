
import Head from 'next/head';
import Image from 'next/image';
import { client } from '../../lib/apollo';
import { gql } from "@apollo/client";
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import AdvancedHero from "../../components/AdvancedHero"
import CommonCard from "../../components/CommonCard"
import Carousel from "../../components/Carousel"
import Intro from "../../components/Intro"
import SecondaryMenu from "../../components/SecondaryMenu"
import Faqs from "../../components/Faqs"
import Relatedblogs from "../../components/Relatedblogs"

export default function IndividualProducts({ productsService, modelTest }) {
    const faqlists = { faq1: [productsService?.faqSection?.faqGroup1?.faqQuestion, productsService?.faqSection?.faqGroup1?.faqAnswer], faq2: [productsService?.faqSection?.faqGroup2?.faqQuestion, productsService?.faqSection?.faqGroup2?.faqAnswer], faq3: [productsService?.faqSection?.faqGroup3?.faqQuestion, productsService?.faqSection?.faqGroup3?.faqAnswer], faq4: [productsService?.faqSection?.faqGroup4?.faqQuestion, productsService?.faqSection?.faqGroup4?.faqAnswer], faq5: [productsService?.faqSection?.faqGroup5?.faqQuestion, productsService?.faqSection?.faqGroup5?.faqAnswer], faq6: [productsService?.faqSection?.faqGroup6?.faqQuestion, productsService?.faqSection?.faqGroup6?.faqAnswer], faq7: [productsService?.faqSection?.faqGroup7?.faqQuestion, productsService?.faqSection?.faqGroup7?.faqAnswer] }

    const cardGroup = [productsService?.CardRows?.cardGroup1, productsService?.CardRows?.cardGroup2, productsService?.CardRows?.cardGroup3]
    const cardGroup1 = [productsService?.CardRows?.cardGroup4, productsService?.CardRows?.cardGroup5, productsService?.CardRows?.cardGroup6]
    const cardGroup2 = [productsService?.CardRows?.cardGroup7, productsService?.CardRows?.cardGroup8, productsService?.CardRows?.cardGroup9]

    const carousel = [productsService?.carousel?.carouselGroup1, productsService?.carousel?.carouselGroup2, productsService?.carousel?.carouselGroup3]
    return (
        <>
            <Header />
            <SecondaryMenu title={productsService?.slug} />
            <AdvancedHero
                title={productsService?.heroAdvanced?.advancedBannerEditor}
                indexTitle=''
                // bgImage={productsService?.heroAdvanced?.desktopBanner?.sourceUrl()}
                bgImage={productsService?.heroAdvanced?.desktopBanner?.url}
                column='two'
                slug={productsService?.slug}
            />
            {(productsService?.CardRows?.cardGroup1?.cardTitle ) &&
                <CommonCard
                    cardMainTitle={productsService?.CardRows?.cardMainTitle}
                    cardData={cardGroup}
                    cardData1={cardGroup1}
                    cardData2={cardGroup2}
                />
            }
            {productsService?.intro?.introTitle &&
                <section>
                    <Intro
                        introTitle={productsService?.intro?.introTitle}
                        subtitle={productsService?.intro?.introDescription}
                    />
                </section>
            }
            <div
                className="wrap products_servicesh2"
                dangerouslySetInnerHTML={{ __html: productsService?.edit?.blockSectionBuilderEditor }}
            />
            <Carousel data={carousel} />
            {productsService?.faqSection?.faqTitle &&
                <section>
                    <Faqs faqlists={faqlists} />
                </section>
            }
            {productsService?.relatedBlogPosts?.relatedBlogEditor &&
                <section>
                    <Relatedblogs relatedblogs={productsService?.relatedBlogPosts} />
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
        productsService(id: "/products-services/${pageURI}", idType: URI) {
          uri
          title
          slug
          heroAdvanced {
            advancedBannerEditor
            desktopBanner {
              url
              title
            }
          }
          intro {
            introTitle
            introDescription
          }
          edit {
            blockSectionBuilderEditor
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
          faqSection {
            faqGroup1 {
              faqAnswer
              faqQuestion
              fieldGroupName
            }
            faqGroup2 {
              faqAnswer
              faqQuestion
              fieldGroupName
            }
            faqGroup3 {
              faqAnswer
              faqQuestion
              fieldGroupName
            }
            faqGroup4 {
              faqQuestion
              faqAnswer
              fieldGroupName
            }
            faqGroup5 {
              faqAnswer
              faqQuestion
              fieldGroupName
            }
            faqGroup6 {
              faqAnswer
              faqQuestion
              fieldGroupName
            }
            faqGroup7 {
              faqAnswer
              faqQuestion
              fieldGroupName
            }
            faqTitle
            fieldGroupName
          }
          relatedBlogPosts {
            relatedBlogEditor
            fieldGroupName
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
            productsService: response?.data?.productsService,
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