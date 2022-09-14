import React from 'react';
import styles from '../styles/components/PostImage.module.scss';
import Images from 'next/image';

export default function PostLargeImage({imageSrcUrl}) {
    return (
        <div className={styles.bgContainer}>
            {imageSrcUrl && <Images src={imageSrcUrl} blurDataURL={imageSrcUrl} placeholder="blur" layout='responsive' width={1050} height={510} className={styles.largeBanner} />}
        </div>
    )
}