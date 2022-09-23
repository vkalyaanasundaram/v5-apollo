import React, { useState, useEffect, useRef } from 'react'
import { aboutUs, equipIndustries, days, months, years, states, contact, equipmentForm } from "./FormElements/Variables"
import Currencyformat from "./FormElements/formatter/currencyformat"
import Phoneformat from './FormElements/formatter/phonenumber'
import { useRouter } from "next/router";
import UtmParams from "../UTM/UtmParams"
import axios from 'axios'
import { useForm } from "react-hook-form"
import Getparams from '../UTM/Getparams'
import { Base64 } from 'js-base64'
import ip from "ip";
import HCaptcha from '@hcaptcha/react-hcaptcha';
var date1 = 'yyyy-mm-dd';

export default function EquipShortForm({
    refill,
    username,
    password
}) {
    const [verify, setVerify] = useState(false)
    const [hcaptcha, setHcaptcha] = useState(false)
    const [describe, setDescribe] = useState(false)
    const [entryid, setEntryId] = useState('')
    const [fund, setFund] = useState("")
    const [phone, setPhone] = useState("")
    const [revenue, setRevenue] = useState("")
    const router = useRouter();
    let { asPath } = useRouter();
    let Params = UtmParams(asPath)
    const [aboutus, setAboutUs] = useState("")
    const [sales, setSales] = useState('complete the full application')
    const key = useRef()
    const [random, setRandom] = useState(Math.random().toString(36).substr(2, 6))

    let preloadedValues = { business_name: refill?.business_name, first_name: refill?.first_name, last_name: refill?.last_name, email_address: refill?.email_address, industry: refill?.industry, about_us: refill?.about_us, month: refill?.month, day: refill?.day, year: refill?.year, sales: refill?.sales }

    const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm({
        //defaultValues: preloadedValues
    });
    const auth = Base64.btoa(`${username}:${password}`);
    let config = {
        headers: { 'authorization': `${auth}` },
    }
    let requestForm = {}

    useEffect(() => {
        //setEntryId(router.query?.gf_token || '')
        setFund(refill?.fund || '')
        setPhone(refill?.phone_number || '')
        setRevenue(refill?.annual_revenue || '')
    }, [router.query?.gf_token, refill?.fund, refill?.phone_number, refill?.annual_revenue])

    const onSubmit = data => {

        if (!verify)
            return

        data.fund = fund.replace(`$`, ``)
        data.phone_number = phone
        data.annual_revenue = revenue.replace(`$`, ``)
        data.about_us = aboutus
        equipmentForm.map((item, i) => {
            //console.log(item.name)
            if (typeof item.name == 'object') {
                let date = ''
                item.name.map((item1, i) => {
                    if (data[item1] !== '') {
                        date += data[item1] + '/'
                    }
                })
                if (date !== '') {
                    requestForm[item.id] = date.slice(0, -1);
                }
            }
            else if (data[item.name] !== '') {
                requestForm[item.id] = data[item.name]
            }
        })

        let hiddenfields = { ...router.query, form: 'equipment-short-form' }
        let HiddenParams = Getparams({ hiddenfields })
        if (HiddenParams)
            requestForm = { ...requestForm, ...HiddenParams };

        requestForm['form_id'] = 41 //form id
        requestForm[30] = window.location.href //full path embed url
        requestForm[12] = ip.address() //IP Address
        //requestForm[36] = key.current.value //alpha numeric key
        requestForm['entry_id'] = entryid //entry id
        axios
            .post(process.env.NEXT_PUBLIC_SHORT_FORM, { "form_data": requestForm }, config)
            .then(response => {
                if (response.data) {
                    if (data.sales == 'complete the full application') {
                        let val = {}
                        equipmentForm.map((item) => {
                            if (typeof item.name == 'object') {
                                item.name.map((item1, i) => {
                                    if (item1)
                                        val[item1] = data[item1]
                                })
                            }
                            else
                                val[item.name] = data[item.name]
                        })
                        localStorage.setItem("equipmentForm", JSON.stringify(val))
                        router.push(`/equipment-financing-application`)
                    }
                    else
                        document.querySelector('.equipmentFinance').textContent = 'Thanks for contacting us! We will get in touch with you shortly.'
                }
            });
    }

    const handleChange = (event) => {
        if (event.target.name == 'sales') {
            setSales(event.target.value)
        }
        else if (event.target.name == 'fund') {
            // this is where we'll call the Currencyformat function
            const formattedFund = Currencyformat(event.target.value);
            // we'll set the input value using our setFund
            setFund(formattedFund)
        }
        else if (event.target.name == 'phone_number') {
            // this is where we'll call the Phoneformat function
            const formattedPhoneNumber = Phoneformat(event.target.value);
            // we'll set the input value using our setPhone
            setPhone(formattedPhoneNumber)

        }
        else if (event.target.name == 'annual_revenue') {
            // this is where we'll call the Currencyformat function
            const formattedFund = Currencyformat(event.target.value);
            // we'll set the input value using our setFund
            setRevenue(formattedFund)
        }
        else if (event.target.name == 'about_us') {
            event.target.value == "Other" ? setDescribe(true) : setDescribe(false)
            setAboutUs(event.target.value)
        }
    }

    const handleBlur = (event) => {
        let formData = {}
        if (event.target.value) {
            equipmentForm.map((item, i) => {
                if (item.name == event.target.name) {
                    formData[item.id] = event.target.value
                }
                else if (typeof item.name == 'object') {
                    item.name.map((item1, i) => {
                        if ('year' == event.target.name) {
                            date1 = date1.replace(date1.substring(0, 4), event.target.value)
                        }
                        else if ('month' == event.target.name && i == 2) {
                            date1 = date1.replace(date1.substring(5, 7), event.target.value)
                        }
                        else if ('day' == event.target.name) {
                            date1 = date1.replace(date1.substring(8, 10), event.target.value)
                        }
                    })
                    formData[6] = date1
                }
            })
            formData['form_id'] = 41 //form id
            if (entryid)
                formData['entry_id'] = entryid //entry id

            axios
                .post(process.env.NEXT_PUBLIC_SHORT_FORM, { "form_data": formData }, config)
                .then(response => {

                    if (response.data !== '' && !isNaN(response.data)) {
                        console.log('first -' + response.data)
                        setEntryId(response.data)
                    }
                });
        }
        trigger(event.target.name);
    }


    const handleVerify = (event) => {
        console.log('Captcha value:', event);
        setVerify(true)
    }

    const handleExpire = () => {
        console.log("hCaptcha Token Expired");
        setVerify(false)
    };

    const handleFocus = () => {
        setHcaptcha(true)
    }


    return (
        <section className="max-w-4xl lg:px-10 pb-14 m-auto overflow-y-auto equipmentFinance">
            <div className="w-full py-2 bottom-0 inset-x-0 text-2xl font-lg text-center text-kapitusLiteGreen">Get A Free Quote Today</div>
            <form name="invoiceform" onSubmit={handleSubmit(onSubmit)} autoComplete="off" >
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="text" placeholder="How much find do you need ?" className="w-full px-4 py-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" autoComplete="off" {...register("fund", { required: fund ? false : true })} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} value={fund} />
                        {errors.fund?.type === 'required' && (<><span className="text-errorred m-2">Fund Needed is Required</span><span className="error"></span></>)}
                        {fund && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="text" placeholder="DBA (Business Name)" className="w-full px-4 py-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" autoComplete="off" {...register("business_name", { required: true })} onBlur={event => handleBlur(event)} />
                        {errors.business_name?.type === 'required' && (<><span className="text-errorred m-2">Business Name is Required</span><span className="error"></span></>)}
                        {watch("business_name") && typeof errors.business_name?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="text" placeholder="First Name" className="w-full px-4 py-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("first_name", { required: true })} onBlur={event => handleBlur(event)} />
                        {errors.first_name?.type === 'required' && (<><span className="text-errorred m-2">First Name is Required</span><span className="error"></span></>)}
                        {watch("first_name") && typeof errors.first_name?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="text" placeholder="Last Name" className="w-full px-4 py-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("last_name", { required: true })} onBlur={event => handleBlur(event)} />
                        {errors.last_name?.type === 'required' && (<><span className="text-errorred m-2">Last Name is Required</span><span className="error"></span></>)}
                        {watch("last_name") && typeof errors.last_name?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="email" placeholder="Email Address" className="w-full px-4 py-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("email_address", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} onBlur={event => handleBlur(event)} />
                        {errors.email_address?.type === 'required' && (<span className="text-errorred m-2">Email is Required<span className="error" /></span>)}
                        {errors.email_address?.type === 'pattern' && (<span className="text-errorred">Email is Invalid<span className="error" /></span>)}
                        {watch("email_address") && typeof errors.email_address?.type == 'undefined' && <span className="success" />}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="text" placeholder="Phone Number" className="w-full px-4 py-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" maxLength={14} {...register("phone_number", { required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? false : true })} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} value={phone} />
                        {errors.phone_number?.type === 'required' && (<span className="text-errorred m-2">{phone == `` ? `Phone Number is Required` : `Phone format: (###) ###-####`}<span className="error" /></span>)}
                        {/^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) && <span className="success" />}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <select className="w-full px-4 py-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue" {...register("industry", { required: true })} onBlur={event => handleBlur(event)}>
                            <option value="">Industry</option>
                            {equipIndustries.map((industry, i) =>
                                <option value={industry} key={i}>{industry}</option>)}
                        </select>
                        {errors.industry?.type === 'required' && (<span className="text-errorred m-2">Industry is Required<span className="error" /></span>)}
                        {watch("industry") && typeof errors.industry?.type == 'undefined' && <span className="success" />}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <input type="text" placeholder="Annual Revenue (Estimate)$" className="w-full px-4 py-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("annual_revenue", { required: revenue ? false : true })} onBlur={event => handleBlur(event)} onChange={event => handleChange(event)} value={revenue} />
                        {errors.annual_revenue?.type == 'required' && (<span className="text-errorred m-2">Annual Revenue is Required<span className="error" /></span>)}
                        {revenue && <span className="success" />}
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
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 py-2 text-lg  text-liteblue w-full gap-1 relative">
                        <div className="flex">
                            <select className="border border-gray-200 p-2 rounded w-1/3" {...register("month", { required: true })} id="6.1" onBlur={event => handleBlur(event)}>
                                <option value="">Month</option>
                                {months.map((option, i) =>
                                    <option value={option} key={`${i}month`}>{option}</option>
                                )}
                            </select>
                            <select className="border border-gray-200 p-2 rounded w-1/3" {...register("day", { required: true })} id="6.2" onBlur={event => handleBlur(event)}>
                                <option value="">Day</option>
                                {days.map((option, i) =>
                                    <option value={option} key={`${i}day`}>{option}</option>
                                )}
                            </select>
                            <select className="border border-gray-200 p-2 rounded w-1/3" {...register("year", { required: true })} id="6.3" onBlur={event => handleBlur(event)}>
                                <option value="">Year</option>
                                {years.map((option, i) =>
                                    <option value={option} key={`${i}year`}>{option}</option>
                                )}
                            </select>
                        </div>
                        <div className="text-base pt-3">When Did You Start Your Business?</div>
                        {(errors.month?.type === 'required' || errors.day?.type === 'required' || errors.year?.type === 'required') && (<span className="text-errorred m-2">Date is Required<span className="error" /></span>)}
                        {(watch("month") && watch("day") && watch("year") && typeof errors.month?.type == 'undefined' && typeof errors.day?.type == 'undefined' && typeof errors.year?.type == 'undefined') && <span className="success" />}
                    </div>
                    <div className="col-span-2 sm:col-span-1 md:col-span-1 relative">
                        <select className="w-full px-4 py-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue" {...register("about_us", { required: aboutus ? false : true })} onBlur={event => handleBlur(event)} onChange={handleChange} value={aboutus}>
                            <option value="">How did you hear about us?</option>
                            {aboutUs.map((item, i) =>
                                <option value={item} key={i}>{item}</option>)}
                        </select>
                        {errors.about_us?.type === 'required' && (<span className="text-errorred m-2">About us is Required<span className="error" /></span>)}
                        {watch("email_address") && typeof errors.email_address?.type == 'undefined' && <span className="success" />}
                    </div>
                    <div className={`col-span-2 sm:col-span-1 md:col-span-1 relative ${!describe ? `hidden` : ``}`}>
                        <input type="text" placeholder="Describe" className="w-full p-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue placeholder-liteblue focus:outline-none" {...register("describe", { required: describe })} onBlur={event => handleBlur(event)} />
                        {errors.describe?.type === 'required' && (<span className="text-errorred m-2">Describe is Required<span className="error" /></span>)}
                        {watch("describe") && typeof errors.describe?.type == 'undefined' && <span className="success"></span>}
                    </div>
                    <div className="col-span-2 relative">
                        <span className="flex"><label className="font-bold text-kapitus text-lg">I would like to: *</label></span>
                        <select className="w-full px-4 py-2 mt-2 text-lg  bg-white border-2 border-gray-300 text-liteblue relative" defaultValue={sales} onChange={event => handleChange(event)} {...register("sales", { required: true })} onBlur={event => handleBlur(event)} onFocus={handleFocus}>
                            {contact.map((item, i) =>
                                <option value={item} key={i}>{item}</option>)}
                        </select>
                        {errors.sales?.type === 'required' && (<span className="text-errorred m-2">This Field is Required<span className="error" /></span>)}
                        {(watch("sales") && typeof errors.sales?.type == 'undefined') && <span className="success" />}
                    </div>
                    <div className="col-span-2 text-liteblue text-lg">
                        Fees may apply. Kapitus needs the contact information you provide to us to contact you about our products and services. You may unsubscribe from these communications at any time. For information on how to unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review our Privacy Policy.
                    </div>
                    {hcaptcha && <div className="col-span-2 sm:col-span-1">
                        <HCaptcha
                            sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                            onVerify={handleVerify}
                            onExpire={handleExpire}
                        />
                    </div>}
                    <div className="col-span-2 text-left">
                        <input type="hidden" ref={key} value={random} />
                        <input className="py-3 px-6 bg-kapitusLiteGreen text-white font-bold w-full sm:w-36" type="submit" />
                    </div>
                </div>
            </form>
        </section>
    )
}