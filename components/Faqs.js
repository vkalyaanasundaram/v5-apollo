import React, { useState } from "react";
import styles from '../styles/components/Faqs.module.scss';
import Accordion from './Accordion';

function Faqs({
    faqlists
  }) {
    const [expanded, setExpanded] = useState(0);
  
    return (
      <section className={styles.wrap}>
        <div className={styles.content}>
        <h2>FAQ</h2>
  
        {Object.values(faqlists).map((item, i) => item[0] && <Accordion key={i} i={(i+1)} question={item[0]} answer={item[1]} expanded={expanded} setExpanded={setExpanded} />)}
  
        </div>
      </section>
    );
  }
   
  export default Faqs;
  