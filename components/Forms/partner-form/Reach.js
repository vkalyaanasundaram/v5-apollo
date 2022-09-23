import React, { useState, SetStateAction, Dispatch  } from "react";
import styles from '../../../styles/components/PopUpGetStarted.module.scss';
import { useForm } from "react-hook-form";
import axios from 'axios'
import { partnerData } from '../FormElements/Variables'
import Phoneformat from "../FormElements/formatter/phonenumber"
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Base64 } from 'js-base64'


    
export default function Reach({
  formStep,
  nextFormStep,
  prevFormStep,
  data,
  setData,
  username,
  password
  }) {
  const [verify, setVerify] = useState(false)
  const [hcaptcha, setHcaptcha] = useState(false)
  const [phone, setPhone] = useState("")
  let preloadedValues = { partner_email: localStorage.getItem('partner_email') || '', partner_phone: localStorage.getItem('partner_phone') || '' }

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    defaultValues: preloadedValues
  });

  const handleBlur = e => {

    if(e.target.value !== '') {
      setData({ ...data, [e.target.name] : e.target.value})
      localStorage.setItem(e.target.name, e.target.value)
    }
    else {
      localStorage.removeItem(e.target.name)
    }
    trigger(e.target.name)
  }

  const handleChange = (e) => {
    // this is where we'll call the Phonenumber function
    const formattedPhoneNumber = Phoneformat(e.target.value);
    // we'll set the input value using our setPhone
    setPhone(formattedPhoneNumber)
  }

  const onSubmit = value => {
    if(!verify)
    return
    if(Object.values(data).length !== 10)  setData({ ...data, ...preloadedValues })
    let finaldata = {}
    console.log(data)
    Object.keys(data).forEach( item => {
      finaldata[partnerData[item]] = data[item];
    })
    finaldata['form_id'] = 32;

    const auth = Base64.btoa(`${username}:${password}`);
    let config = { headers: { 'authorization': `${auth}` } }
    axios
    .post(process.env.NEXT_PUBLIC_SHORT_FORM, {"form_data": finaldata}, config)
    .then(response => {
      let result = response.data
      setTimeout(() => {
        nextFormStep();
      }, 1)
    });
  }
	const handleVerify = (event) => {
    console.log('Captcha value:', event);
    setVerify(true)
  }
  
  const handleExpire = () => {
    console.log("hCaptcha Token Expired");
    setVerify(false)
  }
  const handleFocus = () => {
    setHcaptcha(true)
  }
  return (
    <div className={formStep == 3 ? styles.showForm : styles.hideForm}>
      {(errors.partner_email?.type && errors.partner_phone?.type) && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
        <span className="text-white text-base font-bold">
        There was a problem with your submission. Please review the fields below.</span>
      </div>)}
      <div className="grid justify-items-center py-6"><h2 className="text-white center">Sign up for the Kapitus Partner Program!</h2></div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`py-6 text-xl font-bold gfield_label ${(errors.partner_email?.type && errors.partner_phone?.type) ? `text-formred` : `text-white`}`}>I would like to join the Kapitus Program as a:</div>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${errors.partner_program?.type ? `gfield-error` : ``}`}>
          <div className='col-span-2 md:col-span-1 '>
            <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-lg p-2 focus:outline-none w-full" {...register("partner_email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="Email" type="text" onBlur={handleBlur} />
            {errors.partner_email?.type === 'required' && <span className="text-formred m-2">Email is Required</span>}
            {errors.partner_email?.type === 'pattern' && <span className="text-formred m-2">Email is Invalid</span>}
          </div>
          <div className='col-span-2 md:col-span-1'>
            <input className="border-solid border-2 border-light-blue-500 h-11 bg-kapitus text-white text-lg p-2 w-full" placeholder="Phone Number" type="text" {...register("partner_phone", { required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? false : true })} maxLength={14} onBlur={handleBlur} onChange={event => handleChange(event)} value={phone} onFocus={handleFocus} />

            {errors.partner_phone?.type === 'required' && (<span className="text-formred m-2">{phone == `` ? `Phone Number is Required`: `Phone format: (###) ###-####`}</span>)}
          </div>
        </div>
        {hcaptcha && <div className="col-span-2 sm:col-span-1 py-6">
          <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
          onVerify={handleVerify}
          onExpire={handleExpire}
          />
        </div>}
        <div className="flex">
          <div className="w-1/2"><button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" onClick={prevFormStep} type="button">Back</button></div>
          <div className="w-1/2 flex justify-end">
          <input className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" type="submit" value="Next" /></div>
        </div>
      </form>
    </div>
  );
}
