import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cross from "../../Timesolid";



function FormCard({
    currentStep,
    prevFormStep,
    children,
    toggle
}) {

    const router = useRouter();
    let step = ['Tell us about you', 'Tell us about your company', 'Pick your partnership program', 'Tell us how we can reach you']

    const handleClick = () => {
        localStorage.setItem('partner_reload', 'true')
        setTimeout(() => {
            toggle(false)
        })
    }

    useEffect(() => {
        localStorage.setItem('partner_formstep', currentStep)
    }, [currentStep])


    return (
        <div>
            {currentStep <= 4 && (
                <div className="flex items-center">
                    {currentStep < 4 && <div className=" text-sm md:text-2xl text-gray-500">Step {currentStep + 1} of 4 - {step[parseInt(currentStep)]}</div>}
                    <div className="ml-auto cursor-pointer top-0 right-0 absolute" onClick={handleClick}>
                        <Cross className="cross" width={20} fill={"#fff"} />
                    </div>
                </div>
            )}
            {children}
        </div>
    );
}

export default FormCard;