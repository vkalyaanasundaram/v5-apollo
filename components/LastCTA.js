import React from 'react';
import styles from '../styles/components/LastCTA.module.scss';
import Images from "next/image"

function LastCTA({
    title = 'Heroes Title',
    subtitle,
    description,
    id,
    bgImage,
    buttonText,
    buttonURL,
    button2Text,
    button2URL,
    children,
}) {
    return (
        <section
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...(id && { id })} className={styles.last}>
            {bgImage && <Images src={bgImage} layout="fill" objectFit="cover" />}
            <div className={styles.wrap}>
                <h3>{title}</h3>
                <p>{subtitle}</p>
                <p>{description}</p>
                <div className={styles.intro}>
                    <div className={styles.children}>
                        {children}
                    </div>
                    {buttonText && buttonURL && (
                        <p>
                            <a href={buttonURL} className="button">
                                {buttonText}
                            </a>
                        </p>
                    )}
                    {button2Text && button2URL && (
                        <p>
                            <a href={button2URL} className="button button-secondary">
                                {button2Text}
                            </a>
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
export default LastCTA;