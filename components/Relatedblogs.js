import React from "react";
import styles from '../styles/components/Relatedblogs.module.scss';
 

function Rlatedblogs({
    relatedblogs
}) {

// const bloglists = [{src:relatedblogs?.relatedSinglePost1?.relatedSingleImage?.sourceUrl(), title: relatedblogs?.relatedSinglePost1?.relatedSingleTitle, desc: relatedblogs?.relatedSinglePost1?.relatedSingleDescription, link: relatedblogs?.relatedSinglePost1?.relatedSingleLink?.url}]

// bloglists.push({src:relatedblogs?.relatedSinglePost2?.relatedSingleImage?.sourceUrl(), title: relatedblogs?.relatedSinglePost2?.relatedSingleTitle, desc: relatedblogs?.relatedSinglePost2?.relatedSingleDescription, link:relatedblogs?.relatedSinglePost2?.relatedSingleLink?.url})

  return (
    <section className={styles.wrap}>
      <div className={styles.outerBorder}><span className={styles.innerBorder}><span className={styles.innerStyle}></span></span></div>
      <div className={styles.content}>
        <div 
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: relatedblogs?.relatedBlogEditor }}
          />
      </div>
    </section>
  );
}
 
export default Rlatedblogs;
