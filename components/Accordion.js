import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/components/Accordion.module.scss';

function Accordion({
  i,
  expanded,
  question,
  answer,
  setExpanded
}) {

  const isOpen = i === expanded;

  return (
    <div className={styles.singleToggle} onClick={() => setExpanded(isOpen ? false : i)}>
      <button className={styles.button} /*onClick={() => setIsOpen(!isOpen)} onClick={() => setExpanded(isOpen ? false : i)} */>
        {question}
        <span className={`${styles.toggleIcon} ${isOpen ? styles.active:``}`}><span className={`${styles.icon} ${styles.vertIcon} ${isOpen ? styles.vactive:``}`}></span><span className={`${styles.icon} ${styles.horIcon}`}></span></span>
      </button><AnimatePresence>
        {isOpen && (
          <motion.main
            className={styles.contentToggle}
            style={{ overflow: "hidden" }}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            {answer}
          </motion.main>
        )}
      </AnimatePresence></div>
/*     <>
      <motion.header
        initial={false}
        animate={{ backgroundColor: isOpen ? "#FF0088" : "#0055FF" }}
        onClick={() => setExpanded(isOpen ? false : i)}
      />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            test
          </motion.section>
        )}
      </AnimatePresence>
    </> */
  );
}
 
export default Accordion;
