import styles from '../../../styles/components/PopUpGetStarted.module.scss';


function FormCompleted({
  formStep,
}) {

  let localdata = ['partner_first_name', 'partner_last_name', 'partner_title', 'partner_company_name', 'partner_company_website', 'partner_states', 'partner_zip_code', 'partner_program', 'partner_email', 'partner_phone', 'partner_formstep']

  localStorage.removeItem('partner_formstep')

  localdata.map((item, i) => localStorage.removeItem(item))
  return <div className={formStep > 3 ? styles.showForm : styles.hideForm}>
  <h2 className="text-white">Thank you for telling us about your business! If you are not directed to our Solutions page, click here.</h2></div>;
}

export default FormCompleted;