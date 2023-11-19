const IsPropertyValid = (regex,str,limit) => {
    if(str.length <=limit)
        return regex.test(str);
    return false;
}



export default IsPropertyValid;