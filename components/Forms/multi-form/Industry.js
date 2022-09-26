/* eslint-disable @next/next/no-img-element */
import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from '../../../styles/components/PopUpGetStarted.module.scss';
import Accordion from './FormAccordion'
import { industry } from "../FormElements/Variables"
import { useForm } from "react-hook-form";



function Industry({
    formStep,
    nextFormStep,
    prevFormStep,
    data,
    setData
}) {

    const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm({});
    const [value, setValue] = useState('');
    const [gfindustry, setGfProduct] = useState(localStorage.getItem('gfindustry') || '')

    const [others, setOthers] = useState(() => {
        const val = industry.find(item => item.value.includes(gfindustry)) ? false : true
        return val
    });

    const handleBlur = (e) => {
        if (e.target.value !== '') {
            setData({ ...data, ['industry']: e.target.value })
            localStorage.setItem('gfindustry', e.target.value)
            setTimeout(() => {
                nextFormStep();
            }, 1)
        }
    }

    const handleClick = (e) => {
        if (!e.target.id.includes("others")) {
            setOthers(false)
            setData({ ...data, ['industry']: e.target.value })
            localStorage.setItem('gfindustry', e.target.value)
            setGfProduct(e.target.value)
            setTimeout(() => {
                nextFormStep();
            }, 1)
        }
        else {
            setOthers(true)
            setValue('')
            setGfProduct('')
            reset()
        }
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const onSubmit = (e) => {
        setTimeout(() => {
            nextFormStep()
        }, 1)
    }

    return (
        <div className={formStep === 2 ? styles.showForm : styles.hideForm}>
            {errors.industry?.type == "required" && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
                <span className="text-base font-bold">
                    There was a problem with your submission. Please review the fields below.</span>
            </div>)}
            <div className="grid justify-items-center"><h2 className="text-white center">Find the right financing product for you.</h2></div>
            <h3 className="py-3 text-2xl text-white">Find Your Financing Match</h3>
            <form name="forms" className="forms" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${errors.industry?.type == "required" ? `gfield-error` : ``}`}>
                    <label className={`py-6 text-xl font-bold gfield_label ${errors.industry?.type == "required" ? `text-formred` : `text-white`}`}>My Industry is:</label>
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        {industry.map((items, i) =>
                            <span className="py-3" key={i}>
                                <input type="radio" defaultChecked={items.value == gfindustry ? true : false} {...register("industry", { required: true })} id={items.id} value={items.value} onClick={handleClick} />
                                <label htmlFor={items.id} className={`ml-6 ${errors.industry?.type == "required" ? `text-formred` : `text-white`}`}>{items.value}</label>
                            </span>
                        )}
                        <span className="py-3" key="others">
                            <input type="radio" id="radio_others" {...register("industry", { required: true })} defaultChecked={others ? true : false} />
                            <input type="text" className={`ml-6 bg-kapitus border-b-2 border-white w-2/5 text-white py-2 focus:outline-none ${styles.transparent}`} {...register("industry1", { required: gfindustry ? false : (value == '' ? true : false) })} placeholder='Others' id="others" defaultValue={!industry.find(item => item.value.includes(gfindustry)) ? gfindustry : ``} onClick={handleClick} onChange={handleChange} onBlur={handleBlur} />
                        </span>
                        {errors.industry?.type == "required" && <span className="text-formred">This field is required</span>}
                    </div>
                </div>
                <div className="bg-white rounded p-2 mt-4">
                    <Accordion title="Why do we need this information?" content="<div>There are financing options created to meet the specific needs of particular industries.</div>" />
                </div>
                <div className="flex">
                    <div className="w-1/2">
                        <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
                            onClick={prevFormStep}
                            type="button"
                        >Back</button></div>
                    <div className="w-1/2 flex justify-end">
                        <input className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" type="submit" />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Industry;
