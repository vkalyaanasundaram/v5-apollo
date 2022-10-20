import Images from 'next/image'
import styles from '../styles/components/SecondaryMenu.module.scss';
import Link from 'next/link';
import { useRouter } from "next/router";
//import getSecondaryIcon from "./SecondaryIcon"
import UtmParams from "./UTM/UtmParams"

function SecondaryMenu({ products, title }) {

    let { asPath } = useRouter();
    let params = UtmParams(asPath)
    const Products = [
        { title: "business-loans", label: "Business Loans", url: `/products-services/business-loans/${params}` },
        { title: "equipment-financing", label: "Equipment Financing", url: `/products-services/equipment-financing/${params}` },
        { title: "helix-healthcare-financing", label: "Helix Healthcare Financing", url: `/products-services/helix-healthcare-financing/${params}` },
        { title: "invoice-factoring", label: "Invoice Factoring", url: `/products-services/invoice-factoring/${params}` },
        { title: "line-of-credit", label: "Line of Credit", url: `/products-services/line-of-credit/${params}` },
        { title: "purchase-order-financing", label: "Purchase Order Financing", url: `/products-services/purchase-order-financing/${params}` },
        { title: "revenue-based-financing", label: "Revenue Based Financing", url: `/products-services/revenue-based-financing/${params}` },
        { title: "sba-loans", label: "SBA Loans", url: `/products-services/sba-loans/${params}` }
    ]


    return (
        <div className={styles.submenuContainer}>
            <div className={styles.subContainer}>
                <ul className={styles.subNavMenu}>
                    {Products.map((item, index) => {
                        <li className={styles.menuItem} key={index}>

                            <Link href={item.url} as={item.url}>
                                <a className={styles.anchor}>
                                    <Images src={`/images/secondary-icon/${item.title}.svg`}
                                        className={title == item.title ? styles.imageBackground : ``}
                                        layout="intrinsic" width="53" height="53"
                                    />
                                    {/*getSecondaryIcon(item.title, title)*/}
                                    <div className={styles.title}>{item.label}</div></a>
                            </Link>
                        </li>
                    }
                    )}
                </ul>
            </div>
        </div>
    );
}

export default SecondaryMenu;