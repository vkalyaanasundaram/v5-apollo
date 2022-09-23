import React, { useState, SetStateAction, Dispatch } from "react";
import { useRouter } from "next/router";
import styles from '../../../styles/components/PopUpGetStarted.module.scss';
import { useForm } from "react-hook-form";



export default function Program({
    formStep,
    nextFormStep,
    prevFormStep,
    data,
    setData
    }) {
  const router = useRouter()

  let partners = ['Sales Partner', 'Referral Partner', 'Processing Partner', 'Not Sure/Other']
  let partner_program = localStorage.getItem('partner_program') || ''
  const [formData, setFormData] = useState( partner_program ? { ['partner_program'] : partner_program } : []);

  let preloadedValues = { partner_program: localStorage.getItem('partner_program') || '' }

  const { register, handleSubmit, trigger, formState: { errors } } = useForm<Inputs>({
    //defaultValues: preloadedValues
  });

  const onSubmit = value => {
    if(Object.values(data).length !== 8) setData({ ...data, ...preloadedValues })

    setTimeout(() => {
      nextFormStep()
    }, 1000)
  }

  const handleClick = (e) => {
    if(e.target.value) {
      setData({...data, [e.target.name] : e.target.value})
      localStorage.setItem(e.target.name, e.target.value)
      trigger()
      nextFormStep
    }
  }

  return (
    <div className={formStep == 2 ? styles.showForm : styles.hideForm}>
      {errors.partner_program?.type && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-white text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center py-6"><h2 className="text-white center">Sign up for the Kapitus Partner Program!</h2></div>
      <label className={`text-xl font-bold gfield_label ${errors.partner_program?.type ? `text-formred` : `text-white`}`}>I would like to join the Kapitus Program as a:</label>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${errors.partner_program?.type ? `gfield-error` : ``}`}>
          {partners.map((partner, i) =>
            <span className="py-1" key={i}>
              <input type="radio" defaultChecked={partner == partner_program ? true:false} id={partner.replace(' ','')} {...register('partner_program', { required: true })} value={partner} onClick={handleClick} />
              <label htmlFor={partner.replace(' ','')} className={`ml-6 ${errors.partner_program?.type ? `text-formred` : `text-white`}`}>{partner}</label>
            </span>
          )}
          {errors.partner_program?.type === 'required' && (<span className="text-formred m-2">This is Required</span>)}
        </div>
        <div className="flex">
        <div className="w-1/2">
          <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
            onClick={prevFormStep}
            type="button"
          >Back</button></div>
        <div className="w-1/2 flex justify-end">
        <input className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" type="submit" value="Next" />
        </div>
        </div>
      </form>
    </div>
  );
}
