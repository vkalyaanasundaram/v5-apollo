import Head from 'next/head'
import { useState } from "react";
import FormCard from "./Forms/multi-form/FormCard"
import FinancingNeed from "./Forms/multi-form/FinancingNeed"
import NeedMoney from "./Forms/multi-form/NeedMoney"
import Industry from "./Forms/multi-form/Industry"
import StartBusiness from "./Forms/multi-form/StartBusiness"
import AnnualRevenue from "./Forms/multi-form/AnnualRevenue"
import Repay from "./Forms/multi-form/Repay"
import MyBusiness from "./Forms/multi-form/MyBusiness"
import Loan from "./Forms/multi-form/Loan"
import CreditScore from "./Forms/multi-form/CreditScore"
import ConfirmPurchase from "./Forms/multi-form/ConfirmPurchase"
import FormCompleted from "./Forms/multi-form/FormCompleted"
import styles from '../styles/components/PopUpGetStarted.module.scss';

export default function PopUpGetStarted({
    toggle,
    username,
    password
  }) {

    let localdata = ['gfproduct', 'gffund', 'gfindustry', 'gfmonth', 'gfyear', 'gfcheckbox', 'gfrevenue', 'gfrepayment', 'gfbusiness', 'gfloan', 'gflender', 'gfcreditscore', 'gfpersonalinfo']
    let data1 = {}
    localdata.map((item, i) => {
        data1[item.replace("gf", "")] = localStorage.getItem(item) || ''
    })
    const [data, setData] = useState(data1)
    let initialStep = localStorage.getItem('getstarted_formstep') ? parseInt(localStorage.getItem('getstarted_formstep')) : 0
    const [formStep, setFormStep] = useState(initialStep);
    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);
    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <Head>
                    <title>Business Loan Financing For Merchants Up to $500K Same Day Approvals</title>
                </Head>
                <FormCard currentStep={formStep} prevFormStep={prevFormStep} toggle={toggle}>
                    {formStep >= 0 && (
                        <FinancingNeed formStep={formStep} nextFormStep={nextFormStep} data={data} setData={setData} />
                    )}
                    {formStep >= 1 && (
                        <NeedMoney formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
                    )}
                    {formStep >= 2 && (
                        <Industry formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
                    )}
                    {formStep >= 3 && (
                        <StartBusiness formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
                    )}
                    {formStep == 4 && (
                        <AnnualRevenue formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
                    )}
                    {formStep == 5 && (
                        <Repay formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
                    )}
                    {formStep == 6 && (
                        <MyBusiness formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
                    )}
                    {formStep == 7 && (
                        <Loan formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
                    )}
                    {formStep == 8 && (
                        <CreditScore formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} />
                    )}
                    {formStep == 9 && (
                        <ConfirmPurchase formStep={formStep} nextFormStep={nextFormStep} prevFormStep={prevFormStep} data={data} setData={setData} username={username} password={password} />
                    )}
                    {formStep == 10 && <FormCompleted formStep={formStep} />}
                </FormCard>
            </div>
        </div>
    );
}