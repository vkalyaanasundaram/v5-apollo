import React from 'react';
import styles from '../styles/components/PostImage.module.scss';
import Images from 'next/image';

export default function PostImage({imageSrcUrl}) {
    return (<>{imageSrcUrl && 
        <Images src={imageSrcUrl} priority blurDataURL={imageSrcUrl} placeholder="blur" layout='responsive' width={650} height={400} className={styles.bannerImage} />
      }</>);
}