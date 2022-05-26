export const addToStringArray = (string, value) =>{
    if(string !== ""){
            return string + ',' + value
    } else{
        return value
    }
}

export const removeFromStringArray = (string, value) =>{
    let temp = string.split(',');
    temp = temp.filter(n => n !== value);

    let toReturn = ''
    temp.forEach(m => {
        toReturn += m + ','
    });

    return toReturn.slice(0, -1)
}
