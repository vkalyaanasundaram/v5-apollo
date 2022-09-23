import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import styles from '../../../components/PopUpGetStarted.module.scss';
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { states } from '../FormElements/Variables'
import Currencyformat from "../FormElements/formatter/currencyformat"

    
export default function Company({
  formStep,
  nextFormStep,
  prevFormStep,
  data,
  setData
  }) {

  const router = useRouter()
  
  let preloadedValues = { partner_company_name: localStorage.getItem('partner_company_name') || '', partner_company_website: localStorage.getItem('partner_company_website') || '', partner_states: localStorage.getItem('partner_states') || '', partner_zip_code: localStorage.getItem('partner_zip_code') || '' }

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    defaultValues: preloadedValues
  });

  const onSubmit = value => {
    console.log(Object.values(data).length)
    if(Object.values(data).length !== 7)  setData({ ...data, ...preloadedValues })
      setTimeout(() => {
        nextFormStep()
      }, 1000)
  }

  const handleBlur = e => {
    if(e.target.value !== '') {
      setData({ ...data, [e.target.name] : e.target.value})
      localStorage.setItem(e.target.name, e.target.value)
      trigger(e.target.name)
    }
    else {
      localStorage.removeItem(e.target.name)
    }
  }

  return (
      <div className={formStep == 1 ? styles.showForm : styles.hideForm}>
      {[errors.partner_company_name?.type, errors.partner_company_website?.type, errors.partner_zip_code?.type].includes('required')  && (<div className="font-base font-bold mb-5 border-2 border-formred rounded mt-2 py-2 px-2"><span className="text-white text-base font-bold">There was a problem with your submission. Please review the fields below.</span></div>)}
      <div className="grid justify-items-center py-6">
        <h2 className="text-white center">Sign up for the Kapitus Partner Program!</h2>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-2 gap-6 mb-4 ${errors ? `gfield-error` : ``}`}>
          <div className='col-span-2 md:col-span-1'>
          <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-lg p-2 focus:outline-none w-full" {...register("partner_company_name", { required: true })} placeholder="Company Name" type="text" onBlur={handleBlur} />
          {errors.partner_company_name?.type === 'required' && (<span className="text-formred m-2">Company Name is Required</span>)}
          </div>
          <div className='col-span-2 md:col-span-1'>
            <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-lg p-2 w-full" placeholder="Company Website" type="text" {...register("partner_company_website", { required: true })} onBlur={handleBlur} />
            {errors.partner_company_website?.type && <span className="text-formred">Company Website is required</span>}
          </div>
          <div className="col-span-2 md:col-span-1">
            <select className="w-full h-11 text-lg font-semibold bg-kapitus border-2 border-gray-300 text-white" {...register("partner_states", { required: true })} onBlur={handleBlur}>
                <option value="">States</option>
                {states.map((state, i) =>
                <option value={state} key={i}>{state}</option>)}
            </select>
            {errors.partner_states?.type === 'required' && (<span className="text-formred m-2">State is Required</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-lg p-2 w-full" placeholder="ZIP / Postal Code" type="text" {...register("partner_zip_code", { required: true, pattern: /(^\w{5}$)|(^\w{5}-\w{4}$)/ })} maxLength={5} onBlur={handleBlur} />
            {errors.partner_zip_code?.type === 'required' && (<span className="text-formred m-2">Zip Code is Required</span>)}
            {errors.partner_zip_code?.type === 'pattern' && <span className="text-formred m-2">Zip Code in valid</span> }
          </div>
        </div>
        <div className="flex bottom-10 w-full">
          <div className="w-1/2">
            <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
              onClick={prevFormStep}
              type="button"
            >Back</button>
          </div>
          <div className="w-1/2 flex justify-end">
           <input className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" type="submit" value="Next" />
          </div>
        </div>
      </form>
    </div>
  );
}
