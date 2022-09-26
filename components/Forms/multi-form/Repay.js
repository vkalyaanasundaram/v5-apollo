import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../../../styles/components/PopUpGetStarted.module.scss';
import Accordion from './FormAccordion'
import { repay } from "../FormElements/Variables";
import { useForm } from "react-hook-form";


export default function Repay({
    formStep,
    nextFormStep,
    prevFormStep,
    data,
    setData
}) {
    const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm < Inputs > ({});

    let gfpay = localStorage.getItem('gfrepayment') || ''

    const onSubmit = (e) => {
        setTimeout(() => {
            nextFormStep()
        }, 1000)
    }

    const handleClick = (e) => {
        setData({ ...data, ['repayment']: e.target.value })
        localStorage.setItem('gfrepayment', e.target.value)

        setTimeout(() => {
            nextFormStep()
        }, 1000)

    }

    return (
        <div className={formStep === 5 ? styles.showForm : styles.hideForm}>
            {errors.repayment?.type == "required" && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
                <span className="text-base font-bold">
                    There was a problem with your submission. Please review the fields below.</span>
            </div>)}
            <h3 className="py-3 text-2xl text-white">Find Your Financing Match</h3>
            <form name="forms" className="forms" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${errors.repayment?.type == "required" ? `gfield-error` : ``}`}>
                    <label className={`py-6 text-xl font-bold gfield_label ${errors.repayment?.type == "required" ? `text-formred` : `text-white`}`}>I would like to pay off my financing in:</label>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {repay.map((item, i) =>
                            <span className="py-3" key={i}>
                                <input {...register("repayment", { required: true })} type="radio" defaultChecked={item.value == gfpay ? true : false} id={item.id} value={item.value} onClick={handleClick} />
                                <label htmlFor={item.id} className={`ml-6 ${errors.repayment?.type == "required" ? `text-formred` : `text-white`}`}>{item.value}</label>
                            </span>
                        )}
                        {errors.repayment?.type == "required" && <span className="text-formred">This field is required</span>}
                    </div>
                </div>
                <div className="bg-white rounded p-2 mt-4">
                    <Accordion title="Why do we need this information?" content="<div>Each financing product offers different payback lengths and terms.</div>" />
                </div>
                <div className="flex bottom-14 w-full">
                    <div className="w-1/2">
                        <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
                            onClick={prevFormStep}
                            type="button"
                        >Back</button></div>
                    <div className="w-1/2 flex justify-end">
                        <input className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" type="submit" value="Next" />
                    </div>
                </div>
            </form>
        </div>
    );
}