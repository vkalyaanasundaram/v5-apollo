import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../../../styles/components/PopUpGetStarted.module.scss';
import { useForm } from "react-hook-form";



export default function You({
    formStep,
    nextFormStep,
    prevFormStep,
    data,
    setData
    }) {

  let preloadedValues = { partner_first_name: localStorage.getItem('partner_first_name') || '', partner_last_name: localStorage.getItem('partner_last_name') || '', partner_title: localStorage.getItem('partner_title') || '' }

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    defaultValues: preloadedValues
  });

  const onSubmit = value => {
    Object.values(data).length == 3 ? setData({ ...data }) : setData({ ...preloadedValues })
    setTimeout(() => {
      nextFormStep()
    }, 1000)
  }

  const handleBlur = e => {
    const value = e.target.value
    if(value !== '') {
      setData({ ...data, [e.target.name] : value})
      localStorage.setItem(e.target.name, value)
      //nextFormStep()
    }
    else {
      localStorage.removeItem(e.target.name)
    }
  }

  return (
      <div className={formStep == 0 ? styles.showForm : styles.hideForm}>
      {[errors.partner_first_name?.type, errors.partner_last_name?.type, errors.partner_title?.type].includes('required')  && (<div className="font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-white text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center py-6">
        <h2 className="text-white center">Sign up for the Kapitus Partner Program!</h2>
      </div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div className={`grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:grid-cols-2 gap-6 mb-4 ${errors ? `gfield-error` : ``}`}>
          <div className='col-span-2 md:col-span-1'>
          <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-xl p-2 focus:outline-none w-full" {...register("partner_first_name", { required: true })} placeholder="First name" type="text" onBlur={handleBlur} />
          {errors.partner_first_name?.type === 'required' && (<span className="text-formred m-2">First Name is Required</span>)}
          </div>
          <div className='col-span-2 md:col-span-1'>
            <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-xl p-2 w-full" placeholder="Last name" type="text" {...register("partner_last_name", { required: true })} onBlur={handleBlur} />
            {errors.partner_last_name?.type && <span className="text-formred">Last Name is required</span>}
          </div>
          <div className="col-span-2">
            <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-xl p-2 w-full" placeholder="Title" type="text" {...register("partner_title", { required: true })} onBlur={handleBlur} />
            {errors.partner_title?.type === 'required' && (<span className="text-formred m-2">Title is Required</span>)}
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2">
          </div>
          <div className="w-1/2 flex justify-end">
           <input className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" type="submit" value="Next" />
          </div>
        </div>
      </form>
    </div>
  );
}
