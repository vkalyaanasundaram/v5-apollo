import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../../../styles/components/PopUpGetStarted.module.scss';
import Accordion from './FormAccordion'
import Currencyformat from "./CurrencyFormat"
import { useForm } from "react-hook-form";



export default function NeedMoney({
    formStep,
    nextFormStep,
    prevFormStep,
    data,
    setData
}) {

    const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm({
        //defaultValues: preloadedValues
    });
    const [gffund, setGffund] = useState(localStorage.getItem('gffund') || '')

    const onSubmit = (e) => {
        setTimeout(() => {
            nextFormStep()
        }, 1)
    }

    const handleChange = (event) => {
        if (event.target.value) {
            // this is where we'll call the Currencyformat function
            const formattedCurrency = Currencyformat(event.target.value);
            // we'll set the input value using our setGffund
            setGffund(formattedCurrency)
        }
    }

    const handleBlur = (e) => {
        if (e.target.value !== '') {
            setData({ ...data, ['fund']: e.target.value })
            localStorage.setItem('gffund', e.target.value)
            nextFormStep()
        }
        else
            localStorage.removeItem('gffund')
        reset()
    }

    return (
        <div className={formStep == 1 ? styles.showForm : styles.hideForm}>
            {errors.fund?.type == "required" && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
                <span className="text-base font-bold">
                    There was a problem with your submission. Please review the fields below.</span>
            </div>)}
            <div className="grid justify-items-center">
                <h2 className="text-white center">Find the right financing product for you.</h2>
            </div>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className={`flex flex-col mb-4 ${errors.fund?.type == "required" ? `gfield-error` : ``}`}>
                    <label
                        className={`py-14 text-center text-xl font-bold gfield_label ${errors.fund?.type == "required" ? `text-formred` : `text-white`}`}
                        htmlFor=""
                    >
                        How much financing do you need?
                    </label>
                    <input
                        className="border-solid border-2 text-white border-light-blue-500 h-10 bg-kapitus text-2xl p-2"
                        type="tel" {...register("fund", { required: true })}
                        onBlur={handleBlur}
                        onChange={event => handleChange(event)}
                        value={gffund} />
                    {errors.fund?.type == "required" && <span className="text-formred">This field is required</span>}
                </div>
                <div className="bg-white rounded text-xl p-2 mt-12">
                    <Accordion title="Why do we need this information?" content="<div>Each financing product has its own minimum and maximum requirements around the amount of money that can be acquired through that option.</div>" radius="" />
                </div>
                <div className="flex bottom-10 w-full">
                    <div className="w-1/2">
                        <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
                            onClick={prevFormStep}
                            type="button"
                        >Back</button>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <input
                            className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
                            type="submit" value="Next" />
                    </div>
                </div>
            </form>
        </div>
    );
}
