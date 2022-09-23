const currencyformat = (value) => {
    
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;
  
    // clean the input for any non-digit values.
    const currency = value.replace(/[^\d]/g, "");
  
    // Currency Length is return null if the length is 0
    if (currency.length == 0) return '';
    
    return '$'+ currency;
  }

  export default currencyformat;