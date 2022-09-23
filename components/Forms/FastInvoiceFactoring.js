import React, { useState, useEffect, useRef } from 'react'
import Images from 'next/image'
import { ifindustries, invoices, aboutUs, invoiceFastApp } from './FormElements/Variables'
import Currencyformat from "./FormElements/formatter/currencyformat"
import Phoneformat from './FormElements/formatter/phonenumber'
import Taxformat from './FormElements/formatter/taxid'
import SSNformat from './FormElements/formatter/ssnformat'
import { useRouter } from "next/router";
import axios from 'axios'
import { useForm } from "react-hook-form"
import { Base64 } from 'js-base64'
import Termscondition from "../termscondition";
import useForceUpdate from 'use-force-update';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import ip from "ip";
import Getparams from '../UTM/Getparams'

export default function InvoiceFactoringApp({
  fieldData
}) {

  const [verify, setVerify] = useState(false)
  const [hcaptcha, setHcaptcha] = useState(false)
  const [describe, setDescribe] = useState(false)
  const router = useRouter()
  const [loan, setLoan] = useState(false);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const forceUpdate = useForceUpdate();
  const [invoiceworth, setInvoiceWorth] = useState("")
  const [phone, setPhone] = useState("");
  const [taxid, setTaxid] = useState("");
  const [ssn, setSSN] = useState("");
  const [fileerror, setFileError] = useState("")
  const [aboutus, setAboutUs] = useState("")
  const key = useRef()
  const [random, setRandom] = useState(Math.random().toString(36).substr(2, 6))

  const { register, handleSubmit, trigger, formState: { errors } } = useForm({
    defaultValues: fieldData
  });

  let requestForm = {}

  useEffect(() => {
    setPhone(fieldData?.phone_number || '')
    setInvoiceWorth(fieldData?.invoice_worth || '')
  }, [fieldData?.phone_number, fieldData?.invoice_worth])

  const customvalidation = () => {
    let isValid = true
    if(multipleFiles.length == 0){
      setFileError('Please upload the file')
      isValid = false
    }
    else {
      setFileError('')
    }
    return isValid
  }

  const onSubmit = data => {

    const isValid = customvalidation()
    if(!isValid)
      return false
    if(!verify)
      return
    data.invoice_worth = invoiceworth
    data.phone_number = phone
    data.tax_ein = taxid
    data.ssn = ssn
    data.about_us = aboutus
    invoiceFastApp.map((item, i) => {
      if(data[item.name] !== '' ) {
        requestForm[item.id] = data[item.name]
      }
    })

    let hiddenfields = { ...router.query, form: 'invoice-fast-app'}
    let HiddenParams = Getparams({ hiddenfields })
    if(HiddenParams)
      requestForm = { ...requestForm, ...HiddenParams};

    requestForm['form_id'] = 58 //form id
    requestForm[12] = ip.address() //IP Address
    let res = ''
    if(fieldData)
    Object.keys(fieldData).map((item) => {
      res += item + '=' + fieldData[item] + '&'
    })
    requestForm[45] = window.location.href+res //full path embed url
    //requestForm[47] = key.current.value //alpha numeric key
    const auth = Base64.btoa(`kapitus:kapitus@2021`);
    let config = { headers: { 'authorization': `${auth}` } }
    axios
      .post(process.env.NEXT_PUBLIC_LONG_FORM, {"formData": requestForm, 'fileData': multipleFiles}, config)
      .then(response => {
        if(!isNaN(response.data) && response.data !== '') {
          localStorage.removeItem("invoiceForm")
          router.push('/fast-application-thank-you')
        }
      });
  }

  const handleClick = (e) => {
    multipleFiles.splice(e.target.id, 1);
    forceUpdate();
  }

  const handleChange = (event) => {

    if(event.target.type == 'file') { // the condition is used for upload the files
      let files = event.target.files[0]
      let reader = new FileReader();
      reader.readAsDataURL(files);
      reader.onload = (e)=> {
        setMultipleFiles([
          ...multipleFiles,
          {"id": 39, "name": files.name, "type": files.type, "size": files.size, "files": e.target.result},
        ]);
      }
    }
    else if(event.target.name == 'existing_loan') {
      event.target.value == 'Yes' ? setLoan(true) : setLoan(false)
    }
    else if(event.target.name == 'invoice_worth'){
      // this is where we'll call the Currencyformat function
      const formattedCurrency = Currencyformat(event.target.value);
      // we'll set the input value using our setPhone
      setInvoiceWorth(formattedCurrency)
    }
    else if(event.target.name == 'phone_number'){
      // this is where we'll call the Phoneformat function
      const formattedPhoneNumber = Phoneformat(event.target.value);
      // we'll set the input value using our setPhone
      setPhone(formattedPhoneNumber)
    }
    else if(event.target.name == 'tax_ein'){
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
    else if(event.target.name == 'about_us'){
      event.target.value == "Other" ? setDescribe(true) : setDescribe(false)
      setAboutUs(event.target.value)
    }
  }

  const handleBlur = (event) => {
    trigger(event.target.name)
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
    <div className="max-w-4xl m-auto bg-white p-8">
    <hr className="divide-y border-1 border-lightgreen" />
    <div className="mb-6 text-center text-kapitus text-lg my-6 font-bold">BUSINESS INFORMATION</div>
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" autoComplete="off">
    <div className="grid grid-cols-2 gap-4 max-w-4xl m-auto">
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 text-liteblue placeholder-liteblue text-lg w-full" {...register("invoice_worth", { required: invoiceworth ? false:true })} placeholder="How much are Outstanding Invoices Worth" value={invoiceworth} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {errors.invoice_worth?.type === 'required' && (<span className="text-errorred m-2">Invoice Worth is Required</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 text-liteblue placeholder-liteblue text-lg w-full" {...register("business_name", { required: true })} placeholder="DBA (Business Name)" />
        {errors.business_name?.type === 'required' && (<span className="text-errorred m-2">Business Name is required</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12  placeholder-liteblue p-2 text-liteblue   text-lg w-full" {...register("email_address", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} placeholder="Business Email Address" />
        {errors.email_address?.type === 'required' && (<span className="text-errorred">Email is Required.</span>)}
        {errors.email_address?.type === 'pattern' && (<span className="text-errorred">Email is Invalid</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12  p-2 text-liteblue placeholder-liteblue text-lg w-full" {...register("phone_number", { required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? false : true })} placeholder="Phone Number" maxLength={14} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} value={phone} />
        {errors.phone_number?.type === 'required' && (<span className="text-errorred m-2">{phone == `` ? `Phone Number is Required`: `Phone format: (###) ###-####`}</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="tel" className="border-solid border-gray-300 border-2 h-12   p-2 text-liteblue placeholder-liteblue text-lg w-full" {...register("tax_ein", { required: /(^\d{2}-\d{7}$)/.test(taxid) ? false : true })} placeholder="Tax EIN" onBlur={event => handleBlur(event)} maxLength={10} onChange={event => handleChange(event)} value={taxid} />
        {errors.tax_ein?.type == 'required' && (<span className="text-errorred m-2">{taxid == `` ? `Tax EIN is Required`: `Tax EIN format: ##-#######`}</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <select className="border-solid border-gray-300 border-2 h-12 text-liteblue placeholder-liteblue pr-2 p-2 text-base w-full md:w-34" {...register("industry", { required: true })}>
        <option value="">Industry</option>
        {ifindustries.map((industry, i) =>
          <option value={industry} key={`industry${i}`}>{industry}</option>
        )}
        </select>
        {errors.industry?.type === 'required' && (<span className="text-errorred">Industry is Required.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12   p-2 text-liteblue placeholder-liteblue text-lg w-full" {...register("customers", { required: true })} placeholder="Who Are you Customers?" />
        {errors.customers?.type === 'required' && (<span className="text-errorred">Customers is Required.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <select className="border-solid border-gray-300 border-2 h-12 text-liteblue placeholder-liteblue text-base w-full md:w-34" {...register("invoices_outstanding", { required: true })}>
        <option value="">How Many Invoices Are Outstanding</option>
        {invoices.map((invoice, i) =>
          <option value={invoice} key={`inv${i}`}>{invoice}</option>
        )}
        </select>
        {errors.invoices_outstanding?.type === 'required' && (<span className="text-errorred">Invoices Outstanding is Required.</span>)}
      </div>
      <hr className="col-span-2 mt-10 border-1 divide-y border-lightgreen" />
      <div className="col-span-2 mb-6 text-center text-kapitus text-lg my-6 font-bold">PERSONAL INFORMATION</div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12  p-2 text-liteblue placeholder-liteblue text-lg w-full" {...register("first_name", { required: true })} placeholder="First Name" />
        {errors.first_name?.type === 'required' && (<span className="text-errorred">First Name is Required.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12   p-2 text-liteblue placeholder-liteblue text-lg w-full" {...register("last_name", { required: false })} placeholder="Last Name" />
        {errors.last_name?.type === 'required' && (<span className="text-errorred">Last Name is Required.</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <input type="text" className="border-solid border-gray-300 border-2 h-12   p-2 text-liteblue placeholder-liteblue text-lg w-full md:w-34" maxLength={11} {...register("ssn", { required: /(^\d{3}-\d{2}-\d{4}$)/.test(ssn) ? false : true })} placeholder="SSN" value={ssn} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} />
        {errors.ssn?.type === 'required' && (<span className="text-errorred m-2">{phone == `` ? `SSN is Required`: `SSN format: (###) ###-####`}</span>)}
      </div>
      <div className="col-span-2 md:col-span-1">
        <select className="border-solid border-gray-300 border-2 h-12 text-liteblue placeholder-liteblue text-base w-full" {...register("existing_loan", { required: true })} onChange={handleChange}>
          <option value="">Existing loan / Line of Credit</option>
          <option value="Yes" key="lyes">Yes</option>
          <option value="No" key="lno">No</option>
        </select>
        {errors.existing_loan?.type === 'required' && (<span className="text-errorred m-2">Existing Loan is Required</span>)}
      </div>
      <div className={`col-span-2 md:col-span-1 ${loan ? `block` : `hidden`}`}>
        <input type="text" className="border-solid border-gray-300 border-2 h-12 text-liteblue placeholder-liteblue text-lg w-full" placeholder="Lender Name" {...register("lender_name", { required: loan })} />
        {errors.lender_name?.type === 'required' && (<span className="text-errorred m-2">Lender Name is Required</span>)}
      </div>
      <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
          <select className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue" {...register("about_us", { required: aboutus ? false: true })} onBlur={event => handleBlur(event)} onChange={handleChange} value={aboutus}>
          <option value="">How did you hear about us?</option>
          {aboutUs.map((item, i) =>
          <option value={item} key={i}>{item}</option>)}
          </select>
          {errors.about_us?.type === 'required' && (<span className="text-errorred m-2">About us is Required<span className="error" /></span>)}
        </div>
        <div className={`col-span-2 sm:col-span-1 md:col-span-1 relative ${!describe ? `hidden`:``}`}>
          <input type="text" placeholder="Describe" className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("describe", { required: describe })} onBlur={event => handleBlur(event)} />
          {errors.describe?.type === 'required' && (<span className="text-errorred m-2">Describe is Required<span className="error" /></span>)}
        </div>
      <hr className="col-span-2 mt-10 divide-y border-1 border-kapitusLiteGreen" />
      <div className="col-span-2 mb-4 text-center text-kapitus text-lg my-6 font-bold">UPLOAD DOCUMENTS</div>
      <div className="col-span-2 mb-2 text-center text-errorred text-lg my-2 font-bold">For Faster Approval Upload 6 Months Bank Statements</div>
      <div className="col-span-2 mb-2 text-center text-kapitusblue text-xs font-bold">Estimated Approval 3-4 Hours</div>
      <div className="col-span-2 text-center bg-white h-28 border-1 border-dotted border-gray-300 py-6 w-full" style={{border: '1px dashed #ccc'}}>
        <div className="text-center mb-4">Drop files here or</div>
        <label className="col-span-2 w-32 text-center px-4 py-2 bg-kapitus rounded-md shadow-md tracking-wide cursor-pointer text-white ease-linear transition-all duration-150">
          <i className="fas fa-cloud-upload-alt fa-3x"></i>
          <span className="text-center text-base leading-normal">Select a file</span>
          <input type='file' className="hidden text-center" name="files" accept="image/png, image/jpg, .pdf" multiple onChange={handleChange} />
        </label>
      </div>
      {fileerror && (<span className="text-errorred m-2">{fileerror}</span>)}
      <div className="col-span-2 mb-2 text-center text-kapitusblue text-sm my-3">Accepted file types: jpg, png, pdf, Max. file size: 128 MB.</div>

      {multipleFiles.map((item, index)=>
        <div className="col-span-2 flex h-5" key={index} onClick={event => handleClick(event)}>
          <Images className="mr-3" alt="tick-cross" id={index.toString()} src="/images/delete.png" width={20} height={20} /><label className="ml-5 text-base text-kapitus font-bold" htmlFor={index.toString()}>{item.name}</label>
        </div>
      )}
      <div className="col-span-2 p-2 mb-2 h-24 bg-white border-1 border-solid border-gray-600 overflow-auto text-kapitusblue my-2 w-full">
        <Termscondition />
      </div>
      <div className="col-span-2 mb-2 text-kapitusblue text-lg">
        <input className="mr-6 mb-1" type="checkbox" value="I agree" {...register("terms_condition", { required: true })} onFocus={handleFocus} />
        <span>I agree to the Terms of Service</span>
        <br />
        {errors.terms_condition?.type === 'required' && (<span className="text-errorred">Please tick terms & condition</span>)}
      </div>
      {hcaptcha && <div className="col-span-2">
        <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
        onVerify={handleVerify}
        onExpire={handleExpire}
        />
      </div>}
      <div className="col-span-2 text-right">
        <input type="hidden" ref={key} value={random} />
        <input className="py-3 px-6 bg-kapitus text-white font-bold w-full sm:w-32" type="submit" />
      </div>
    </div>
    </form>
  </div>)
}