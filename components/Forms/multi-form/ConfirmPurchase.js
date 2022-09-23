import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from 'scss/components/PopUpGetStarted.module.scss';
import { useForm } from "react-hook-form";
import Accordion from './FormAccordion'
import { creditscore } from "../FormElements/Variables"
import axios from "axios";
import Phoneformat from '../FormElements/formatter/phonenumber'
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { Base64 } from 'js-base64'


export default function ConfirmPurchase({
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
    const [error2, setError2] = useState({});
    const [fundspecialist, setFundspecialist] = useState(true);

    let gfpersonalinfo = localStorage.getItem('gfpersonalinfo') || ''
    let fielddata = []
    if (gfpersonalinfo) {
        const obj = JSON.parse(gfpersonalinfo)
        for (var k in obj) {
            fielddata[k] = obj[k]
        }
    }

    const [phone, setPhone] = useState('')


    const { register, handleSubmit, trigger, formState: { errors } } = useForm ({
        //defaultValues: fielddata
    });

    const aboutus = ['Google', 'Email', 'Radio', 'Mail', 'Video', 'Display Ads', 'Facebook', 'LinkedIn', 'Social media / Others', 'Referral', 'Other']

    const fields = [{ name: 'first_name', message: 'First Name is required' }, { name: 'last_name', message: 'Last Name is required' }, { name: 'company_name', message: 'Company Name is required' }, { name: 'email', message: 'Email is required' }, { name: 'about_us', message: 'Please select any of the option' }, { name: 'phone', message: 'Phone Numer is required' }]

    const formid = { 'product': 2, 'fund': 86, 'industry': 5, 'month': 66, 'year': 67, 'checkbox': 36, 'revenue': 87, 'repayment': 11, 'business': 13, 'loan': 85, 'lender': 80, 'creditscore': 42, 'first_name': 50, 'last_name': 51, 'company_name': 53, 'email': 47, 'website_url': 84, 'specialist': 44, 'phone': 45, 'about_us': 1 }

    const Removestorevalue = (name) => {

        let personalinfo = JSON.parse(localStorage.getItem('gfpersonalinfo'))
        if (personalinfo) {
            for (var k in personalinfo) {
                if (name == k) {
                    delete personalinfo[name]
                }
                if (name == 'specialist') {
                    delete personalinfo['phone']
                    delete data['phone']
                    delete localObj['phone']
                    delete localObj['specialist']
                }
            }
        }

        localStorage.setItem('gfpersonalinfo', JSON.stringify(personalinfo))
    }

    const handleChange = (e) => {
        if (e.target.type == 'checkbox') {

            if (e.target.checked) {
                setFundspecialist(true)
                delete localObj[e.target.name]
                localObj[e.target.name] = e.target.value
                localStorage.setItem('gfpersonalinfo', JSON.stringify(localObj))
            }
            else {
                setFundspecialist(false)
                delete localObj[e.target.name]
                Removestorevalue(e.target.name)
            }
        }
        else {
            if (e.target.value !== '') {
                if (e.target.name == 'phone') {
                    // This is where we'll call the Phoneformat function
                    const formattedPhoneNumber = Phoneformat(e.target.value);
                    // We'll set the input value using our setPhone
                    setPhone(formattedPhoneNumber)
                }

            }
            else {
                delete data[e.target.name]
                delete localObj[e.target.name]
                setPhone('')
            }
        }
    }

    const handleBlur = (e) => {

        if (e.target.value == '') {
            delete data[e.target.name]
            Removestorevalue(e.target.name)
        }
        else {
            setData({ ...data, [e.target.name]: e.target.value })
            delete localObj[e.target.name]
            localObj[e.target.name] = e.target.value
            localStorage.setItem('gfpersonalinfo', JSON.stringify(localObj))
        }
        trigger(e.target.name)
    }

    const onSubmit = (values) => {
        if (!verify)
            return
        let finaldata = {}
        //delete data.browsers
        //delete data.prefixes
        Object.keys(data).forEach(function (item, key) {
            finaldata[formid[item]] = data[item];
        })
        finaldata['form_id'] = 31;
        const auth = Base64.btoa(`${username}:${password}`);
        let config = { headers: { 'authorization': `${auth}` } }
        console.log(finaldata)
        axios
            .post(process.env.NEXT_PUBLIC_SHORT_FORM, { "form_data": finaldata }, config)
            .then(response => {
                let result = response.data
                setTimeout(() => {
                    nextFormStep()
                }, 1)
            });
    };
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
        <div className={formStep == 9 ? styles.showForm : styles.hideForm}>
            {Object.keys(errors).length > 0 && (<div className="text-white font-base font-bold mb-5 border-2 border-formred rounded py-2 px-2">
                <span className="text-base font-bold text-white">
                    There was a problem with your submission. Please review the fields below.</span>
            </div>)}
            <div className="grid justify-items-center"><h3 className="text-white text-2xl py-1">We`re finding your match</h3></div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className={`${error2['first_name'] ? `cfield-error` : ``}`}>
                        <input placeholder="First Name" className="bg-kapitus border-2 border-gray-300 py-1 w-full text-lg text-white font-semibold mb-4 p-2 focus:outline-none" type="text" {...register("first_name", { required: true })} onBlur={event => handleBlur(event)} />
                        {errors.first_name?.type === 'required' && <span className="text-formred m-2">First Name is Required</span>}
                    </div>
                    <div>
                        <input placeholder="Last Name" className="bg-kapitus border-2 border-gray-300 py-1 w-full text-lg text-white font-semibold mb-4 p-2 focus:outline-none" type="text" {...register("last_name", { required: true })} onBlur={event => handleBlur(event)} />
                        {errors.last_name?.type === 'required' && <span className="text-formred m-2">Last Name is Required</span>}
                    </div>
                    <div>
                        <input placeholder="Company Name*" className="bg-kapitus border-2 border-gray-300 py-1 w-full text-lg text-white font-semibold mb-4 p-2 focus:outline-none" type="text" {...register("company_name", { required: true })} onBlur={event => handleBlur(event)} />
                        {errors.company_name?.type === 'required' && <span className="text-formred m-2">Company Name is Required</span>}
                    </div>
                    <div>
                        <input placeholder="Please provide your email address to see your results:*" className="bg-kapitus border-2 border-gray-300 py-1 w-full text-lg text-white font-semibold mb-4 p-2 focus:outline-none" type="text" {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })} onBlur={event => handleBlur(event)} />
                        {errors.email?.type === 'required' && <span className="text-formred m-2">Email is Required</span>}
                        {errors.email?.type === 'pattern' && <span className="text-formred m-2">Email is Invalid</span>}
                    </div>
                </div>
                <div className="grid grid-cols-1">
                    <label
                        className="py-6 text-xl font-bold gfield_label text-white">
                        Web Site URL
                    </label>
                    <input
                        className="bg-kapitus border-2 border-gray-300 py-1 w-full text-lg text-white font-semibold mb-4 p-2 focus:outline-none"
                        name="website_url"
                        placeholder="https://example.com"
                        type="text"
                        onBlur={event => handleBlur(event)} />
                </div>
                <div className="flex grid-cols-1 gap-4 py-4">
                    <input name="specialist" className="mt-4 md:mt-2 lg:mt-1 mb-4" type="checkbox" value="Please assign a senior funding specialist to find me the best financing options" id="specialist" checked={fundspecialist} onBlur={event => handleBlur(event)} onChange={(e) => handleChange(e)} />
                    <label className="mt-2 text-sm text-white" htmlFor="specialist">
                        Please assign a senior funding specialist to find me the best financing options
                    </label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    <div className={`${fundspecialist ? `block` : `hidden`} ${error2['phone'] ? ` cfield-error` : ``}`}>
                        <input
                            placeholder="Please provide the best number to reach you:"
                            className="bg-kapitus border-2 border-gray-300 py-1 w-full text-lg text-white font-semibold mb-4 p-2 focus:outline-none"
                            type="tel" {...register("phone", { required: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/.test(phone) ? false : true })} maxLength={14} onChange={event => handleChange(event)} onBlur={event => handleBlur(event)} value={phone}
                        />
                        {errors.phone?.type === 'required' && (<span className="text-formred m-2">{phone == `` ? `Phone Number is Required` : `Phone format: (###) ###-####`}</span>)}
                    </div>
                    <div>
                        <select className="block w-full px-4 py-2 bg-kapitus text-white border border-gray-300 mb-4 focus:outline-none" {...register("about_us", { required: true })} onBlur={event => handleBlur(event)} onFocus={handleFocus}>
                            <option value="">How did you hear about us?</option>
                            {aboutus.map((option, i) => <option value={option} key={i}>{option}</option>)}
                        </select>
                        {errors.about_us?.type === 'required' && (<span className="text-formred m-2">About us is Required</span>)}
                    </div>
                </div>
                {hcaptcha && <div className="col-span-2 sm:col-span-1">
                    <HCaptcha
                        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
                        onVerify={handleVerify}
                        onExpire={handleExpire}
                    />
                </div>}
                <div className="flex">
                    <div className="w-1/2">
                        <button className="text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7" onClick={prevFormStep} type="button">Back</button>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <input className="float-right text-kapitus bg-white rounded p-1 my-4 mt-6 py-2 px-7"
                            /*onClick={handleSubmit}*/
                            type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        </div>
    );
}
