import React, { useRef, useState, useEffect } from "react";
import axios from 'axios';
import Images from 'next/image'

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import SignatureCanvas from 'react-signature-canvas'
import Termscondition from "../termscondition";
import useForceUpdate from 'use-force-update';

import Currencyformat from "./multi-form/CurrencyFormat"
import Taxformat from './FormElements/formatter/taxid'
import Phoneformat from './FormElements/formatter/phonenumber'
import SSNformat from './FormElements/formatter/ssnformat'

import { lists, states, months, days, years, aboutUs, entities, findustries, creditScores, percentage, formData } from './FormElements/Variables';

//Base64 can take your file input and output a long string which can then be stored in your database and decoded whenever you need to access it.
import { Base64 } from 'js-base64'
import ip from "ip";
import Getparams from '../UTM/Getparams'

import HCaptcha from "@hcaptcha/react-hcaptcha";



//Signature Owner1 & Owner2
const commonname = { name: "44" };
const owner2name = { name: "72" };

export default function Applynow({
    fieldData,
    username,
    password
  }) {

//useStates array for all form items
  const [verify, setVerify] = useState(false)
  const [hcaptcha, setHcaptcha] = useState(true)
  const [describe, setDescribe] = useState(fieldData?.about_us ? true: false)
  const router = useRouter();
  const { query } = useRouter();
  const forceUpdate = useForceUpdate();
  let padRef = useRef({})
  let padRef1 = useRef({})
  const [loan, setLoan] = useState(false);
  const [percent, setPercent] = useState(100);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [signature, setSignature] = useState(Object.freeze({}));
  const [fund, setFund] = useState("")
  const [phone, setPhone] = useState("");
  const [prsnphone, setPrsnPhone] = useState("");
  const [owner2phone, setOwner2Phone] = useState("");
  const [taxid, setTaxid] = useState("");
  const [revenue, setRevenue] = useState("");
  const [ssn, setSSN] = useState("");
  const [owner2ssn, setOwner2SSN] = useState("");
  const [fileerror, setFileError] = useState("");
  const [signerror, setSignError] = useState("");
  const [sign2error, setSign2Error] = useState("");
  const [aboutus, setAboutUs] = useState("")


  const key = useRef()
  const [random, setRandom] = useState(Math.random().toString(36).substr(2, 6)) 
  
  const { register, handleSubmit, trigger, formState: { errors } } = useForm<Inputs>({
    defaultValues: fieldData
  });
  let requestForm = {}

  const customvalidation = () => {
    let isValid = true
    if(multipleFiles.length == 0){
      setFileError('Please upload the file')
      isValid = false
    }
    else {
      setFileError('')
    }
    if(Object.keys(signature).length == 0){
      setSignError('Please enter your Signature')
      setSign2Error('Please enter your Signature')
      isValid = false
    }
    else {

      setSignError('')
      setSign2Error('')
    }
    if(percent !== 100 && Object.keys(signature).length == 1){
      if(signature[72]){
        setSign2Error('')
      }
      else {
        setSign2Error('Please enter your Signature')
        isValid = false
      }
      if(signature[44]){
        setSignError('')
        isValid = false
      }
      else {
        setSignError('Please enter your Signature')
      }
    }
    return isValid
  }

  const onSubmit = data => {
    const isValid = customvalidation()
    if(!isValid)
    return false
    if(!verify)
    return
 
    data.fund = fund.replace('$','')
    data.annual_revenue = revenue.replace('$','')
    data.business_phone = phone
    data.personal_phone_number = prsnphone
    data.tax_id = taxid
    data.ssn = ssn
    data.about_us = aboutus
    if(percent !== 100) {
      data.owner2_ssn = owner2ssn
      data.owner2_phone_number = owner2phone
    }

    formData.map((item, i) => {
      if(typeof item.name == 'object'){
        let date = ''
        item.name.map((item1, i) => {
          if(data[item1] !== ''){
            date += data[item1]+'/'
          }
        })
        if(date !== ''){
          requestForm[item.id] = date.slice(0, -1); 
        }
      }
      else if(data[item.name] !== '' ) {
        requestForm[item.id] = data[item.name]
      }
    })

    let hiddenfields = { ...router.query, form: 'fast-application'}
    let HiddenParams = Getparams({hiddenfields})
    if(HiddenParams)
      requestForm = { ...requestForm, ...HiddenParams};

    requestForm['form_id'] = 64
    //requestForm[31] = key.current.value //alpha numeric key

    let res = ''
    if(fieldData)
      Object.keys(fieldData).map((item) => {
        res += item + '=' + fieldData[item] + '&'
      })
    requestForm[85] = window.location.href+res //full path embed url
    requestForm[12] = ip.address() // IP Address
    requestForm[98] = "Complete the full application";

    const auth = Base64.btoa(`${username}:${password}`);
    let config = { headers: { 'authorization': `${auth}` } }

    axios
    .post(process.env.NEXT_PUBLIC_LONG_FORM, {"formData": requestForm, 'fileData': multipleFiles, 'signature': signature}, config)
    .then(response => {
      localStorage.removeItem("shortForm")
      router.push('/fast-application-thank-you')
    });
    
    console.log(signature);
    console.log(multipleFiles);
    console.log(formData);
  }
  
  useEffect(() => {
    setFund(fieldData?.fund || '')
    setPhone(fieldData?.phone_number || '')
    setRevenue(fieldData?.annual_revenue || '')
    setAboutUs(fieldData?.about_us || '')
  }, [fieldData?.fund, fieldData?.phone_number, fieldData?.annual_revenue, fieldData?.about_us])

  const handleChange = (event, signPad=null) => {

    if(signPad !== null) { // To Upload the signature image
      setSignature({
        ...signature,
        [event.target.id] : {"id": event.target.id, "sign": signPad.current.toDataURL()}
      })
    }
    if(event.target.type == 'file') { // the condition is used for upload the files
      let files = event.target.files[0]
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (e)=> {
        setMultipleFiles([
          ...multipleFiles,
          {"id": 41, "name": files.name, "type": files.type, "size": files.size, "files": e.target.result},
        ]);
      }
    }
    else if(event.target.name == 'existing_loan') {
      event.target.value == 'Yes' ? setLoan(true) : setLoan(false)
    }
    else if(event.target.name == 'owner_percent') {
      event.target.value !== 100 ? setPercent(event.target.value) : setPercent(100)
    }
    else if(event.target.name == 'fund'){
      // this is where we'll call the Currencyformat function
      const formattedFund = Currencyformat(event.target.value);
      // we'll set the input value using our setFund
      setFund(formattedFund)
    }
    else if(event.target.name == 'business_phone'){
      // this is where we'll call the Phoneformat function
      const formattedPhoneNumber = Phoneformat(event.target.value);
      // we'll set the input value using our setPhone
      setPhone(formattedPhoneNumber)
    }
    else if(event.target.name == 'tax_id'){
      // this is where we'll call the Taxformat function
      const formattedTaxid = Taxformat(event.target.value )
      // we'll set the input value using our setTaxid
      setTaxid(formattedTaxid)
    }
    else if(event.target.name == 'annual_revenue'){
      // this is where we'll call the Currencyformat function
      const formattedFund = Currencyformat(event.target.value);
      // we'll set the input value using our setRevenue
      setRevenue(formattedFund)
    }
    else if(event.target.name == 'ssn'){
      // this is where we'll call the SSNformat function
      const formattedSSN = SSNformat(event.target.value);
      // we'll set the input value using our setSSN
      setSSN(formattedSSN)
    }
    else if(event.target.name == 'personal_phone_number'){
      // this is where we'll call the Phoneformat function
      const formattedPhoneNumber = Phoneformat(event.target.value);
      // we'll set the input value using our setSSN
      setPrsnPhone(formattedPhoneNumber)
    }
    else if(event.target.name == 'owner2_phone_number'){
      // this is where we'll call the Phoneformat function
      const formattedPhoneNumber = Phoneformat(event.target.value);
      // we'll set the input value using our setInputValue
      setOwner2Phone(formattedPhoneNumber)
    }
    else if(event.target.name == 'owner2_ssn'){
      // this is where we'll call the SSNformat function
      const formattedSSN = SSNformat(event.target.value);
      // we'll set the input value using our setSSN
      setOwner2SSN(formattedSSN)
    }
    else if(event.target.name == 'about_us'){
      event.target.value == "Other" ? setDescribe(true) : setDescribe(false)
      setAboutUs(event.target.value)
    }
  };

  const handleBlur = (event) => {
    trigger(event.target.name);
  }

  const handleClick = (e) => { //remove the uploaded files 
    multipleFiles.splice(e.target.id, 1);
    forceUpdate();
  }

  const handleClear = (event, padRef) => {//clear the signatures

    if(signature[event.target.name])
    delete signature[event.target.name]
    padRef.current.clear();
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
      <div className="max-w-4xl lg:m-auto bg-white p-8  md:-m-5">
        <hr className="divide-y border-1 border-green-600" />
        <div className="mb-6 text-center text-kapitus text-lg my-6 font-bold">BUSINESS INFORMATION</div>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" autoComplete="off">
        <div className="grid grid-cols-2 gap-4 max-w-4xl m-auto">
          <div className="col-span-2 md:col-span-1">
            <input 
              type="text"
              // type="number" 
              // pattern="[0-9]*" 
              inputMode="numeric"
              className="border-solid border-gray-300 border-2 h-12 p-2  text-liteblue placeholder-liteblue text-lg w-full" 
              {...register("fund", 
                { required: fund ? false : true })} 
              placeholder="How much funding do you need?" 
              onBlur={event => handleBlur(event)} 
              value={fund} 
              onChange={event => handleChange(event)} 
            />
            {errors.fund?.type === 'required' && (<span className="text-errorred m-2">Fund Needed is Required</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-base w-full text-liteblue placeholder-liteblue md:w-34" {...register("use_fund", { required: true })}>
            <option value="">Use of Funds</option>
            {lists.map((option, i) =>
            <option value={option} className="capitalize" key={`${i}usefund`}>{option}</option>
            )}
            </select>
            {errors.use_fund?.type === 'required' && (<span className="text-errorred m-2">Use of fund is required</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 bg-white border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full" {...register("business_name", { required: true })} placeholder="DBA (Business Name)" />
            {errors.business_name?.type === 'required' && (<span className="text-errorred m-2">Business Name is required</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue text-lg w-full" {...register("legal_business_name", { required: true })} placeholder="Legal Business Name" onBlur={handleBlur} />
            {errors.legal_business_name?.type === 'required' && (<span className="text-errorred m-2">Legal Business Name is required</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue  text-lg w-full" {...register("business_address", { required: true })} placeholder="Business Address" />
          </div>
          <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue  text-lg w-full md:w-34" {...register("business_city", { required: true })} placeholder="City" />
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-full md:w-34" {...register("business_state", { required: true })}>
            <option value="">State</option>
            {states.map((state, i) =>
              <option value={state} key={`bstate${i}`}>{state}</option>
            )}
            </select>
          </div>
          <div className="col-span-2 md:col-span-1 space-x-3 w-full">
            <input 
              type="text"
              // type="number" 
              // pattern="[0-9]*" 
              inputMode="numeric"
              className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full" 
              {...register("business_zip", 
                { required: true, pattern: /(^\w{5}$)|(^\w{5}-\w{4}$)/ })
              }
              placeholder="ZIP / Postal Code" 
              maxLength={5} 
            />
            {(errors.business_address?.type === 'required' || errors.business_city?.type === 'required' || errors.business_state?.type === 'required' || errors.business_zip?.type === 'required' || errors.business_zip?.type === 'pattern') && (<span className="text-errorred m-2">This field is required. Please complete the following fields:</span>)}
            {errors.business_address?.type === 'required' && (<span className="text-errorred m-2">Street Address,</span>)}
            {errors.business_city?.type === 'required' && (<span className="text-errorred m-2">City,</span>)}
            {errors.business_state?.type === 'required' && (<span className="text-errorred m-2">State / Province,</span>)}
            {(errors.business_zip?.type === 'required' || errors.business_zip?.type === 'pattern' ) && (<span className="text-errorred m-2">ZIP / Postal Code.</span>)}
          </div>
          <div className="col-span-2 md:col-span-1 space-x-3 w-full">
          </div>
          <div className="col-span-2 md:col-span-1 space-x-3 w-full">
            <input
              type="text"
              // type="number" 
              // pattern="[0-9]*" 
              inputMode="numeric"
              className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue  text-lg w-full" 
              {...register("business_phone", 
                {
              required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? false : true })} placeholder="Business Phone" 
              onBlur={event => handleBlur(event)} 
              maxLength={14} 
              onChange={event => handleChange(event)} 
              value={phone} 
            />
            {errors.business_phone?.type === 'required' && (<span className="text-errorred m-2">{phone == `` ? `Business Phone is Required`: `Phone format: (###) ###-####`}</span>)}
          </div>
          <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
            <label className="text-base text-liteblue md:text-sm w-22 md:w-24">Business Start Date
            <br />
            {(errors.business_month?.type === 'required' || errors.business_day?.type === 'required' || errors.business_year?.type === 'required') && (<span className="text-errorred">Business Date is Required.</span>)}
            </label>
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue text-base w-1/4 md:w-30" {...register("business_month", { required: true })}>
              <option value="">Month</option>
              {months.map((month, i) =>
                <option value={month} key={`mbusiness${i}`}>{month}</option>
              )}
              </select>
              <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue text-base w-1/4 md:w-30" {...register("business_day", { required: true })}>
              <option value="">Day</option>
              {days.map((day, i) =>
                <option value={day} key={`dbusiness${i}`}>{day}</option>
              )}
              </select>
              <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue text-base w-1/4 md:w-30" {...register("business_year", { required: true })}>
              <option value="">Year</option>
              {years.map((year, i) =>
                <option value={year} key={`ybusiness${i}`}>{year}</option>
              )}
              </select>
          </div>
          <div className="col-span-2 md:col-span-1">
          
            <input  
              /*type="tel"*/
              type="text"
              inputMode="numeric"
              className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue text-lg w-full" 
              {...register("tax_id", 
                {required: /(^\d{2}-\d{7}$)/.test(taxid) ? false : true})
              } 
              placeholder="Tax Id" 
              onBlur={event => handleBlur(event)} 
              maxLength={10} 
              onChange={event => handleChange(event)} 
              value={taxid} 
            />
            {errors.tax_id?.type == 'required' && (<span className="text-errorred m-2">{taxid == `` ? `Tax Id is Required`: `Tax Id format: ##-#######`}</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input 
              type="text"
              // type="number" 
              // pattern="[0-9]*" 
              inputMode="numeric" 
              className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue text-lg w-full" 
              placeholder="Annual Revenue" 
              {...register("annual_revenue", 
                {required: revenue ? false : true })
              } 
              value={revenue} 
              onBlur={event => handleBlur(event)} 
              onChange={event => handleChange(event)} 
            />
            {errors.annual_revenue?.type == 'required' && (<span className="text-errorred m-2">Annual Revenue is Required</span>)}
          </div>
          <div className="col-span-2 space-y-3 md:space-y-0 md:col-span-2 md:flex md:space-x-3 md:w-full">
            <div className="w-full md:w-34">
              <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-full md:w-34" {...register("entity", { required: true })}>
              <option value="">Entity</option>
              {entities.map((entity, i) =>
                <option value={entity} key={`entity${i}`}>{entity}</option>
              )}
              </select>
              {errors.entity?.type === 'required' && (<span className="text-errorred">Entity is Required.</span>)}
            </div>
            <div className="w-full md:w-34">
              <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-full md:w-34" {...register("industry_type", { required: true })}>
              <option value="">Industry Type</option>
              {findustries.map((industry, i) =>
                <option value={industry} key={`industry${i}`}>{industry}</option>
              )}
              </select>
              {errors.industry_type?.type === 'required' && (<span className="text-errorred">Industry Type is Required.</span>)}
            </div>
            <div className="w-full md:w-34">
              <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full md:w-34" {...register("website_url", { required: false })} placeholder="Website URL : example.com" />
            </div>
          </div>
          <hr className="col-span-2 mt-10 divide-y border-1 border-green-600" />
          <div className="col-span-2 mb-6 text-center text-kapitus text-lg my-6 font-bold">PERSONAL INFORMATION</div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full" {...register("first_name", { required: true })} placeholder="First Name" />
            {errors.first_name?.type === 'required' && (<span className="text-errorred">First Name is Required.</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full" {...register("last_name", { required: false })} placeholder="Last Name" />
            {errors.last_name?.type === 'required' && (<span className="text-errorred">Last Name is Required</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full" {...register("email_address", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="Email Address" />
            {errors.email_address?.type === 'required' && (<span className="text-errorred">Email is Required</span>)}
            {errors.email_address?.type === 'pattern' && (<span className="text-errorred">Email is Invalid</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input 
              type="text"
              // type="number" 
              // pattern="[0-9]*" 
              inputMode="numeric"
              className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue text-lg w-full" 
              {...register("personal_phone_number", 
                { 
                  required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(prsnphone) ? false : true 
                }
                )
              } 
              placeholder="Personal Phone Number" 
              maxLength={14} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} value={prsnphone} />
              {errors.personal_phone_number?.type === 'required' && (<span className="text-errorred m-2">{prsnphone == `` ? `personal Phone Number is Required`: `Phone format: (###) ###-####`}</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue text-lg w-full" {...register("personal_address", { required: true })} placeholder="Home Address" />
          </div>
          <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full md:w-34" {...register("personal_city", { required: true })} placeholder="City" />
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-full md:w-34" {...register("personal_state", { required: true })}>
            <option value="">State</option>
            {states.map((state, i) =>
              <option value={state} key={`${i}`}>{state}</option>
            )}
            </select>
          </div>
          <div className="col-span-2 md:col-span-2 space-x-3 w-full md:w-72">
            <input
              type="text"
              // type="number" 
              // pattern="[0-9]*" 
              inputMode="numeric" 
              className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full" 
              {...register("personal_zip", 
                { required: true, pattern: /(^\w{5}$)|(^\w{5}-\w{4}$)/ })
              } 
              placeholder="ZIP / Postal Code" 
              maxLength={5} 
            />
            {(errors.personal_address?.type === 'required' || errors.personal_city?.type === 'required' || errors.personal_state?.type === 'required' || errors.personal_zip?.type === 'required' || errors.personal_zip?.type === 'pattern') && (<span className="text-errorred m-2">This field is required. Please complete the following fields:</span>)}
            {errors.personal_address?.type === 'required' && (<span className="text-errorred m-2">Street Address,</span>)}
            {errors.personal_city?.type === 'required' && (<span className="text-errorred m-2">City,</span>)}
            {errors.personal_state?.type === 'required' && (<span className="text-errorred m-2">State / Province,</span>)}
            {(errors.personal_zip?.type === 'required' || errors.personal_zip?.type === 'pattern' ) && (<span className="text-errorred m-2">ZIP / Postal Code.</span>)}
          </div>
          <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
            <div className="w-full md:w-34">
              <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-full md:w-34" {...register("credit_score", { required: true })}>
              <option value="">Credit Score</option>
              {creditScores.map((credit, i) =>
                <option value={credit.value} key={`creditscore${i}`}>{credit.text}</option>
              )}
              </select>
              {errors.credit_score?.type === 'required' && (<span className="text-errorred m-2">Credit Score is Required.</span>)}
            </div>
            <div className="w-full md:w-34">
              <input 
                type="text"
                // type="number" 
                // pattern="[0-9]*" 
                inputMode="numeric"
                className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue text-lg w-full md:w-34" 
                maxLength={11} {...register("ssn", { required: /(^\d{3}-\d{2}-\d{4}$)/.test(ssn) ? false : true })} 
                placeholder="SSN"
                value={ssn} 
                onBlur={event => handleBlur(event)} 
                onChange={event => handleChange(event)} 
              />
              {errors.ssn?.type === 'required' && (<span className="text-errorred m-2">{ssn == `` ? `SSN is Required`: `SSN format: (###) ###-####`}</span>)}
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
            <label className="text-base text-liteblue md:text-sm w-22 md:w-24">Date of Birth
            <br />
            {(errors.personal_month?.type === 'required' || errors.personal_day?.type === 'required' || errors.personal_year?.type === 'required') && (<span className="text-errorred">DOB is Required.</span>)}
            </label>
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-1/4 md:w-30" {...register("personal_month", { required: true })} >
              <option value="">Month</option>
              {months.map((month, i) =>
                <option value={month} key={`mpersonal${i}`}>{month}</option>
              )}
              </select>
              <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-1/4 md:w-30" {...register("personal_day", { required: true })}>
              <option value="">Day</option>
              {days.map((day, i) =>
                <option value={day} key={`dpersonal${i}`}>{day}</option>
              )}
              </select>
              <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-1/4 md:w-30" {...register("personal_year", { required: true })}>
              <option value="">Year</option>
              {years.map((year, i) =>
                <option value={year} key={`ypersonal${i}`}>{year}</option>
              )}
              </select>
          </div>
          <div className="col-span-2 md:col-span-1 w-full">
              <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue text-base w-full" {...register("existing_loan", { required: true })} onChange={handleChange}>
                <option value="">Existing loan</option>
                <option value="Yes" key="lyes">Yes</option>
                <option value="No" key="lno">No</option>
              </select>
              {errors.existing_loan?.type == 'required' && (<span className="text-errorred m-2">Existing Loan is Required</span>)}
          </div>
          <div className={`col-span-2 md:col-span-1 ${loan ? `block` : `hidden`}`}>
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full" placeholder="Lender Name" {...register("lender_name", { required: loan })} />
            {errors.lender_name?.type === 'required' && (<span className="text-errorred m-2">Lender Name is Required</span>)}
          </div>
          <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
            <label className="text-base text-liteblue md:text-sm w-1/4 md:w-24 items-center">Ownership %</label>
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-3/4" {...register("owner_percent", { required: true })} onChange={handleChange} value={percent}>
              <option value="">Ownership Percentage %</option>
              {percentage.map((item, i) =>
                <option value={item} key={item}>{item}</option>
              )}
            </select>
            {errors.owner_percent?.type === 'required' && (<span className="text-errorred">Percentage is Required.</span>)}
          </div>
          <div className="col-span-2 md:col-span-1 space-x-3 w-full md:w-72">
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-full" {...register("about_us", { required: aboutus ? false: true })} onChange={handleChange} value={aboutus}>
              <option value="">How did you hear about us?</option>
              {aboutUs.map((item, i) =>
                <option value={item} key={`aboutus${item}`}>{item}</option>
              )}
            </select>
            {errors.about_us?.type === 'required' && (<span className="text-errorred">About us is Required.</span>)}
          </div>
          <div className={`col-span-2 sm:col-span-1 md:col-span-1 relative ${!describe ? `hidden`:``}`}>
            <input type="text" placeholder="Describe" className="w-full p-2 text-lg bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("describe", { required: describe })} onBlur={event => handleBlur(event)} />
            {errors.describe?.type === 'required' && (<span className="text-errorred m-2">Describe is Required<span className="error" /></span>)}
          </div>
          <div className={`grid gap-4 col-span-2 w-full m-auto ${percent==100 ? `hidden` : `block` }`}>
            <hr className="col-span-2 mt-10 divide-y border-1 border-green-600" />
            <div className="col-span-2 mb-6 text-center text-kapitus text-lg my-6 font-bold">Owner 2 INFORMATION</div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full" {...register("owner2_first_name", { required: percent==100 ? false : true })} placeholder="Owner 2 First Name" />
            {errors.owner2_first_name?.type === 'required' && (<span className="text-errorred">Owner 2 First Name is Required.</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full" {...register("owner2_last_name", { required: false })} placeholder="Owner 2 Last Name" />
            {errors.owner2_last_name?.type === 'required' && (<span className="text-errorred">Owner 2 Last Name is Required.</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full" {...register("owner2_email_address", { required: percent==100 ? false : true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="Owner 2 Email Address" />
            {errors.owner2_email_address?.type === 'required' && (<span className="text-errorred">Owner 2 Email is Required.</span>)}
            {(errors.owner2_email_address?.type === 'pattern' && errors.owner2_email_address?.type === 'pattern') && (<span className="text-errorred">Email is Invalid</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input 
              type="text"
              // type="number" 
              // pattern="[0-9]*" 
              inputMode="numeric"
              className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue text-lg w-full" {...register("owner2_phone_number", { required: percent == 100 ? false : (percent !== 100 && /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(owner2phone) ? false : true) })} placeholder="Owner 2 Phone Number" onBlur={event => handleBlur(event)} maxLength={14} onChange={event => handleChange(event)} value={owner2phone} />
            {errors.owner2_phone_number?.type === 'required' && (<span className="text-errorred m-2">{phone == `` ? `Owner 2 Phone Number is Required`: `Phone format: (###) ###-####`}</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue  text-lg w-full" {...register("owner2_address", { required: percent==100 ? false : true })} placeholder="Owner 2 Home Address" />
          </div>
          <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
            <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-full md:w-34" {...register("owner2_city", { required: percent==100 ? false : true })} placeholder="Owner 2 City" />
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-full md:w-34" {...register("owner2_state", { required: percent==100 ? false : true })}>
            <option value="">State</option>
            {states.map((state, i) =>
              <option value={state} key={`${i}`}>{state}</option>
            )}
            </select>
          </div>
          <div className="col-span-2 md:col-span-2 space-x-3 w-full md:w-72">
            <input 
              type="text"
              // type="number" 
              // pattern="[0-9]*" 
              inputMode="numeric"
              className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue  placeholder-liteblue text-lg w-full" 
                {...register("owner2_zip", 
                  { 
                    required: percent==100 ? false : true, 
                    pattern: /(^\w{5}$)|(^\w{5}-\w{4}$)/ 
                  })
                }     
              placeholder="Owner 2 ZIP / Postal Code" 
              maxLength={5} 
            />
            {(errors.owner2_address?.type === 'required' || errors.owner2_city?.type === 'required' || errors.owner2_state?.type === 'required' || errors.owner2_zip?.type === 'required' || errors.owner2_zip?.type === 'pattern') && (<span className="text-errorred m-2">This field is required. Please complete the following fields:</span>)}
            {errors.owner2_address?.type === 'required' && (<span className="text-errorred m-2">Street Address,</span>)}
            {errors.owner2_city?.type === 'required' && (<span className="text-errorred m-2">City,</span>)}
            {errors.owner2_state?.type === 'required' && (<span className="text-errorred m-2">State / Province,</span>)}
            {(errors.owner2_zip?.type === 'required' || errors.owner2_zip?.type === 'pattern' ) && (<span className="text-errorred m-2">ZIP / Postal Code.</span>)}
          </div>
          <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
            <div className="w-full md:w-34">
              <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-full md:w-34" {...register("owner2_credit_score", { required: percent==100 ? false : true })}>
                <option value="">Owner 2 Credit Score</option>
                {creditScores.map((credit, i) =>
                  <option value={credit.value} key={`ownercreditscore${i}`}>{credit.text}</option>
                )}
              </select>
              {errors.owner2_credit_score?.type === 'required' && (<span className="text-errorred m-2">Owner 2 Credit Score is Required.</span>)}
            </div>
            <div className="w-full md:w-34">
              <input
                type="text"
                // type="number" 
                // pattern="[0-9]*" 
                inputMode="numeric" 
                className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue placeholder-liteblue  text-lg w-full md:w-34" 
                maxLength={11} 
                {...register("owner2_ssn", 
                  { required: percent == 100 ? false : (percent !== 100 && /(^\d{3}-\d{2}-\d{4}$)/.test(owner2ssn) ? false : true ) })
                } 
                placeholder="Owner 2 SSN" 
                value={owner2ssn} 
                onBlur={event => handleBlur(event)} 
                onChange={event => handleChange(event)} 
              />
              {errors.owner2_ssn?.type === 'required' && (<span className="text-errorred m-2">{phone == `` ? `Owner 2 SSN is Required`: `SSN format: (###) ###-####`}</span>)}
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 flex space-x-3 w-full">
            <label className="text-xs md:text-sm w-22 md:w-24">Date of Birth
            <br />
            {(errors.owner2_month?.type === 'required' || errors.owner2_day?.type === 'required' || errors.owner2_year?.type === 'required') && (<span className="text-errorred">Date of Birth is Required.</span>)}
            </label>
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-base w-1/4 md:w-30" {...register("owner2_month", { required: percent==100 ? false : true })} >
              <option value="">Month</option>
              {months.map((month, i) =>
                <option value={month} key={`mowner2${i}`}>{month}</option>
              )}
            </select>
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-1/4 md:w-30" {...register("owner2_day", { required: percent==100 ? false : true })}>
              <option value="">Day</option>
              {days.map((day, i) =>
                <option value={day} key={`downer2${i}`}>{day}</option>
              )}
            </select>
            <select className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue   placeholder-liteblue  text-lg w-1/4 md:w-30" {...register("owner2_year", { required: percent==100 ? false : true })}>
              <option value="">Year</option>
              {years.map((year, i) =>
                <option value={year} key={`yowner2${i}`}>{year}</option>
              )}
            </select>
          </div>
        </div>
          <hr className="col-span-2 mt-10 divide-y border-1 border-kapitusLiteGreen" />
          <div className="col-span-2 mb-4 text-center text-kapitus text-lg my-6 font-bold">UPLOAD DOCUMENTS</div>
          <div className="col-span-2 mb-2 text-center text-errorred text-lg my-2 font-bold">For Faster Approval Upload 6 Months Bank Statements</div>
          <div className="col-span-2 mb-2 text-center text-kapitusblue text-xs font-bold">Estimated Approval 3-4 Hours</div>
          <div className="col-span-2 text-center bg-white h-28 border-2 border-dotted py-6 w-full" style={{border: '1px dashed #ccc'}}>
            <div className="text-center mb-4">Drop files here or</div>
            <label className="col-span-2 w-32 text-center px-4 py-2 bg-kapitus rounded-md shadow-md tracking-wide cursor-pointer text-white ease-linear transition-all duration-150">
              <i className="fas fa-cloud-upload-alt fa-3x"></i>
              <span className="text-center text-white text-base leading-normal">Select a file</span>
              <input 
                type='file' 
                className="hidden text-center" 
                name="files[]"
             
                accept="image/png, image/jpg, .pdf" 
                // multiple 
                multiple={true} 
                // onChange={handleChange} 
                onChange={(e)=> {
                  handleChange(e); 
                  e.target.value='' 
                }}
                />
            </label>
          </div>
          {fileerror && (<span className="text-errorred m-2">{fileerror}</span>)}
          <div className="col-span-2 mb-2 text-center text-kapitusblue text-sm my-3">Accepted file types: jpg, png, pdf, Max. file size: 128 MB.</div>

          {multipleFiles.map((item, index)=>
            <span className="col-span-2 h-5 flex" key={index} onClick={event => handleClick(event)}>
              <Images alt="delete" width="20" height="5" className="mr-3" id={index.toString()} src="/images/delete.png" /><label className="ml-3 -mt-1 text-lg text-kapitus font-bold" htmlFor={index.toString()}>{item.name}</label>
            </span>
          )}
          <div className="col-span-2 p-2 mb-2 h-24 bg-white border-2 border-dotted border-gray-600 overflow-auto text-kapitusblue my-2 w-full">
            <Termscondition />
          </div>
          <div className="col-span-2 mb-2 text-kapitusblue text-lg">
            <input 
              className="mr-6 mb-1" 
              type="checkbox" 
              value="I agree" {
                ...register("terms_condition", 
                { required: true }
                )
              } 
                onFocus={handleFocus} 
              />
            <span>I agree to the Terms of Service</span>
            <br />
            {errors.terms_condition?.type === 'required' && (<span className="text-errorred">Please tick terms & condition</span>)}
          </div>
          <div className="col-span-2 md:col-span-1">
            <span className="flex"><Images alt="right-arrow" width="35" height="30" src="/images/right-arrow-green.svg" className="bg-center bg-contain inline-block mr-6 h-10 w-10 bg-no-repeat" /><label className="font-bold text-kapitus text-lg ml-5">Signature *</label></span>
            <SignatureCanvas penColor='green' clearButton="true" ref={padRef} canvasProps={{ className: 'col-span-2 h-44 w-72 sm:w-full border-2 border-gray-500 border-dashed bg-white flex mt-5', id: 44}} onEnd={event => handleChange(event, padRef)} />
            <button type="button" className=" refresh cursor-pointer" onClick={event => handleClear(event, padRef)}><Images alt="refresh" width="30" height="30" src="/images/refresh.png" {...commonname} className="right bg-contain inline-block h-8 w-8 bg-no-repeat" /></button>
            {signerror && (<div className="text-errorred">{signerror}</div>)}
          </div>
          <div className="col-span-2 md:col-span-1 flex">
          </div>
          <div className={`col-span-2 md:col-span-1 ${percent==100 ? `h-0 overflow-hidden` : `block`}`}>
            <span className="flex"><Images alt="right-arrow" width="35" height="30" src="/images/right-arrow-green.svg" className="bg-center bg-contain inline-block mr-6 h-10 w-10 bg-no-repeat" /><label className="font-bold text-kapitus text-lg ml-5">Owner 2 Signature *</label></span>
            <SignatureCanvas penColor='green' clearButton="true" ref={padRef1} canvasProps={{ className: 'col-span-2 h-44 w-72 sm:w-full border-2 border-gray-500 border-dashed bg-white mt-5', id: 72}} onEnd={event => handleChange(event, padRef1)} />
              <button type="button" className=" relative refresh" onClick={event => handleClear(event, padRef1)}><Images alt="refresh" width="30" height="30" src="/images/refresh.png" {...owner2name} className="right bg-contain inline-block h-8 w-8 bg-no-repeat" /></button>
              {sign2error && (<div className="text-errorred">{sign2error}</div>)}
          </div>
          <div className={`col-span-2 md:col-span-1 ${percent==100 ? `hidden` : `block`}`}>
          </div>

          {hcaptcha && <div className="col-span-2">
          <span className="flex mb-5"><Images alt="right-arrow" width="35" height="30" src="/images/right-arrow-green.svg" className="bg-center bg-contain inline-block mr-6 h-10 w-10 bg-no-repeat" /><label className="font-bold text-kapitus text-lg ml-5">Hcaptcha *</label></span>
            <HCaptcha
            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
            onVerify={handleVerify}
            onExpire={handleExpire}
            />
          </div>}
          <div className="col-span-2 text-right">
            <input type="hidden" ref={key} value={random} />
            <input className="py-3 px-6 bg-kapitus text-white font-bold w-full sm:w-32 cursor-pointer" type="submit" />
          </div>
        </div>
        </form>
      </div>
  );
}