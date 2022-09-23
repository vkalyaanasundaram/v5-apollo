import React, { useState, useRef } from "react";
import styles from 'scss/components/PopUpGetStarted.module.scss';
import Chevron  from "./Chevron";

const Accordion = (props) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");
  const content = useRef(null);

  const toggleAccordion = () => {
    setActiveState(setActive === "" ? "active1" : '')
    setHeightState(setActive === "active1" ? "0px" : `${content.current.scrollHeight}px`);
    setRotateState(
      setActive === "active1" ? "accordion__icon" : "accordion__icon rotate"
    )
  }

  return (
      <div className={styles.accordion__section}>
          <div className={`${styles.accordion} ${styles.setActive}`} onClick={toggleAccordion}>
            <p className={styles.accordion__title}>{props.title}</p>
            <Chevron className={`${setRotate}`} width={10} fill={"#a94068"} />
          </div>
          <div ref={content} style={{maxHeight: `${setHeight}`}} className={styles.accordion__content}>
            <div 
              className={`${styles.accordion__text} text-kapitus`}
              dangerouslySetInnerHTML={{ __html: props.content}}
            />  
          </div>
      </div>
  );
}

export default Accordion;