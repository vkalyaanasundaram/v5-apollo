import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../../../styles/components/PopUpGetStarted.module.scss';
import Accordion from './FormAccordion'
import { creditscore } from "../FormElements/Variables"
import { useForm } from "react-hook-form";


export default function CreditScore({
    formStep,
    nextFormStep,
    prevFormStep,
    data,
    setData
}) {
    console.log(data)
    const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm  ({});
    let gfcreditscore = localStorage.getItem('gfcreditscore') || ''

    const onSubmit = (e) => {
        setTimeout(() => {
            nextFormStep()
        }, 1000)
    }

    const handleClick = (e) => {
        setData({ ...data, ['creditscore']: e.target.value })
        localStorage.setItem('gfcreditscore', e.target.value)

        setTimeout(() => {
            nextFormStep()
        }, 1)
    }

    return (
        <div className={formStep == 8 ? styles.showForm : styles.hideForm}>
            {errors.creditscore?.type == "required" && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
                <span className="text-base font-bold">
                    There was a problem with your submission. Please review the fields below.</span>
            </div>)}
            <h3 className="py-3 text-2xl text-white">Find Your Financing Match</h3>
            <form name="forms" className="forms" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${errors.creditscore?.type == "required" ? `gfield-error` : ``}`}>
                    <label className={`py-3 text-xl font-bold gfield_label ${errors.creditscore?.type == "required" ? `text-formred` : `text-white`}`}>My personal credit score is:</label>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {creditscore.map((item, i) =>
                            <span className="py-3" key={i}>
                                <input {...register("creditscore", { required: true })} type="radio" defaultChecked={item.value == gfcreditscore ? true : false} id={item.id} value={item.value} onClick={handleClick} />
                                <label htmlFor={item.id} className={`ml-6 ${errors.creditscore?.type == "required" ? `text-formred` : `text-white`}`}>{item.value}</label>
                            </span>
                        )}
                    </div>
                    {errors.creditscore?.type == "required" && <span className="text-formred">This field is required</span>}
                </div>
                <div className="bg-white rounded p-2 mt-4">
                    <Accordion title="Why do we need this information?" content="<div>There are financing options for every credit type, however your personal credit score will determine your eligibility for each financing type.</div>" />
                </div>
                <div className="flex bottom-12 w-full">
                    <div className="w-1/2">
                        <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
                            onClick={prevFormStep}
                            type="button"
                        >Back</button>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <input className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" type="submit" value="Next" />
                    </div>
                </div>
            </form>
        </div>
    );
}
