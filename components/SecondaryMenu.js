import Images from 'next/image'
import styles from '../styles/components/SecondaryMenu.module.scss';
import Link from 'next/link';
import { useRouter } from "next/router";
//import getSecondaryIcon from "./SecondaryIcon"
import UtmParams from "./UTM/UtmParams"

export default function SecondaryMenu({ products }) {
    return (
        <div className={styles.submenuContainer}>
            <div className={styles.subContainer}>
                <ul className={styles.subNavMenu}>
                    {products.map((item, index) => <li className={styles.menuItem} key={index}>
                        <Link href={item.uri} as={item.uri}>
                            <a className={styles.anchor}>
                                <Images src={`/images/secondary-icon/${item.title}.svg`} className={styles.imageBackground} layout="intrinsic" width="53" height="53" />
                                {/*getSecondaryIcon(item.title, title)*/}
                                <div className={styles.title}>{item.title}</div>
                            </a>
                        </Link>
                    </li>)}
                </ul>
            </div>
        </div>
    );
}