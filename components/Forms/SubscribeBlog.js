import React, { useRef, useState } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form"
import { useRouter } from "next/router";
import { newsletterForm } from './FormElements/Variables'
import { Base64 } from 'js-base64'
import Getparams from '../UTM/Getparams'
import HCaptcha from '@hcaptcha/react-hcaptcha';


function SubscribeBlog({username, password}) {

const { register, handleSubmit, watch, trigger, formState: { errors } } = useForm();
const key = useRef()
const router = useRouter();
const [random, setRandom] = useState(Math.random().toString(36).substr(2, 6))
const [verify, setVerify] = useState(false)
const [hcaptcha, setHcaptcha] = useState(false)
const auth = Base64.btoa(`${username}:${password}`);
let config = { headers: { 'authorization': `${auth}` } }
let requestForm = {}
  
const onSubmit = (data) => {
  if(!verify)
    return

  newsletterForm.map((item, i) => {
    if(data[item.name] !== '' ) {
      requestForm[item.id] = data[item.name]
    }
  })

  let hiddenfields = { ...router.query, form: 'subscribe-blog'}
  let HiddenParams = Getparams({hiddenfields})
  if(HiddenParams)
    requestForm = { ...requestForm, ...HiddenParams};

  requestForm['form_id'] = 10 //form id
  //requestForm[12] = key.current.value //alpha numeric key
   axios
  .post(process.env.NEXT_PUBLIC_SHORT_FORM, {"form_data": requestForm}, config)
  .then(response => {
    if(response.data) {
      console.log('re -' + response.data )
      //router.push('/fast-application-thank-you')
      //document.getElementById("entry_id").value = response.data
      document.getElementById("subscribe-blog").innerHTML = 'Thank you for Subscribing the Blog'
    }
  });
}

const handleVerify = (event) => {
  console.log('Captcha value:', event);
  setVerify(true)
}

const handleBlur = (event) => {
  trigger(event.target.name)
}
const handleExpire = () => {
  console.log("hCaptcha Token Expired");
  setVerify(false)
};

const handleFocus = () => {
  setHcaptcha(true)
}

return (
    <form name="gform" id="subscribe-blog" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <p className="mt-3 relative text-titleGreen z-0 w-full grid place-items-center">SUBSCRIBE TO OUR BLOG FOR MORE TIPS ON HOW TO GROW YOUR BUSINESS</p>
      <div className="grid grid-cols-1 gap-6 mt-4">
        <div className="grid-cols-1 relative">
            <input type="text" placeholder="Email*" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 placeholder-kapitus" {...register("email_address", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i  })} onBlur={event => handleBlur(event)} onFocus={handleFocus} />
            {errors.email_address?.type === 'required' && (<span className="text-errorred m-2">Email is Required</span>)}
            {errors.email_address?.type === 'pattern' && (<span className="text-errorred m-2">Email is Invalid</span>)}
        </div>
        {hcaptcha && <div className="grid-cols-1 sm:grid-cols-1">
          <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY}
          onVerify={handleVerify}
          onExpire={handleExpire}
          />
        </div>}
        <div className="grid-cols-1 sm:grid-cols-1">
          <input type="hidden" ref={key} value={random} />
          <input className="h-12 w-full text-white rounded bg-kapitus hover:bg-green-700 transition duration-900 ease-in-out" type="submit" />
        </div>
      </div>
    </form>
  )
}
export default SubscribeBlog;