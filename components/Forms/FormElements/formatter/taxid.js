
const Taxid = (value) => {
    
    // if input value is falsy eg if the user deletes the input, then just return
    if (!value) return value;

    // clean the input for any non-digit values.
    const phoneNumber = value.replace(/[^\d]/g, "");

    // Tax id Length is used to know when to apply our formatting for the tax id
    const phoneNumberLength = phoneNumber.length;

    // we need to return the value with no formatting if its less then three digits
    // this is to avoid weird behavior that occurs if you format the area code to early
    if (phoneNumberLength < 3) return phoneNumber;
    // if phoneNumberLength is greater than 3 and less the 9 we start to return
    // the formatted number
    if (phoneNumberLength < 5) {
        return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(2, 7)}`;
    }
    // finally, if the phoneNumberLength is greater then four, we add the last
    // bit of formatting and return it.
    return `${phoneNumber.slice(0, 2)}-${phoneNumber.slice(
        2,
        9
    )}`;
}
export default Taxid;