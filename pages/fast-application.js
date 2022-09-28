import FastApp from "../components/Forms/FastApp";
import Hero from "../components/Hero";
import Header from "../components/Header";
import styles from '../styles/components/Header.module.scss';
import Footer from "../components/Footer";

export default function FastApplication() {
    return (
        <>
            {/* <Header /> */}
            <div className={`${styles.topHeader} flex items-center`}>
                <main className="mx-5 my-10">
                    {/* <Hero
                        title="BUSINESS FINANCING"
                        buttonText="GET APPROVED FAST"
                        buttonURL="https://faustjs.org"
                        button2Text=" 250K in Average Annual Revenue Required"
                        button2URL="2+ Years in Business Required
                        
                        • 625 Credit Score"
                        bgImage="/public/fastAppBanner.jpeg"
                        id=""
                        slug="Fast Application"
                    /> */}
                    <p><script defer="" src="https://cdn.trustindex.io/loader.js?09a5ee4135268498715860a5eb"></script></p>
                    <FastApp />
                </main>
            </div>
            <Footer />
        </>
    )
}