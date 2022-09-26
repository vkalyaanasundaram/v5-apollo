import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../../../styles/components/PopUpGetStarted.module.scss';
import Accordion from './FormAccordion'
import Currencyformat from "./CurrencyFormat"
import { useForm } from "react-hook-form";


export default function AnnualRevenue({
  formStep,
  nextFormStep,
  prevFormStep,
  data,
  setData
  }) {

  const { register, reset, handleSubmit, trigger, formState: { errors } } = useForm({
    //defaultValues: preloadedValues
  });
    
  const [gfrevenue, setGfrevenue ] = useState(localStorage.getItem('gfrevenue') || '')

  const onSubmit = (e) => {
    setTimeout(() => {
      nextFormStep()
    }, 1)
  }

  const handleBlur = (e) => {

    if(e.target.value !== ''){
      setData({ ...data, ['revenue'] : e.target.value})
      localStorage.setItem('gfrevenue', e.target.value)
    }
    else {
      localStorage.removeItem('gfrevenue')
      reset()
    }
    trigger()
  }

  const handleChange = (event) => {
    if(event.target.value){
      // this is where we'll call the Currencyformat function
      const formattedCurrency = Currencyformat(event.target.value);
      // we'll set the input value using our setGfrevenue
      setGfrevenue(formattedCurrency)
    }
  }

  return (
    <div className={formStep == 4 ? styles.showForm : styles.hideForm}>
      {errors.revenue?.type == "required" && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center">
        <h2 className="text-white center">Find your finance match</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`flex flex-col mb-4 ${errors.revenue?.type == "required" ? `gfield-error` : ``}`}>
          <label className={`py-3 text-xl font-bold gfield_label ${errors.revenue?.type == "required" ? `text-formred` : `text-white`}`} htmlFor="address">My Annual Revenue is:</label>
          <input 
            className="border-solid border-2 border-light-blue-500 text-white h-16 bg-kapitus text-2xl p-2" 
            type="tel" {...register("revenue", { required:gfrevenue ? false:true })} onChange={event => handleChange(event)} onBlur={handleBlur} value={gfrevenue} />
          {errors.revenue?.type == "required" && <span className="text-formred">This field is required</span>}
        </div>
        <div className="bg-white rounded p-2 mt-12">
          <Accordion title="Why do we need this information?" content="<div>Each financing product has its own minimum requirement for the amount of revenue being brought into a business on either a monthly or an annual basis. In addition, your monthly and/or annual revenue can dictate the length and term on your financing option.</div>" />
        </div>

        <div className="flex bottom-12 w-full items-center">
          <div className="w-1/2 text-sm md:text-2xl text-gray-100">
            <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
              onClick={prevFormStep}
              type="button"
            >Back</button>
          </div>
          <div className="ml-auto w-1/2 flex justify-end">
          <input className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
           type="submit" value="Next" />
          </div>
        </div>
      </form>
    </div>
  );
}
