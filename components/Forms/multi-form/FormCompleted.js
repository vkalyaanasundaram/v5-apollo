/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../../../styles/components/PopUpGetStarted.module.scss';
 


function FormCompleted({
  formStep,
}) {

  let localdata = ['gfproduct', 'gffund', 'gfindustry', 'gfmonth', 'gfyear', 'gfcheckbox', 'gfrevenue', 'gfrepayment', 'gfbusiness', 'gfloan', 'gflender', 'gfcreditscore', 'gfpersonalinfo', 'getstarted_formstep']
  localStorage.removeItem('getstarted_formstep')
  localdata.map((item, i) => localStorage.removeItem(item))
  return (
    <div className={formStep == 10 ? styles.showForm : styles.hideForm}>
    <p>Thank you for telling us about your business! If you are not directed to our Solutions page, click here.</p>
    </div>
  );
}

export default FormCompleted;
