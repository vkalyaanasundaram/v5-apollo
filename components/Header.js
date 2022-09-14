import React, { useState, useEffect } from 'react';
import styles from '../styles/components/Header.module.scss';
import Link from 'next/link';
import Twitter from './icons/Twitter'
import Logo from '../components/icons/KapitusRLogoNotagWhite'
import Linkedin from './icons/Facebook'
import Youtube from './icons/Twitter'
import Facebook from './icons/Facebook'
import Instagram from './icons/Facebook'

export default function Header() {
    return (
        <>
            <div className={`${styles.topHeader} flex items-center`}>
                <ul className={styles.topList}>
                    <li >
                        <Link href="https://twitter.com/KapitusFinance">
                            <a>
                                <Twitter />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <Link href="https://www.linkedin.com/company/kapitus/">
                            <a>
                                <Linkedin />
                            </a>
                        </Link>
                    </li>
                    <li >
                        <Link href="https://twitter.com/KapitusFinance">
                            <a>
                                <Facebook />
                            </a>
                        </Link>
                    </li>
                    <li >
                        <Link href="https://www.instagram.com/kapitus_financing/">
                            <a>
                                <Instagram />
                            </a>
                        </Link>
                    </li>
                    <li >
                        <Link href="https://www.youtube.com/channel/UCvZ5ahnMH9jCnN0lP4rRROA"><a>
                            <Youtube />
                        </a>
                        </Link>
                    </li>
                </ul>
                <div className="phone-info ml-auto text-sm text-white">
                    <span><a className="header-login text-sm text-white" href="https://portal.kapitus.com/">Login </a>| Call now: <a href="tel:+18007807133" className='text-sm text-white'> (800) 780-7133</a></span></div>
            </div>
            <header>
                <div className={styles.wrap}>
                    <div className={styles['title-wrap']}>
                        <div className={styles['site-title']}>
                            <div className={styles.logoContainer}>
                                <div className={styles.desktopLogo}>
                                    <Link href={`/`} passHref>
                                        <a>
                                            {/* {title} */}
                                            <Logo width={200} height={50} viewBox="300 150 300 180" />
                                        </a>
                                    </Link>
                                    {/* <Logo LogoImg={LogoImg} Params={Params} /> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* DESKTOP MENU ITEMS */}
                    <div className={`${styles.menu}`}>
                        <ul>

                            <li>
                                <Link href={`/problems-we-solve`} passHref>
                                    Problems We Solve
                                </Link>
                            </li>
                            <li>
                                <Link href={`/products-we-offer`} passHref>
                                    Products We Offer
                                </Link>
                            </li>
                            <li>
                                <Link href={`/partner`} passHref>
                                    Partner
                                </Link>
                            </li>
                            <li>
                                <Link href={`/blog`} passHref>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href={`/the-kapitus-difference`} passHref>
                                    <a className="button">
                                        Difference
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <span id="headeroll apply-now">
                                    <Link href={`/fast-application`} passHref>
                                        <a className="button">
                                            APPLY NOW
                                        </a>
                                    </Link>
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                {/* MOBILE MENU ITEMS */}
            </header>
            {/* <Example />  */}
        </>
    )
}