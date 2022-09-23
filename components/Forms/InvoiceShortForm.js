import React, { useState, useRef, useEffect } from 'react';
import { aboutUs, industries, invoices, contact, states, invoiceForm } from './FormElements/Variables'
import axios from 'axios';
import Images from 'next/image';
import Currencyformat from "./FormElements/formatter/currencyformat"
import Phoneformat from './FormElements/formatter/phonenumber'
import { Base64 } from 'js-base64'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/router';
import ip from "ip";
import HCaptcha from '@hcaptcha/react-hcaptcha';
import Getparams from '../UTM/Getparams'
import { stringify } from 'querystring';

export default function InvoiceShortForm({
    name,
    refill,
    username,
    password
}) {
    const [verify, setVerify] = useState(false)
    const [hcaptcha, setHcaptcha] = useState(false)
    const [describe, setDescribe] = useState(false)
    const [entryid, setEntryId] = useState(0)
    const [phone, setPhone] = useState("")
    const [invoiceworth, setInvoiceWorth] = useState("")
    const router = useRouter();
    const [aboutus, setAboutUs] = useState("")
    const [sales, setSales] = useState('complete the full application')
    const key = useRef()
    const [random, setRandom] = useState(Math.random().toString(36).substr(2, 6))

    let preloadedValues = { business_name: refill?.business_name, first_name: refill?.first_name, last_name: refill?.last_name, email_address: refill?.email_address, industry: refill?.industry, invoice: refill?.invoice, invoice_worth: refill?.invoice_worth, sales: refill?.sales }

    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm ({
        //defaultValues: preloadedValues
    });
    const auth = Base64.btoa(`${username}:${password}`);
    let config = { headers: { 'authorization': `${auth}` } }
    let requestForm = {}

    useEffect(() => {
        //setEntryId(router.query?.gf_token || '')
        setPhone(refill?.phone_number || '')
    }, [router.query?.gf_token, refill?.phone_number])

    const onSubmit = (data) => {
        if (!verify)
            return

        data.phone_number = phone
        data.invoice_worth = invoiceworth
        data.about_us = aboutus

        invoiceForm.map((item, i) => {
            if (data[item.name] !== '') {
                requestForm[item.id] = data[item.name]
            }
        })

        let hiddenfields = { ...router.query, form: 'invoice-short-form' }
        let HiddenParams = Getparams({ hiddenfields })
        if (HiddenParams)
            requestForm = { ...requestForm, ...HiddenParams };

        requestForm['form_id'] = 60 //form id
        //requestForm[52] = key.current.value //alpha numeric key
        requestForm[12] = ip.address() //IP Address
        requestForm[48] = window.location.href //full path embed url
        requestForm['entry_id'] = entryid //entry id
        axios
            .post(process.env.NEXT_PUBLIC_SHORT_FORM, { "form_data": requestForm }, config)
            .then(response => {
                if (response.data) {
                    if (data.sales == 'complete the full application') {
                        let res = ''
                        let val = {}
                        invoiceForm.map((item) => {
                            res += item.name + '=' + data[item.name] + '&'
                            val[item.name] = data[item.name]
                        })
                        localStorage.setItem("invoiceForm", JSON.stringify(val))
                        router.push(`/invoice-factoring-application`)
                    }
                    else {
                        const message = document.querySelector('.invoiceShort');
                        //You can do many this with is
                        message.textContent = 'Thanks for contacting us! We will get in touch with you shortly'
                    }
                }
                else {
                    console.log(response.data)
                }
            });
    }

    const handleChange = (event) => {
        if (event.target.name == 'sales') {
            setSales(event.target.value)
        }
        else if (event.target.name == 'phone_number') {

            // this is where we'll call the Phoneformat function
            const formattedPhoneNumber = Phoneformat(event.target.value);
            // we'll set the input value using our setPhone
            setPhone(formattedPhoneNumber)
        }
        else if (event.target.name == 'invoice_worth') {
            // this is where we'll call the Currencyformat function
            const formattedCurrency = Currencyformat(event.target.value);
            // we'll set the input value using our setPhone
            setInvoiceWorth(formattedCurrency)
        }
        else if (event.target.name == 'about_us') {
            event.target.value == "Other" ? setDescribe(true) : setDescribe(false)
            setAboutUs(event.target.value)
        }
    }

    const handleBlur = (event) => {

        let formData = {}
        if (event.target.value) {
            invoiceForm.map((item, i) => {
                if (item.name == event.target.name) {
                    formData[item.id] = event.target.value
                }
            })
            formData['form_id'] = 60 //form id
            if (entryid)
                formData['entry_id'] = entryid //entry id

            axios
                .post(process.env.NEXT_PUBLIC_SHORT_FORM, { "form_data": formData }, config)
                .then(response => {
                    if (response.data !== '' && !isNaN(response.data)) {
                        setEntryId(response.data)
                    }
                });
        }
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
        <section className="w-full max-w-4xl mt-2 lg:px-10 m-auto overflow-y-auto invoiceShort">
            <div className="w-full h-30">
                <div className="w-full py-2 bottom-0 inset-x-0 text-2xl font-lg text-center text-kapitusLiteGreen">Turn Your Account Receivables into Cash</div>
                <div className="w-full py-4 text-lg font-lg text-pink text-center leading-4">Factoring Lines From $200K – $7 Million</div>
            </div>
            <form name="invoiceform" onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 relative">
                        <input type="text" placeholder="DBA (Business Name)" className="w-full p-2 mt-2 text-lg font-semiboldbg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" autoComplete="off" {...register("business_name", { required: true })} onBlur={event => handleBlur(event)} />
                        {errors.business_name?.type === 'required' && (<span className="text-errorred m-2">Business Name is Required<span className="error" /></span>)}
                        {watch("business_name") && typeof errors.business_name?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="text" placeholder="First Name" className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("first_name", { required: true })} onBlur={event => handleBlur(event)} />
                        {errors.first_name?.type === 'required' && (<span className="text-errorred m-2">First Name is Required<span className="error" /></span>)}
                        {watch("first_name") && typeof errors.first_name?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="text" placeholder="Last Name" className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("last_name", { required: true })} onBlur={event => handleBlur(event)} />
                        {errors.last_name?.type === 'required' && (<span className="text-errorred m-2">Last Name is Required<span className="error" /></span>)}
                        {watch("last_name") && typeof errors.last_name?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="email" placeholder="Business Email Address" className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("email_address", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} onBlur={event => handleBlur(event)} />
                        {errors.email_address?.type === 'required' && (<span className="text-errorred m-2">Email is Required <span className="error" /></span>)}
                        {errors.email_address?.type === 'pattern' && (<span className="text-errorred">Email is Invalid<span className="error" /></span>)}
                        {watch("email_address") && typeof errors.email_address?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="text" placeholder="Business Phone Number" className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("phone_number", { required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? false : true })} onBlur={event => handleBlur(event)} maxLength={14} onChange={event => handleChange(event)} value={phone} />
                        {errors.phone_number?.type === 'required' && (<span className="text-errorred m-2">{'phone' == `phone` ? `Phone Number is Required` : `Phone format: (###) ###-####`}<span className="error" /></span>)}
                        {/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test('phone') && <span className="success" />}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <select className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue" {...register("industry", { required: true })} onBlur={event => handleBlur(event)}>
                            <option value="">Industry</option>
                            {industries.map((industry, i) =>
                                <option value={industry} key={i}>{industry}</option>)}
                        </select>
                        {errors.industry?.type === 'required' && (<span className="text-errorred m-2">Industry is Required<span className="error" /></span>)}
                        {watch("industry") && typeof errors.industry?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <select className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue" {...register("about_us", { required: aboutus ? false : true })} onBlur={event => handleBlur(event)} onChange={handleChange} value={aboutus}>
                            <option value="">How did you hear about us?</option>
                            {aboutUs.map((item, i) =>
                                <option value={item} key={i}>{item}</option>)}
                        </select>
                        {errors.about_us?.type === 'required' && (<span className="text-errorred m-2">About us is Required<span className="error" /></span>)}
                        {watch("about_us") && typeof errors.about_us?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className={`col-span-2 relative ${!describe ? `hidden` : ``}`}>
                        <input type="text" placeholder="Describe" className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("describe", { required: describe })} onBlur={event => handleBlur(event)} />
                        {errors.describe?.type === 'required' && (<span className="text-errorred m-2">Describe is Required<span className="error" /></span>)}
                        {watch("describe") && typeof errors.describe?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 relative">
                        <input type="text" placeholder="How much are Outstanding Invoices Worth?" className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("invoice_worth", { required: invoiceworth ? false : true })} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} value={invoiceworth} />
                        {errors.invoice_worth?.type === 'required' && <span className="text-errorred m-2">Invoice Worth is Required <span className="error" /></span>}
                        {'invoiceworth' && <span className="success" />}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <select className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue" {...register("invoice", { required: true })} onBlur={event => handleBlur(event)}>
                            <option value="">How many invoice are Outstanding?</option>
                            {invoices.map((invoice, i) =>
                                <option value={invoice} key={i}>{invoice}</option>)}
                        </select>
                        {errors.invoice?.type === 'required' && (<span className="text-errorred m-2">Invoice is Required<span className="error" /></span>)}
                        {watch("invoice") && typeof errors.invoice?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <select className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue" {...register("states", { required: true })} onBlur={event => handleBlur(event)}>
                            <option value="">What state is Your Business In?</option>
                            {states.map((state, i) =>
                                <option value={state} key={i}>{state}</option>)}
                        </select>
                        {errors.states?.type === 'required' && (<span className="text-errorred m-2">State is Required<span className="error" /></span>)}
                        {watch("states") && typeof errors.states?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 relative">
                        <span><Images alt="arrow" width={30} height={20} src="/images/right-arrow-green.svg" className="bg-center bg-contain inline-block mr-6 h-10 w-10 bg-no-repeat" /></span><label className=" ml-5 font-bold text-kapitus text-lg">I would link to</label>
                        <select className="w-full p-2 mt-2 text-lg bg-white border-2 border-gray-300 text-liteblue" onChange={event => handleChange(event)} {...register("sales", { required: true })} onFocus={handleFocus}>
                            {contact.map((item, i) =>
                                <option value={item} key={i}>{item}</option>)}
                        </select>
                        {errors.sales?.type === 'required' && (<span className="text-errorred m-2">This Field is Required</span>)}
                        {watch("sales") && typeof errors.sales?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 text-liteblue text-lg">
                        Fees may apply. Kapitus needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our
                    </div>
                    {hcaptcha && <div className="col-span-2 sm:col-span-1">
                        <HCaptcha
                            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                            onVerify={handleVerify}
                            onExpire={handleExpire}
                        />
                    </div>}
                    <div className="col-span-2 text-left mb-4">
                        <input type="hidden" ref={key} value={random} />
                        <input className="py-3 px-6 bg-kapitusLiteGreen text-white font-bold w-full sm:w-36" type="submit" />
                    </div>
                </div>
            </form>
        </section>
    )
}