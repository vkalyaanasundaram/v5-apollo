import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from 'scss/components/PopUpGetStarted.module.scss';
import Accordion from './FormAccordion'
import { mybusiness } from "../FormElements/Variables"
import { useForm } from "react-hook-form";



export default function MyBusiness({
    formStep,
    nextFormStep,
    prevFormStep,
    data,
    setData
}) {

    let preloadedValues = { month: localStorage.getItem('gfmonth') || '', year: localStorage.getItem('gfyear') || '' }

    const { register, handleSubmit, trigger, formState: { errors } } = useForm({
        // defaultValues: preloadedValues
    });

    let gfbusiness = localStorage.getItem('gfbusiness') || ''


    const onSubmit = (e) => {
        setTimeout(() => {
            nextFormStep()
        }, 1)
    }

    const handleClick = (e) => {

        setData({ ...data, ['business']: e.target.value })
        localStorage.setItem('gfbusiness', e.target.value)

        setTimeout(() => {
            nextFormStep()
        }, 1)
    }


    return (
        <div className={formStep == 6 ? styles.showForm : styles.hideForm}>
            {errors.business?.type == "required" && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
                <span className="text-base font-bold">
                    There was a problem with your submission. Please review the fields below.</span>
            </div>)}
            <h3 className="py-3 text-2xl text-white">Find Your Financing Match</h3>
            <form name="forms" className="forms" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${errors.business?.type == "required" ? `gfield-error` : ``}`}>
                    <label className={`py-3 text-xl font-bold gfield_label ${errors.business?.type == "required" ? `text-formred` : `text-white`}`}>I need financing for my business:</label>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {mybusiness.map((business, i) =>
                            <span className="py-3" key={i}>
                                <input type="radio" defaultChecked={business.value == gfbusiness ? true : false} {...register("business", { required: true })} id={business.id} value={business.value} onClick={handleClick} />
                                <label htmlFor={business.id} className={`ml-6 ${errors.business?.type == "required" ? `text-formred` : `text-white`}`}>{business.value}</label>
                            </span>
                        )}
                    </div>
                    {errors.business?.type == "required" && <span className="text-formred">This field is required</span>}
                </div>
                <div className="bg-white rounded p-2 mt-4">
                    <Accordion title="Why do we need this information?" content="<div>Each financing product offers different payback lengths and terms.</div>" />
                </div>
                <div className="flex bottom-12 w-full">
                    <div className="w-1/2">
                        <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
                            onClick={prevFormStep}
                            type="button"
                        >Back</button></div>
                    <div className="w-1/2 flex justify-end">
                        <input className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
                            type="submit" value="Next" />
                    </div>
                </div>
            </form>
        </div>
    );
}
