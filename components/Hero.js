import React, { useState, useEffect } from 'react';
import styles from '../styles/components/Hero.module.scss';
import Images from "next/image"

export default function Hero({ bgImage }) {
    return (
        <>
            {bgImage && <Images src={bgImage} layout='responsive' width={650} height={400} objectFit="cover" alt="Image" priority blurDataURL={bgImage} placeholder="blur" />}
        </>
    )
}