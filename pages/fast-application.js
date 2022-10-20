import FastApp from "../components/Forms/FastApp";
import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Header from "../components/Header";
import styles from '../styles/components/Header.module.scss';
import Footer from "../components/Footer";
import Images from "next/image";

export default function FastApplication() {
    const [data, setData] = useState({})
    const [value, setValue] = useState(false)
    const [trigger, setTrigger] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            //setTrigger(true)
            //document.body.style.overflowY='hidden'
        }, 5000)

        let val = localStorage.getItem("shortForm")
        setData(JSON.parse(val))
        setValue(true)
    }, [trigger])

    return (
        <>
            {/* <div className="container mx-auto">
                <Hero
                    title="BUSINESS FINANCING"
                    buttonText="GET APPROVED FAST"
                    buttonURL=""
                    button2Text=" 250K in Average Annual Revenue Required"
                    button2URL="2+ Years in Business Required
                        • 625 Credit Score"
                    bgImage="/fastAppBanner.jpeg"
                    id=""
                    slug="Fast Application"
                />
                <FastApp />
            </div>
            <Footer /> */}
            <div className="bg-kapitus py-10 px-10 m-auto w-full">
                <div className="col-span-2 mb-2 text-center text-kapitusblue text-xs font-bold">
                    <Images src="/kapitus_logo_white.jpg" alt="logo" priority layout="intrinsic" width={300} height={80} />
                </div>
                <div className={`max-w-4xl fastapp-form m-auto ${trigger ? `opacity-50` : ``}`}>
                    <div className="mt-2 px-8" style={{ background: "url(/fastAppBanner.jpeg) center center no-repeat" }}>
                        <section className="md:px-20">
                            <div>
                                <h1 className="text-left"><span className="text-white text-xl font-bold">BUSINESS LOANS GET APPROVED FAST</span></h1>
                                <h2 className="text-left"><span className="text-white text-xl font-bold">GET APPROVED FAST</span></h2>
                            </div>
                        </section>
                        <section>
                            <div className="md:pl-20 mt-4">
                                <div className="text-left"><span className="text-white">• 250K in Average Annual Revenue Required</span></div>
                                <div className="text-left"><span className="text-white">• 2+ Years in Business Required</span></div>
                                <div className="text-left"><span className="text-white">• 625 Credit Score</span></div>
                            </div>
                        </section>
                    </div>
                    {value && <FastApp fieldData={data} />}
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}