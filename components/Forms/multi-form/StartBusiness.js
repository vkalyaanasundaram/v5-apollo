import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from 'scss/components/PopUpGetStarted.module.scss';
import Accordion from './FormAccordion'
import { useForm } from "react-hook-form";


function StartBusiness({
    formStep,
    nextFormStep,
    prevFormStep,
    data,
    setData
  }) {

  let preloadedValues = { month: localStorage.getItem('gfmonth') || '', year: localStorage.getItem('gfyear') || '' }
  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    defaultValues: preloadedValues
   });

  const [emonth, setEmonth] = useState(null);
  const [eyear, setEyear] = useState(null);

  let gfcheckbox = localStorage.getItem('gfcheckbox') || ''
  const [checkbox, setCheckbox] = useState(gfcheckbox=='Yes' ? true: null);

  let gfmonth = localStorage.getItem('gfmonth') || ''
  let gfyear = localStorage.getItem('gfyear') || ''

  const month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', 10, 12]
  const year = [2022, 2021, 2020, 2019]

  const onSubmit = (e) => {
    setTimeout(() => {
      setEmonth(null)
      setEyear(null)
      nextFormStep()
    }, 1000)
  }

  const handleChange = (e) => {

    if(e.target.value !== ''){
        setData({ ...data, [e.target.name] : e.target.value });
        localStorage.setItem('gf'+e.target.name, e.target.value)
    }
    else {
      if(e.target.checked){
        setCheckbox(true)
        localStorage.setItem('gfcheckbox', e.target.value)
        setData({ ...data, ['checkbox'] : e.target.value });
      }
      else {
        setCheckbox(false)
        localStorage.removeItem('gfcheckbox')
        delete data['checkbox']
      }
    }
    trigger(e.target.name)
  }

  const handleBlur = (e) => {
    if(e.target.value == ''){
      //delete formData[e.target.id]
      //delete setData[e.target.id]
    }
    
/*       setTimeout(() => {
        setEmonth(null)
        setEyear(null)
        nextFormStep
      }, 1000) */
  }

  const transition = {
    delay: .9,
    duration: 0.7,
    type: "spring"
  };

  const transVariants = {
    initial: { opacity: 0, top: "100vh", scale: 0.4, transition: { transition } },
    animate: { opacity: 1, top: "0vh", scale: 1, transition: { transition } },
    exit: { opacity: 0, top: "100vh", scale: 0.4, transition: { transition } }
  };

  return (
    <div  className={formStep === 3 ? styles.showForm : styles.hideForm}>
      {emonth && eyear && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center">
        <h2 className="text-white center">Find your financing match</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`flex flex-col mb-4 ${emonth !== null && eyear !== null ? `gfield-error` : ``}`}>
          <label className="py-6 text-white text-xl font-bold gfield_label" htmlFor="address">I started my business on:</label>
          <div className="flex w-full">
            <div>
              <select className="w-32 px-4 py-2 mt-2 mr-4 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 placeholder-kapitus" {...register("month", { required: true })} onChange={event => handleChange(event)}>
                <option value="">Month</option>
                {month.map((option, i) => <option value={option} key={i}>{option}</option>)}
              </select>
              {errors.month?.type == "required" && <div className="text-formred">Month is required</div>}
            </div>
            <div>
              <select className="w-32 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 placeholder-kapitus" {...register("year", { required: true })} onChange={event => handleChange(event)}>
                <option value="">Year</option>
                {year.map((option, i) =>
                <option value={option} key={i}>{option}</option>)}
              </select>
              {errors.year?.type == "required" && <div className="text-formred">Year is required</div>}
            </div>
          </div>
          <div className="flex mt-4">
            <input className="gfield-choice-input mt-1" id="yes" type="checkbox" value="I do not have a business" onChange={(e) => handleChange(e)}  />
            <label htmlFor="yes" className="ml-4 text-white">I do not have a business</label>
          </div>
          <div className={`mt-4 text-white ${checkbox ? `block`: `hidden`}`}>
            Thank you for reaching out to Kapitus. Unfortunately, our financing products are only available for existing businesses and we will not be able to help you at this time.
          </div>
        </div>
        <div className="bg-white rounded p-2 mt-4">
          <Accordion title="Why do we need this information?" content="<div>Each financing product has its own minimum and maximum requirements around the amount of money that can be acquired through that option.</div>" />
        </div>
        <div className="flex bottom-12 w-full">
          <div className="w-1/2">
            <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
              onClick={prevFormStep}
              type="button"
            >Back</button>
          </div>
          <div className="w-1/2 flex justify-end">
          <input className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
           type="submit" value="Next" />
          </div>
        </div>
      </form>
      </div>
  );
}

export default StartBusiness;