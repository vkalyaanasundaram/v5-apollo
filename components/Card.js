import React from 'react';
import styles from '../styles/components/Card.module.scss';
import Link from 'next/link';
import Images from 'next/image';

function Card({
    cardMainTitle,
    cardGroupImg1,
    cardGroupTitle1,
    cardGroupTitle2,
    cardGroupImg2,
    cardGroupImg3,
    cardGroupTitle3,
    cardGroupBtn1,
    cardGroupBtn2,
    cardGroupBtn3
}) {
    return (
        <>
        <div className={styles.cardContainer}>
        <h2>{cardMainTitle}</h2>
        <div id={styles.CardNav} className={styles.features}>
          {/* grid one */}
          <div>
            <Link href={`/`} passHref>
              <a>
                <div className="text-center">
                {cardGroupImg1?.length > 0 && (
                  <Images
                    alt={cardGroupTitle1}
                    src={cardGroupImg1}
                    layout="intrinsic"
                    width="100"
                    height="100"
                  />
                )}
                </div>
                <div className={styles.cardTitle}>{cardGroupTitle1}</div>
              </a>
            </Link>
          </div>
          <div>
            <Link href={`/`} passHref>
              <a>
                {cardGroupImg2 && (
                  <div className="text-center">
                    <Images
                      alt={cardGroupTitle2}
                      src={cardGroupImg2}
                      layout="intrinsic"
                      width="100"
                      height="100"
                    />
                  </div>
                )}
                <div className={styles.cardTitle}>{cardGroupTitle2}</div>
            </a>
          </Link>
          </div>
          <div>
            <Link href={`/`} passHref>
            <a>
              {cardGroupImg3 && (
                <div className="text-center">
                  <Images
                    alt={cardGroupTitle3}
                    src={cardGroupImg3}
                    layout="intrinsic"
                    width="100"
                    height="100"
                  />
                </div>
              )}
              <div className={styles.cardTitle}>{cardGroupTitle3}</div>
            </a>
            </Link>
          </div>
        </div>
        
          
            
         </div>
      </>
    );
}


export default Card;