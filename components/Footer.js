import React from 'react';
import Link from 'next/link';
import styles from '../styles/components/Footer.module.scss';

export default function Footer() {

    const ColumnOne = [{ label: "About Us", url: `/about-us/` }, { label: "Media Center", url: `/media-center/` }, { label: "Team", url: `/about-us/#teams` }, { label: "Careers", url: "https://kapitus.breezy.hr/" }, { label: "Events", url: `/events` }, { label: "Success Stories", url: `/success-stories/` }, { label: "The Kapitus Difference", url: `/the-kapitus-difference/` }, { label: "Developer Documentation", url: `/developer-documentation/` }, { label: "Blog", url: `/blog/` }]

    const ColumnTwo = [{ label: "Products We Offer", url: `/products-we-offer/` }, { label: "Revenue Based Financing", url: `/products-services/revenue-based-financing/` }, { label: "Helix® Healthcare Financing", url: `/products-services/helix-healthcare-financing/` }, { label: "Business Loans", url: `/products-services/business-loans/` }, { label: "SBA Loans", url: `/products-services/sba-loans/` }, { label: "Line of Credit", url: `/products-services/line-of-credit/` }, { label: "Invoice Factoring", url: `/products-services/invoice-factoring/` }, { label: "Equipment Financing", url: `/products-services/equipment-financing/` }, { label: "Purchase Order Financing", url: `/products-services/purchase-order-financing/` }, { label: "Concierge Services", url: `/products-services/concierge-services/` }]

    const ColumnThree = [{ label: '(800) 780-7133', url: "tel:18007807133" }, { label: 'Contact Us', url: `/contact-us/` }]



    return (
        <footer className={styles.footer}>
            <div className="   mx-auto">
                <div className="grid md:grid-cols-4 gap-20">
                    <div className="flex justify-center p-6 text-1xl">
                        <ul>
                            {ColumnOne?.map((link) => (
                                <li key={`${link.label}$-menu`}>
                                    <Link href={link.url ?? ''}>
                                        <a href={link.url}>{link.label}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-center p-6 text-1xl">
                        <ul>
                            {ColumnTwo?.map((link) => (
                                <li key={`${link.label}$-menu`}>
                                    <Link href={link.url ?? ''}>
                                        <a href={link.url}>{link.label}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-center p-6 text-1xl">
                        <ul>
                            {ColumnThree?.map((link) => (
                                <li key={`${link.label}$-menu`}>
                                    <Link href={link.url ?? ''}>
                                        <a href={link.url}>{link.label}</a>
                                    </Link>
                                </li>
                            ))}
                            <li><Link href="/server-sitemap.xml/"><a>Sitemap</a></Link></li>
                        </ul>
                    </div>
                    <div className="flex justify-center text-1xl">
                        {/* <NewsLetter username={username} password={password} email_address={''} /> */}
                    </div>
                </div>
            </div>



            <div className={`${styles.topHeader}  `}>
                <div className={`${styles.content} `}>
                    <div className={`${styles.copyright} text-xs text-white`}>
                        Kapitus, LLC or its affiliates. All rights reserved. Kapitus, LLC, Kapitus.com, and the Kapitus logo are registered trademarks of Kapitus, Inc. or its affiliates. | Loans made in California are issued by Strategic Funding Source, Inc. dba Kapitus, pursuant to California Finance Lenders License No. 603-G807.
                    </div>
                    <ul className={`${styles.topList}`}>
                        <li className={styles.twitter}>
                            <Link href="https://twitter.com/KapitusFinance">
                                <a></a>
                            </Link>
                        </li>
                        <li className={styles.linkedin}>
                            <Link href="https://www.linkedin.com/company/kapitus/">
                                <a></a>
                            </Link>
                        </li>
                        <li className={styles.facebook}>
                            <Link href="https://twitter.com/KapitusFinance">
                                <a></a>
                            </Link>
                        </li>
                        <li className={styles.instagram}>
                            <Link href="https://www.instagram.com/kapitus_financing/">
                                <a></a>
                            </Link>
                        </li>
                        <li className={styles.youtube}>
                            <Link href="https://www.youtube.com/channel/UCvZ5ahnMH9jCnN0lP4rRROA">
                                <a></a>
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <div className={styles.wrap}>
        <p>{`© ${year} ${copyrightHolder}. All rights reserved.`}</p>
      </div> */}
            </div>
        </footer>
    )
}