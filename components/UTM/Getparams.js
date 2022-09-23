import { FastAppHiddenForm, commonShortForm, invoiceShortForm, equipmentShortForm, equipmentLongForm, SubscribeForm, NewsLetter } from '../Forms/FormElements/Variables';

export default function Getparams({hiddenfields}) {
  let result = {}
  let formFields = []

  switch(hiddenfields.form) {

    case "fast-application":
      formFields = FastAppHiddenForm;
    break;
    case "common-short-form":
      formFields = commonShortForm;
      break;
    case "invoice-short-form":
    case "invoice-fast-app":
      formFields = invoiceShortForm;
      break;
    case "equipment-short-form":
      formFields = equipmentShortForm;
      break;
    case "equipment-fast-app":
      formFields = equipmentLongForm;
      break;
    case "subscribe-blog":
      formFields = SubscribeForm;
      break;
    case "news-letter":
      formFields = NewsLetter;
      break;
    default: 
      formFields = FastAppHiddenForm
  }
    

  formFields.map((item) => {
    if(hiddenfields[item.name])
      result[item.id] = hiddenfields[item.name]
  });
  return result;
};