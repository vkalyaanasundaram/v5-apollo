
import React, { useState, useEffect } from 'react';
import styles from '../styles/components/Advancedhero.module.scss';
import Images from "next/image"

export default function AdvancedHero({ title, indexTitle, bgImage, column, slug }) {
    return (
        <section className={`${styles.bgImage} ${styles.hero} ${column==`one` ? styles.extendPadding : styles.padding }`}>
            {bgImage && <Images src={bgImage} layout="fill" objectFit="cover" priority blurDataURL={bgImage} placeholder="blur" /> }

            {column == 'one' ? <div className={styles.wrap}>
                <div className=""
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: title ?? '' }}
                />
                <h2>{indexTitle}</h2>
                <div className={styles.intro}>
                    <div className={styles.children}>{children}</div>
                    {buttonText && buttonURL && (
                        <p>
                            <a href={buttonURL} onClick={togglePop} className="button">
                                {buttonText}
                            </a>
                        </p>
                    )}
                </div>
            </div> : (<div className={styles.wrap}>
                <div className={styles.col}>
                    <div className="" dangerouslySetInnerHTML={{ __html: title ?? '' }} />
                </div>
            </div>)}
        </section>
    )
}