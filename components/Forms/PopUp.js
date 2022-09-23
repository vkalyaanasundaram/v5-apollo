import React from 'react'
import Images from 'next/image'
import { useForm } from "react-hook-form"

function Popup(props) {

    const { register, handleSubmit, trigger, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data)
    }

    return (props.trigger) ?
        (<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" autoComplete="off">
            <div className="fixed h-full w-full top-0 left-0 right-0 bottom-0 z-50 transition ease-in-out delay-150">
                <div className="absolute top-20 bottom-auto w-full grid place-items-center px-8">
                    <div className="relative w-full bg-white max-w-3xl">
                        <div className="flex justify-end bg-kapitus opacity-90"><div className="h-10 opacity-60 font-bold text-lg text-white pr-4 pt-2 cursor-pointer" onClick={() => {
                            props.setTrigger(false)
                            document.body.style.overflowY = 'visible'
                        }} >CLOSE X</div></div>
                        <div className="flex place-items-center">
                            <div className="px-10 md:grid md:grid-cols-2 gap-2 w-full">
                                <h2 className="col-span-2 text-kapitus text-center text-3xl font-bold">Need some<br />assistance filling out<br />the application?</h2>
                                <p className="col-span-2 mb-5 text-center">Our representatives are available<br />Monday to Friday 9am to 5pm EST. </p>
                                <h2 className="col-span-2 mt-0 text-kapitus text-center">Call 646-798-8803</h2>
                                <p className="col-span-2 mb-0 text-center"> <span className="font-bold">Have a representative call you. </span>
                                    <br />All fields are mandatory.</p>
                                <div className="col-span-2 md:col-span-1 mb-2"><input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-lg w-full" placeholder="First Name" {...register("first_name", { required: true })} />
                                    {errors.first_name?.type === 'required' && (<span className="text-errorred m-2">First Name is Required</span>)}
                                </div>
                                <div className="col-span-2 md:col-span-1 mb-2"><input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-lg w-full" placeholder="Last Name" {...register("last_name", { required: true })} /></div>
                                <div className="col-span-2 mb-2"><input type="text" className="border-solid border-gray-300 border-2 p-2 h-12 font-semibold text-liteblue placeholder-liteblue text-lg w-full" placeholder="Business Name" {...register("business_name", { required: true })} /></div>
                                <div className="col-span-2 mb-2">
                                    <input type="text" className="border-solid border-gray-300 border-2 h-12 p-2 text-liteblue font-semibold placeholder-liteblue  text-lg w-full" placeholder="Phone Number" maxLength={14} />
                                </div>
                                <div className="col-span-2 mb-2">
                                    <input type="submit" className=" w-full text-white rounded bg-kapitusLiteGreen hover:bg-green-700 transition duration-900 ease-in-out cursor h-20 text-lg" value="Call Me" />
                                </div>
                            </div>
                            <div className="hidden md:block"><Images alt="contact-us" width="470" height="1200" src="/images/Pop-Over.jpg" className="w-full h-full" /></div>
                        </div>
                    </div></div></div></form>) : '';
}

export default Popup;
