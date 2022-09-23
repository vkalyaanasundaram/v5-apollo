const SSNformat = (value) => {

    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const ssnNumber = value.replace(/[^\d]/g, "");

    // Tax id Length is used to know when to apply our formatting for the tax id
    const ssnNumberLength = ssnNumber.length;
    // we need to return the value with no formatting if its less then three digits
    // this is to avoid weird behavior that occurs if you format the area code to early
    if (ssnNumberLength < 4) return ssnNumber;
    // if ssnNumberLength is greater than 3 and less the 9 we start to return
    // the formatted number
    if (ssnNumberLength < 6) {
        return `${ssnNumber.slice(0, 3)}-${ssnNumber.slice(3, 5)}`;
    }

    if (ssnNumberLength < 11) {
        return `${ssnNumber.slice(0, 3)}-${ssnNumber.slice(3, 5)}-${ssnNumber.slice(5, 10)}`;
    }
}
export default SSNformat;