import React, { useRef, useState, useEffect } from "react";
import { californiaForm } from './FormElements/Variables'
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Taxformat from './FormElements/formatter/taxid'
import Phoneformat from './FormElements/formatter/phonenumber'
import SSNformat from './FormElements/formatter/ssnformat'
import styles from 'scss/components/CaliforniaForm.module.scss';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Base64 } from 'js-base64'
 
//import HCaptcha from "@hcaptcha/react-hcaptcha";

  
  
export default function CaliforniaForm({ credentials, fieldData, username, password }) {
  const auth = Base64.btoa(`${username}:${password}`);
  let config = { headers: { 'authorization': `${auth}` } }
  const [verify, setVerify] = useState(false)
  const [hcaptcha, setHcaptcha] = useState(false)

  const [agent, setAgent] = useState(false);
  const [file, setFile] = useState({});
  const router = useRouter()
  const { query } = useRouter()
  const [phone, setPhone] = useState("");
  const [agentphone, setAgentPhone] = useState("");
  const [check, setCheck] = useState(false)
  const [taxid, setTaxid] = useState("");
  const [ssn, setSSN] = useState("");
  const [ip, setIP] = useState('');
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  let files;
  const { register, handleSubmit, trigger, formState: { errors } } = useForm({});
  let requestForm = {}

  const onSubmit = data => {
    if(!verify)
    return
    let requestForm = {}
    requestForm[5] = phone
    requestForm[16] = taxid
    requestForm[8] = ssn
    if(agent){
      requestForm[14] = agentphone
      console.log(file)
      files = file ? [file] : ``
    }

    californiaForm.map((item, i) => {
      if(data[item.name] !== '' ) {
        requestForm[item.id] = data[item.name]
      }
    })
    requestForm['form_id'] = 6 //form id
    
    
    axios
    .post(process.env.NEXT_PUBLIC_LONG_FORM, {"formData": requestForm, 'fileData': files}, config)
    .then(response => {
      if(response.data) {
          console.log(response.data)
          //router.push('http://localhost:3000/fast-application-thank-you') 
          //const message = document.querySelector('.californiaForm');
          //You can do many this with is
          //message.textContent = 'Thanks for contacting us! We will get in touch with you shortly.'
      }
    });
  }

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect(() => {
    //getData()
  })

  const handleChange = (event) => {

    if(event.target.name == 'phone'){
      // this is where we'll call the Phoneformat function
      const formattedNumber = Phoneformat(event.target.value);
      // we'll set the input value using our setPhone
      setPhone(formattedNumber)
    }
    else if(event.target.name == 'agent_phone'){
      // this is where we'll call the Phoneformat function
      const formattedNumber = Phoneformat(event.target.value);
      // we'll set the input value using our setPhone
      setAgentPhone(formattedNumber)
    }
    else if(event.target.name == 'tax_id'){
      // this is where we'll call the Taxformat function
      const formattedTaxid = Taxformat(event.target.value )
      // we'll set the input value using our setTaxid
      setTaxid(formattedTaxid)
    }
    else if(event.target.name == 'ssn'){
      // this is where we'll call the SSNformat function
      const formattedSSN = SSNformat(event.target.value);
      // we'll set the input value using our setSSN
      setSSN(formattedSSN)
    }
    else if(event.target.name == 'agent'){
      if(event.target.value == "Yes")
        setAgent(true)
      else
        setAgent(false)
    }
    else if(event.target.type == 'file') { // the condition is used for upload the files
      let files = event.target.files[0]
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (e)=> {
        setFile(
          {"id": 18, "name": files.name, "type": files.type, "size": files.size, "files": e.target.result},
        ); 
      }
    }
  };

  const handleBlur = (event) => {
    trigger(event.target.name);
  }

  const handleClick = (event) => {
    if(event.target.id.includes('other')) {
      setCheck(true)
    }
    else { 
      setCheck(false)
    }
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
    <div className="max-w-4xl m-auto bg-white p-8 californiaForm">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" autoComplete="off">
      <div className="grid grid-cols-2 gap-6 max-w-4xl m-auto">
        <div className="col-span-2 md:col-span-1">
          <label>First Name *</label>
          <input type="text" className={`${styles.border} border-solid border-1 h-12 p-2 font-semibold text-kapitus text-lg w-11/12`} {...register("first_name", { required: true })} onBlur={handleBlur} />
          {errors.first_name?.type === 'required' && <span className="text-errorred m-2">First Name is Required</span>}
        </div>
        <div className="col-span-2 md:col-span-1">
          <label>Last Name *</label>
          <input type="text" className={`${styles.border} h-12 p-2 sm:text-base w-full text-kapitus font-semibold placeholder-kapitus text-base sm:tw-11/12`} {...register("last_name", { required: true })} onBlur={handleBlur} />
          {errors.last_name?.type === 'required' && (<span className="text-errorred m-2">Last Name is required</span>)}
        </div>
        <hr className={`${styles.hori} col-span-2`} />

        <div className="col-span-2">
        <label>Address</label>
          <input type="text" className={`${styles.border} h-12 p-2 text-kapitus font-semibold text-lg w-11/12`} {...register("address", { required: true })} onBlur={handleBlur} />
          {errors.business_name?.type === 'required' && (<span className="text-errorred m-2">Address is required</span>)}
        </div>
        <hr className={`${styles.hori} col-span-2`} />

        <div className="col-span-2 md:col-span-1">
          <label>City *</label>
          <input type="text" className={`${styles.border} border-solid border-1 h-12 p-2 font-semibold text-kapitus text-lg w-11/12`} {...register("city", { required: true })} onBlur={handleBlur} />
          {errors.city?.type === 'required' && (<span className="text-errorred m-2">City is Required</span>)}
        </div>
        <div className="col-span-2 md:col-span-1">
          <label>State *</label>
          <input type="text" className={`${styles.border} border-solid h-12 p-2 sm:text-base sm:w-full text-kapitus placeholder-kapitus text-base w-11/12`} {...register("state", { required: true })} value={`California`} />
        </div>
        <hr className={`${styles.hori} col-span-2`} />

        <div className="col-span-2">
          <label>Zip / Postal Code*</label>
          <input type="text" className={`${styles.border} h-12 p-2 text-kapitus font-semibold text-lg w-11/12`} {...register("zip", { required: true, pattern: /(^\w{5}$)|(^\w{5}-\w{4}$)/ })} maxLength={5} onBlur={handleBlur} />
          {errors.zip?.type === 'required' && (<div className="text-errorred m-2">Zip Code is required</div>)}
        </div>
        <hr className={`${styles.hori} col-span-2`} />

        <div className="col-span-2 md:col-span-1">
          <label>Email *</label>
          <input type="text" className={`${styles.border} border-solid border-1 h-12 p-2 placeholder-liteblue text-kapitus text-lg w-11/12`} placeholder="example@email.com" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} onBlur={handleBlur}  />
          {errors.email?.type === 'required' && (<span className="text-errorred m-2">Email is Required</span>)}
          {errors.email?.type === 'pattern' && <span className="text-formred m-2">Email is Invalid</span>}
        </div>
        <div className="col-span-2 md:col-span-1">
          <label>Phone *</label>
          <input type="text" className={`${styles.border} border-solid h-12 p-2 sm:text-base sm:w-full text-kapitus placeholder-kapitus text-base w-11/12`} {...register("phone", { required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? false : true })} maxLength={14} onChange={event => handleChange(event)} value={phone} onBlur={handleBlur} />
          {errors.phone?.type === 'required' && (<span className="text-errorred">{phone == `` ? `Phone is Required`: (!/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? `Phone format: (###) ###-####` : ``)}</span>)}
        </div>
        <hr className={`${styles.hori} col-span-2`} />

        <div className="col-span-2">
          <label>Your Relationship with Kapitus*</label>
          <div className="mt-3 ml-3">
            <input {...register('relationship', { required: true })} type="radio" id="option-1" value="business-owner-guarantor" />
            <label className="ml-10" htmlFor="option-1" onClick={handleClick}>Business Owner / Guarantor</label>
          </div>
          <div className="mt-3 ml-3">
            <input {...register('relationship', { required: true })} type="radio" id="option-2" value="landlord-reference" />
            <label className="ml-10" htmlFor="option-2" onClick={handleClick}>Landlord / Reference</label>
          </div>
          <div className="mt-3 ml-3">
            <input {...register('relationship', { required: true })} type="radio" id="option-3" value="potential-customer" />
            <label className="ml-10" htmlFor="option-3" onClick={handleClick}>Potential Customer</label>
          </div>
          <div className="mt-3 ml-3">
            <input {...register('relationship', { required: true })} type="radio" id="option-4" value="employee" />
            <label className="ml-10" htmlFor="option-4" id="option-4" onClick={handleClick}>Employee</label>
          </div>
          <div className="mt-3 ml-3">
            <input {...register('relationship', { required: true })} type="radio" value="other-choice" defaultChecked={check ? true: false} />
            <input className={`${styles.border} ml-10 placeholder-liteblue`} id="input_6_3_other" placeholder="Others" type="text" onClick={handleClick} />
          </div>
          {errors.relationship?.type === 'required' && (<span className="text-errorred m-2">Relationship with Kapitus is required</span>)}
        </div>
        <hr className={`${styles.hori} col-span-2`} />

        <div className="col-span-2 md:col-span-1">
          <label>Merchant ID *</label>
          <input type="text" className={`${styles.border} border-solid border-1 h-12 p-2 font-semibold text-kapitus text-lg w-11/12`} {...register("merchant_id", { required: true })} onBlur={handleBlur}  />
          {errors.merchant_id?.type === 'required' && (<span className="text-errorred m-2">Merchant ID is Required</span>)}
        </div>
        <div className="col-span-2 md:col-span-1">
          <label>Contract ID</label>
          <input type="text" className={`${styles.border} h-12 p-2 sm:text-base sm:w-full text-kapitus font-semibold placeholder-kapitus text-base w-11/12`} {...register("contract_id", { required: true })} onBlur={handleBlur} />
          {errors.contract_id?.type === 'required' && (<span className="text-errorred m-2">Contract ID is required</span>)}
        </div>
        <hr className={`${styles.hori} col-span-2`} />

        <div className="col-span-2">
          <label>Request Type *</label>
          <div className="mt-3 ml-3">
            <input {...register('request_type', { required: true })} type="checkbox" id="categories" value="Request for categories of information collected over the past 12 months." />
            <label className="ml-10" htmlFor="categories" onClick={handleClick}>Request for categories of information collected over the past 12 months.</label>
          </div>
          <div className="mt-3 ml-3">
            <input {...register('request_type', { required: true })} type="checkbox" id="pieces" value="Request for specific pieces of information collected over the past 12 months." />
            <label className="ml-10" htmlFor="pieces" onClick={handleClick}>Request for specific pieces of information collected over the past 12 months.</label>
          </div>
          <div className="mt-3 ml-3">
            <input {...register('request_type', { required: true })} type="checkbox" id="information" value="Request to delete information." />
            <label className="ml-10" htmlFor="information" onClick={handleClick}>Request to delete information.</label>
          </div>
          {errors.request_type?.type === 'required' && (<span className="text-errorred m-2">Request Type is required</span>)}
        </div>
        <hr className={`${styles.hori} col-span-2`} />

        <div className="col-span-2 md:col-span-1">
          <label>Last 6 Digits of TaxID # *</label>
          <input type="text" className={`${styles.border} border-solid border-1 h-12 p-2 text-kapitus text-lg w-11/12`} {...register("tax_id", { required: /(^\d{2}-\d{7}$)/.test(taxid) ? false : true })} onChange={event => handleChange(event)} value={taxid} onBlur={handleBlur} />
          {errors.tax_id?.type == 'required' && (<span className="text-errorred m-2">{taxid == `` ? `Tax Id is Required`: `Tax Id format: ##-#######`}</span>)}
        </div>
        <div className="col-span-2 md:col-span-1">
          <label>Last 6 Digits of SSN #</label>
          <input type="text" className={`${styles.border} h-12 p-2 sm:text-base sm:w-full text-kapitus placeholder-kapitus text-base w-11/12`} {...register("ssn", { required: /(^\d{3}-\d{2}-\d{4}$)/.test(ssn) ? false : true })} maxLength={11} onChange={event => handleChange(event)} value={ssn} onBlur={handleBlur} />
          {errors.ssn?.type === 'required' && (<span className="text-errorred m-2">{ssn == `` ? `SSN is Required`: `SSN format: (###) ###-####`}</span>)}
        </div>
        <hr className={`${styles.hori} col-span-2`} />

      <div className="col-span-2">
        <label>Are you an agent submitting on behalf of someone else?</label>
        <div className="mt-3 ml-3">
          <input {...register('agent', { required: true })} type="radio" id="yes" value="Yes" onChange={handleChange} />
          <label className="ml-10" htmlFor="yes">Yes</label>
        </div>
        <div className="mt-3 ml-3">
          <input {...register('agent', { required: true })} type="radio" id="no" value="No" onChange={handleChange} />
          <label className="ml-10" htmlFor="no">No</label>
        </div>
        {errors.agent?.type === 'required' && (<span className="text-errorred m-2">This is required</span>)}
      </div>

      <hr className={`${styles.hori} col-span-2`} />

      <div className={`col-span-2 ${agent ? `block`: `hidden`}`}>
        <label>Agent’s Name *</label>
          <input type="text" className={`${styles.border} h-12 p-2 text-kapitus font-semibold text-lg w-11/12`} {...register("agent_name", { required: agent })} onBlur={handleBlur} />
          {errors.agent_name?.type === 'required' && (<div className="text-errorred m-2">Agent Name is required</div>)}
        </div>
      
      <hr className={`${styles.hori} col-span-2 ${agent ? `block`: `hidden`}`} />

      <div className={`col-span-2 md:col-span-1 ${agent ? `block`: `hidden`}`}>
        <label>Agent Phone *</label>
        <input type="text" className={`${styles.border} border-solid border-1 h-12 p-2 font-semibold text-kapitus text-lg w-11/12`} {...register("agent_phone", { required: agent ? (/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(agentphone) ? false : true) : false })} maxLength={14} onChange={event => handleChange(event)} value={agentphone} onBlur={handleBlur} />
        {errors.agent_phone?.type === 'required' && (<span className="text-errorred">{agentphone == `` ? `Agent Phone is Required`: (!/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(agentphone) ? `Phone format: (###) ###-####` : ``)}</span>)}
      </div>

      <div className={`col-span-2 md:col-span-1 ${agent ? `block`: `hidden`}`}>
        <label>Agent Email *</label>
        <input type="text" className={`${styles.border} border-solid border-1 h-12 p-2 placeholder-liteblue text-kapitus text-lg w-11/12`} placeholder="example@email.com" {...register("agent_email", { required: agent, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} onBlur={handleBlur} />
        {errors.agent_email?.type === 'required' && (<span className="text-errorred m-2">Agent Email is Required</span>)}
        {errors.agent_email?.type === 'pattern' && <span className="text-errorred m-2">Agent Email is Invalid</span>}
      </div>

      <hr className={`${styles.hori} col-span-2 ${agent ? `block`: `hidden`}`} />

      <div className={`col-span-2 ${agent ? `block`: `hidden`}`}>
        <label>Please Upload Agent Authorization *</label>
        <div className="py-4 flex">
          <input type='file' className="text-center" {...register("file")} multiple onChange={handleChange} />
          <span className="">Max. file size: 128 MB.</span>
        </div>
      </div>

      <hr className={`${styles.hori} col-span-2 ${agent ? `block`: `hidden`}`} />

      <div className="col-span-2">
        <div className="mt-3 ml-3 flex">
          <input {...register('declare', { required: true })} type="checkbox" id="first-choice" value="First Choice" onFocus={handleFocus}/>
          <label className="ml-10 inline-block" htmlFor="first-choice">I declare under penalty of perjury that the foregoing is true and correct, that I am the person named above, and I understand that any falsification of this statement and/or requesting or obtaining any record(s) under false pretenses is punishable under applicable laws.</label>
        </div>
        {errors.declare?.type === 'required' && (<span className="text-errorred m-2 ml-10 inline-block">Delaration is required</span>)}
      </div>

      <hr className={`${styles.hori} col-span-2`} />
      {hcaptcha &&
      <>
      <div className="col-span-2">
        <label>hCaptcha*</label>
      </div>
      <div className="col-span-2 md:col-span-1 space-x-3 w-full">
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
          onVerify={handleVerify}
          onExpire={handleExpire}
        />
      </div></>}
        <div className="col-span-2 text-center">
{/*         <input type="hidden" ref={key} value={random} /> */}
          <input className="py-3 px-6 bg-kapitus text-white w-full sm:w-64 cursor-pointer rounded" type="submit" value="SUBMIT" />
        </div>
      </div>
      </form>
    </div>
  );
}