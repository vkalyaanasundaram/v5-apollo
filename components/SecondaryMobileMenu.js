import { useEffect, useState, useMemo } from "react";
import styles from '../styles/components/SecondaryMenu.module.scss';
import Link from 'next/link';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useRouter } from "next/router";
import UtmParams from "./UTM/UtmParams"

export default function SecondaryMobileMenu({
    products
}) {
    let { asPath } = useRouter();
    let params = UtmParams(asPath)
    const [id, setId] = useState(0);

    // const Products = useMemo(() => {
    //     const product = () => [{ title: "business-loans", label: "Business Loans", url: `/products-services/business-loans/${params}`, id: 0 }, { title: "equipment-financing", label: "Equipment Financing", url: `/products-services/equipment-financing/${params}`, id: 1 }, { title: "helix-healthcare-financing", label: "Helix Healthcare Financing", url: `/products-services/helix-healthcare-financing/${params}`, id: 2 }, { title: "invoice-factoring", label: "Invoice Factoring", url: `/products-services/invoice-factoring/${params}`, id: 3 }, { title: "line-of-credit", label: "Line of Credit", url: `/products-services/line-of-credit/${params}`, id: 4 }, { title: "purchase-order-financing", label: "Purchase Order Financing", url: `/products-services/purchase-order-financing/${params}`, id: 5 }, { title: "revenue-based-financing", label: "Revenue Based Financing", url: `/products-services/revenue-based-financing/${params}`, id: 6 }, { title: "sba-loans", label: "SBA Loans", url: `/products-services/sba-loans/${params}`, id: 7 }];
    //     return product();
    //     // include foo's dependencies in the deps array
    // }, [params]);

    // useEffect(() => {
    //     Products.map((item) => {
    //         if (title == item.title)
    //             setId(item.id)
    //     })
    // }, [Products, title]);

    return (
        <div className={styles.SecondaryMobileMenu}>
            <Carousel showStatus={false} showThumbs={false} showIndicators={false} selectedItem={id}>
                {products?.map((item, index) =>
                    <section key={index} className={styles.slideContent}>
                        <Link href={item.uri} as={item.uri}>
                            <a>
                                <p className={styles.textContent}>{item?.title}</p>
                            </a>
                        </Link>
                    </section>
                )}
            </Carousel>
        </div>
    );
}