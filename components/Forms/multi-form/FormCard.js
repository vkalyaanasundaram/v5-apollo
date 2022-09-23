/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import styles from '../../../styles/components/PopUpGetStarted.module.scss';
import Cross from "../../Timesolid";
 


function FormCard({
  currentStep,
  prevFormStep,
  children,
  toggle
}) {

  let step = ['TELL US ABOUT YOUR PRIMARY FINANCING NEED', 'TELL US HOW MUCH MONEY YOU NEED FOR YOUR BUSINESS.', 'LET US KNOW INTO WHICH INDUSTRY YOUR BUSINESS FALLS.', 'TELL US HOW LONG YOU HAVE BEEN IN BUSINESS.', 'GIVE US THE APPROXIMATE AMOUNT OF REVENUE YOU ARE BRINGING IN EACH YEAR.', 'TELL US HOW LONG YOU WOULD LIKE TO HAVE TO PAY BACK THE MONEY YOU RECEIVE.', 'TELL US HOW QUICKLY YOU NEED TO OBTAIN FINANCING FOR YOUR BUSINESS.', 'TELL US HOW OFTEN YOU WILL NEED ACCESS TO ADDITIONAL MONEY FOR YOUR BUSINESS.', ' LET US KNOW THE CURRENT STATE OF YOUR CREDIT.']

  const handleClick = () => {
    localStorage.setItem('reload', `true`)
    toggle(false)
  }

  useEffect(() => {
    localStorage.setItem('getstarted_formstep', currentStep)
  }, [currentStep])
  return (
    <div className={styles.formCard}>
    {currentStep <= 11 && (
      <div className="flex items-center">
        {currentStep < 11 && <div className=" text-sm md:text-2xl text-gray-100">
          Step {currentStep+1} of 10 - {step[parseInt(currentStep)+1 ]}</div>}
        <div className="ml-auto cursor-pointer  top-0 right-0 absolute" onClick={handleClick}>
          <Cross className="cross" width={20} fill={"#fff"} />
        </div>
      </div>
    )}
      {children}
    </div>
  );
}

export default FormCard;
