import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimensions";
import styles from '../../styles/components/Header.module.scss';
import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";
import Logo from "../icons/KapitusRLogoNotagWhite";
import LogoMobile from "../icons/KapitusRBugWhite";
import Link from "next/link";
import UtmParams from "../UTM/UtmParams"
import { useRouter } from "next/router";

export default function Example() {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    const LogoImg = "/images/_Kapitus_Logo_white.webp";

    let { asPath } = useRouter();
    let params = UtmParams(asPath)

    return (
        <div
            initial=""
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className={`mobile_nav ${isOpen ? `expand` : `collapse`}`}
        >
            <div className={styles.logoContainer}>
                <motion.div className="background" />
                <Link href={`/${params}`} passHref>
                    <a>
                        <LogoMobile
                            params={params}
                            width={60}
                            height={90}
                            viewBox="0 -100 140 480"
                        />
                    </a>
                </Link>
                <div className={styles.mobileBtn}>
                    <Link href="/fast-application" passHref>
                        <a>APPLY NOW</a>
                    </Link>
                </div>
            </div>
            <MenuToggle toggle={() => toggleOpen()} />
            <Navigation toggle={() => toggleOpen()} />
        </div>

        // <div>Example</div>
    )
}