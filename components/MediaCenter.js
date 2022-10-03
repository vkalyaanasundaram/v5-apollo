import React, { useState } from 'react';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import styles from '../styles/components/MediaCenter.module.scss';
import Images from 'next/image';
import Link from 'next/link';


export default function MediaCenter({ presscoverage, pressrelease }) {
  const [presscoverages, setPressCoverages] = useState(presscoverage);
  const [pressreleases, setPressReleases] = useState(pressrelease);


  const coverageHandler = (event) => {
    event.preventDefault();
    setPressReleases([]);
    setPressCoverages(presscoverage);
  };

  const releaseHandler = (event) => {
    event.preventDefault();
    setPressCoverages([]);
    setPressReleases(pressrelease)
  };

  const allHandler = (event) => {
    event.preventDefault();
    setPressCoverages(presscoverage);
    setPressReleases(pressrelease)
  };

  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      className={styles.hero}
    >
      <div className={styles.masonryMain}>
        <div className={styles.all}>
          <span>All</span>
        </div>
        <div className={styles.terms}>
          <Link href="/">
            <a>
              <span className={styles.sortButton}><span onClick={allHandler}>All</span></span>
            </a>
          </Link>
          <span className={styles.textSep}>/</span>
          <Link href="/">
            <a>
              <span className={styles.sortButton}><span onClick={allHandler}>Events</span></span>
            </a>
          </Link>
          <span className={styles.textSep}>/</span>
          <Link href="/">
            <a><span className={styles.sortButton}><span onClick={coverageHandler}>Press Coverages</span></span>
            </a>
          </Link>
          <span className={styles.textSep}>/</span>
          <Link href="/">
            <a><span className={styles.sortButton}><span onClick={releaseHandler}>Press Releases</span></span>
            </a>
          </Link>
        </div>
      </div>
      <div className={styles.wrap}>
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 2, 750: 3, 900: 5 }}>
          <Masonry>
            {presscoverage?.map((item, i) =>
            (
              (item.uri && item?.featuredImage?.node?.sourceUrl) && <div key={`${i}i`} className={styles.containerImage}><Link href={item?.uri} passHref><a target="_blank">
                <Images
                  className={styles.imgPad}
                  key={i}
                  src={item?.featuredImage?.node?.sourceUrl}
                  width={500}
                  height={500}
                  alt={item?.title}
                /></a></Link></div>)
            )}
            {pressrelease?.map((item, i) =>
            (
              (item.uri && item?.featuredImage?.node?.sourceUrl) && <div key={`${i}i`} className={styles.containerImage}><Link href={item?.uri} passHref><a target="_blank">
                <Images
                  className={styles.imgPad}
                  key={i}
                  src={item?.featuredImage?.node?.sourceUrl}
                  width={500}
                  height={500}
                  alt={item?.title}
                /></a></Link></div>)
            )}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </section>
  )
}