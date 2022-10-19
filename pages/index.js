import Head from 'next/head'
import Image from 'next/image'
import React, { Fragment, useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Header from "../components/Header";
import Hero from "../components/Hero";
import AdvancedHero from "../components/AdvancedHero";
import Footer from "../components/Footer";
import { client } from '../lib/apollo';
import { gql } from "@apollo/client";


export default function Home({ page }) {
  const [transparent, setTransparent] = useState(false);

  return (
    // <div className={styles.container}>
    <>
      <Head>
        <title>Kapitus - Apollo GraphQL</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="mx-5 my-10">
        <>
          <Hero
            title=""
            buttonText="GET STARTED"
            buttonURL="https://faustjs.org"
            button2Text={null}
            button2URL={null}
            bgImage="https://res.cloudinary.com/dsfu88hae/image/upload/v1647389853/NewMedia/linkedin-sales-solutions-VtKoSy_XzNU-unsplash_vrlzaa.webp"
            id={styles.home_hero}

            slug="home"
          >
          </Hero>
          
          <div dangerouslySetInnerHTML={{ __html: page.content ?? "" }} />
        </>
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  const GET_HOME_PAGE = gql`{
    page(id: "/home", idType: URI) {
      title
      content
    }
  }`

  const response = await client.query({
    query: GET_HOME_PAGE
  });

  const page = response?.data?.page;

  return {
    props: {
      page,
    }
  }

}