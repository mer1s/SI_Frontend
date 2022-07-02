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

export function hasLower(str) {
    return /[a-z]/g.test(str);
}

export function hasUpper(str) {
    return /[A-Z]/g.test(str);
}

export function hasNumber(str) {
    return /[0-9]/g.test(str);
}

export function hasSpec(str){
    // eslint-disable-next-line
    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if(format.test(str)){
        return true;
    } else {
        return false;
    }
}