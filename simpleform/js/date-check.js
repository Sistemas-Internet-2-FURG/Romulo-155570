/*
    Checa a idade e retorna true or false baseados em minAge e maxAge.
*/ 

const minAge = 16;
const maxAge = 130;

export function checkAge(date) {
    var parseData = date.split("-");
    var yearTyped = parseData[0];

    var actualYear = new Date();
    actualYear = actualYear.getFullYear();

    if (yearTyped > actualYear) {
        return false;
    }
    
    var age = actualYear - yearTyped;
    if (age < minAge || age > maxAge) {
        return false;
    };

    return true;

}