import Head from 'next/head'
import { useState } from "react";
import FormCard from "./Forms/partner-form/FormCard"
import You from "./Forms/partner-form/You"
import Company from "./Forms/partner-form/Company"
import Program from "./Forms/partner-form/Program"
import Reach from "./Forms/partner-form/Reach"
import FormCompleted from "./Forms/partner-form/FormCompleted"
import styles from '../styles/components/PopUpGetStarted.module.scss';

export default function PopUpPartner({ toggle,
    username,
    password }) {
    let localdata = ['partner_first_name', 'partner_last_name', 'partner_title', 'partner_company_name', 'partner_company_website', 'partner_states', 'partner_zip_code', 'partner_program', 'partner_email', 'partner_phone']
    let data1 = {}
    localdata.map((item, i) => {
        data1[item] = localStorage.getItem(item) || ''
    })

    const [data, setData] = useState({})
    let initialStep = localStorage.getItem('partner_formstep') ? parseInt(localStorage.getItem('partner_formstep')) : 0
    const [formStep, setFormStep] = useState(initialStep);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <Head>
                    <title>Next.js Multi Step Form</title>
                </Head>
                <FormCard currentStep={formStep} prevFormStep={prevFormStep} toggle={toggle}>
                    {formStep == 0 && (
                        <You formStep={formStep} nextFormStep={nextFormStep} data={data} setData={setData} />
                    )}
                    {formStep == 1 && (
                        <Company formStep={formStep} prevFormStep={prevFormStep} nextFormStep={nextFormStep} data={data} setData={setData} />
                    )}
                    {formStep == 2 && (
                        <Program formStep={formStep} prevFormStep={prevFormStep} nextFormStep={nextFormStep} data={data} setData={setData} />
                    )}
                    {formStep == 3 && (
                        <Reach formStep={formStep} prevFormStep={prevFormStep} nextFormStep={nextFormStep} data={data} setData={setData} username={username} password={password} />
                    )}
                    {formStep >= 4 && <FormCompleted formStep={formStep} />}
                </FormCard>
            </div>
        </div>
    );
}