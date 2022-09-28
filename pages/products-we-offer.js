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
import Footer from "../components/Footer";

export default function Products({ page, username, password, products, modelTest }) {
    const router = useRouter();

    // console.log(ProductsContent?.page({id: "products-we-offer" })?.title());
    // const da = ProductsContent?.pages({ first: 100 })?.nodes;
    // const productsBanner = useQuery().modelTests().nodes;
    // let productBannerTitle = "";
    // da.map((val, key) => {
    //     if (currentSlugName == val.slug) {
    //         productsBanner.map((v) => {
    //             if (v.slug == "products-we-offer") {
    //                 productBannerTitle = v?.mainTitle;
    //             }
    //         })
    //     }
    // })




    const { observe, inView } = useInView({
        // Stop observe when the target enters the viewport, so the "inView" only triggered once
        unobserveOnEnter: true,
        // For better UX, we can grow the root margin so the image will be loaded before it comes to the viewport
        rootMargin: "50px",
    });


    return (
        <>
            {/* <SEO
        title={(generalSettings)}
        // imageUrl={mainBanner?.sourceUrl}
      /> */}
            <Header />

            {/* <SecondaryMenu products={products} /> */}
            <SecondaryMobileMenu products={products} />



            {/* {ProductsContent.map((value, key) => { */}

            <div className={styles.entry}>
                <section className={`${styles.bgImage}`} >

                    <AdvancedHero
                        title={modelTest?.mainTitle}
                        indexTitle=''
                        bgImage={page?.featuredImage?.node?.sourceUrl}
                        column='two'
                        slug={page?.slug}
                    />
                </section>
            </div>
            <div dangerouslySetInnerHTML={{ __html: page?.content }}></div>
            <section ref={observe}>{inView && <Footer
                username={username} password={password}
            />}</section>

        </>
    )
}

export async function getStaticProps() {
    const GET_PAGE = gql`
    {
        page(id: "/products-we-offer", idType: URI) {
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
