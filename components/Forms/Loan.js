import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from 'scss/components/PopUpGetStarted.module.scss';
import { useForm } from "react-hook-form";

export default function Loan({
    formStep,
    nextFormStep,
    prevFormStep,
    data,
    setData
}) {

    const { register, handleSubmit, trigger, formState: { errors } } = useForm({
        // defaultValues: preloadedValues
    });

    let gfloan = localStorage.getItem('gfloan') || ''
    const [lender, setLender] = useState(gfloan == 'Yes' ? true : null);
    let gflender = localStorage.getItem('gflender') || ''


    const onSubmit = (e) => {
        //setFormValues(values);
        //let lender = document.querySelector("#choice_yes")?.checked;
        setTimeout(() => {
            nextFormStep()
        }, 1000)
    }

    const handleBlur = (e) => {
        if (e.target.value !== '') {
            setData({ ...data, ['lender']: e.target.value })
            localStorage.setItem('gflender', e.target.value)
        }
    }

    const handleClick = (e) => {
        console.log(gfloan)
        if (e.target.value == 'Yes') {
            setLender(true)
        }
        else {
            delete data['lender']
            //document.querySelector("#lender").value = ''
            localStorage.removeItem('gflender')
            setLender(false)
        }

        setData({ ...data, ['loan']: e.target.value })
        localStorage.setItem('gfloan', e.target.value)
    }


    return (
        <div className={formStep == 7 ? styles.showForm : styles.hideForm}>
            {(errors.loan?.type == "required" && lender == null) && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2"><span className="text-base font-bold">
                There was a problem with your submission. Please review the fields below.</span>
            </div>)}
            <h3 className="py-3 text-2xl text-white">Find Your Financing Match</h3>
            <form name="forms" className="forms" onSubmit={handleSubmit(onSubmit)}>
                <div className={`${errors.loan?.type == "required" && lender == null ? `gfield-error` : ``}`}>
                    <label className={`py-6 text-xl font-bold gfield_label ${errors.loan?.type == "required" && lender == null ? `text-formred` : `text-white`}`}>Do you have an existing loan?</label>
                    <div className="py-3 grid grid-cols-1 md:grid-cols-3">
                        <div className="py-2">
                            <input type="radio" {...register("loan", { required: true })} id="choice_yes" value="Yes" onClick={handleClick} defaultChecked={gfloan == 'Yes' ? true : false} />
                            <label htmlFor="choice_yes" className={`ml-6 ${errors.loan?.type == "required" && lender == null ? `text-formred` : `text-white`}`}>Yes</label>
                        </div>
                        <div className="py-2">
                            <input type="radio" {...register("loan", { required: true })} id="choice_no" value="No" onClick={handleClick} defaultChecked={gfloan == 'No' ? true : false} />
                            <label htmlFor="choice_no" className={`ml-6 ${errors.loan?.type == "required" && lender == null ? `text-formred` : `text-white`}`}>No</label>
                        </div>

                        <div className={`${lender ? `block` : `hidden`} col-span-2 flex flex-col mb-4 ${errors.loan?.type == "required" ? `gfield-error` : ``}`}>
                            <label className={`py-6 text-xl font-bold gfield_label ${errors.loan?.type == "required" ? `text-formred` : `text-white`}`} htmlFor="address">Lender Name</label>
                            <input className="border-solid border-2 border-light-blue-500 h-16 bg-kapitus text-white text-2xl" type="text" id="lender" {...register("lender", { required: gfloan == "yes" ? true : false })} onBlur={handleBlur} defaultValue={gflender} />
                        </div>
                    </div>
                    {errors.loan?.type == "required" && <div className="text-formred">This field is required</div>}
                </div>
                <div className="flex bottom-16 w-full">
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
