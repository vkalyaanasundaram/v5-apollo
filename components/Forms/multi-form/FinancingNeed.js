import React, { Dispatch, SetStateAction, useState, useRef } from 'react';
import styles from 'scss/components/PopUpGetStarted.module.scss';
import Accordion from './FormAccordion'
import { useForm } from "react-hook-form";



export default function FinancingNeed({
  formStep,
  nextFormStep,
  prevFormStep,
  data,
  setData
  }) {

  const { register, handleSubmit, reset, trigger, formState: { errors } } = useForm({
    //defaultValues: preloadedValues
  });
  const products = [{value:"Cover Payroll", id:"payroll"}, {value:"Purchase/lease new equipment", id:"equipment"}, {value:"Renovations", id:"renov"}, {value:"Expand", id:"expand"}, {value:"Make repairs", id:"repairs"}, {value:"Manage my cashflow", id:"cashflow"}, {value:"Run a marketing campaign", id:"campaign"}, {value:"Pay taxes", id:"taxes"}]
  const [value, setValue] = useState('');
  const [gfproduct, setGfProduct] = useState(localStorage.getItem('gfproduct') || '')
  
  const [others, setOthers] = useState(()=> {
    const val =  products.find(item => item.value.includes(gfproduct)) ? false: true
    return val
  });


  const onSubmit = (e) => {
    if(gfproduct != '') {
      setData({ ...data, ['product'] : gfproduct})
    }
    setTimeout(() => {
      nextFormStep()
    }, 1)
  }

  const handleClick = (e) => {
    if(!e.target.id.includes("others")){
      setOthers(false)
      setData({ ...data, ['product'] : e.target.value})
      localStorage.setItem('gfproduct', e.target.value)
      setGfProduct(e.target.value)
      setTimeout(() => {
        nextFormStep()
      }, 1)
    }
    else {
      reset();
      setGfProduct('')
      setValue('')
      setOthers(true)
    }
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleBlur = (e) => {
    if(e.target.value !== '') {
      setData({ ...data, ['product'] : e.target.value})
      localStorage.setItem('gfproduct', e.target.value)
      setTimeout(() => {
        nextFormStep()
      }, 1)
    }
  }
  
  return (
      <div className={formStep === 0 ? styles.showForm : styles.hideForm}>
      {errors.finance?.type == "required" && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center"><h2 className="text-white center">Find the right financing product for you.</h2></div>
      <h3 className="py-3 text-2xl text-white ">Answer a few questions and we’ll match you with the best product based on your needs and current situations.</h3>
      <form name="forms" id="form_id" className="forms" onSubmit={handleSubmit(onSubmit)}>
        <div className={`${errors.finance?.type == "required" ? styles.gfieldError : ``}`}>
        <label className={`py-3 text-xl font-bold gfield_label ${errors.finance?.type == "required" ? `text-formred` : `text-white`}`}>I need financing to:</label>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {products.map((product, i) =>
              <span className="py-3" key={i}>
                <input type="radio" {...register("finance", { required: true })} defaultChecked={product.value == gfproduct ? true: false} id={product.id} value={product.value} onClick={handleClick} />
                <label htmlFor={product.id} className={`ml-6 ${errors.finance?.type == "required" ? `text-formred` : `text-white`}`}>{product.value}</label>
              </span>
            )}
            <span className="py-3" key="others">
              <input type="radio" id="radio_others" {...register("finance", { required: true })} defaultChecked={others?true:false} />
              <input type="text" className={`ml-6 bg-kapitus border-b-2 border-white w-2/5 text-white py-2 focus:outline-none ${styles.transparent}`} {...register("finance1", { required: gfproduct ? false : (value==''? true: false ) })} placeholder='Others' id="others" defaultValue={!products.find(item => item.value.includes(gfproduct)) ? gfproduct: ``} onClick={handleClick} onChange={handleChange} onBlur={handleBlur} />
            </span>
            {errors.finance?.type == "required" && <span className="text-formred">This field is required</span>}
          </div>
        </div>
        <div className="bg-white rounded-lg p-2 mt-4">
          <Accordion title="How it Works" content="<div>1. Answer a few questions. You let us know some basic information about your financing needs, so we can find a match.</div>
          <div>2. See your financing matches. You'll get matched with up to four financing options based on your answers.</div>
          <div>3. Apply for financing. You can apply for all of your financing options by completing one simple application and providing a few documents.</div>
          <div>4. Get an Advisor: You have the option to be assigned a financing specialist to help guide you through the application process.</div>" />
          <Accordion title="How We Make Getting Business Financing Easier for You" content="<div>If you are looking to determine the best financing option for you, our matching tool streamlines the process and arms you with information that you can use before you apply. To match you with your best options, we ask you to answer a series of basic questions about your existing and future needs, current financial health, and your financing preferences – including amount to be financed, ideal terms and financing urgency. Our system then finds you up to four financing options to fit your needs. Once you’re matched, you can expect to be contacted by one of our financing specialists to help you navigate the application and selection processes.</div>" />
        </div>
        <div className="flex">
          <div className="w-1/2"></div>
          <div className="w-1/2 flex justify-end">
          <input className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" type="submit" value="Next" />
          </div>
        </div>
      </form>
    </div>
  );
}