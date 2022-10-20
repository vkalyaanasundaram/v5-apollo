import React from 'react';
import styles from '../styles/components/Intro.module.scss';


function Intro({
    introTitle,
    subtitle,
    id,
}) {
    return (
        <section>
            <div className={styles.wrap}>
                <h2 className={styles.introTitle}>{introTitle}</h2>
                <p className={styles.subtitle}>{subtitle}</p>
            </div>
        </section>
    );
}

export default Intro;
