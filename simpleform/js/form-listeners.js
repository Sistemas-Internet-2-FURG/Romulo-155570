/*
    Esse documento adiciona "listeners" para fazer a validação em tempo real do que está sendo digitado pelo usuário...

    Critérios adotados:
        Nome - mínimo de 3 caracteres
        Email - mínimo de 7 caracteres e validação com regex (precisa ter @algumacoisa.com)
        Data - mínimo de 16 anos de idade
        CPF - precisa ter 14 caracteres e validação com "Módulo 11"

*/

import { checkCPF } from "./cpf-check.js";
import { changeLabelAndInputToRed, changeLabelAndInputToGreen } from "./form-feedback.js";

let inputFirstName = document.getElementById("first-name");
export var isFirstNameValid = false;

let inputSecondName  = document.getElementById("second-name");
export var isSecondNameValid = false;

let inputEmail  = document.getElementById("email");
export var isEmailValid = false;

let inputCpf  = document.getElementById("cpf");
export var isCpfValid = false;

export let selectRegion = document.getElementById('region');
export var isRegionValid = false;

export let inputDate = document.getElementById('date');
export var isDateValid = false;

// Nome:
inputFirstName.addEventListener('keyup', () => {
    if(inputFirstName.value.length <= 2) {
        changeLabelAndInputToRed('label-firstName', 'Nome inválido, insira no mínimo 3 caracteres', 'first-name');
        isFirstNameValid = false;
    } else {
        changeLabelAndInputToGreen('label-firstName', 'Nome', 'first-name');
        isFirstNameValid = true;
    }
})
//

// Sobrenome:
inputSecondName.addEventListener('keyup', () => {
    if(inputSecondName.value.length <= 2) {
        changeLabelAndInputToRed('label-secondName', 'Sobrenome inválido, insira no mínimo 3 caracteres', 'second-name');
        isSecondNameValid = false;
    } else {
        changeLabelAndInputToGreen('label-secondName', 'Sobrenome', 'second-name');
        isSecondNameValid = true;
    }
})                     
//

// Email:
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

inputEmail.addEventListener('keyup', () => {
    if(inputEmail.value.length <= 7 || !validateEmail(email.value)){
        changeLabelAndInputToRed('label-email', 'E-mail inválido', 'email');
        isEmailValid = false;
    } else {
        changeLabelAndInputToGreen('label-email', 'E-mail', 'email');
        isEmailValid = true;
    }
})
//

// CPF:
inputCpf.addEventListener('keyup', () => {
    if(!checkCPF(inputCpf.value)){
        changeLabelAndInputToRed('label-cpf', 'CPF inválido', 'cpf');
        isCpfValid = false;
    } else {
        changeLabelAndInputToGreen('label-cpf', 'CPF', 'cpf');
        isCpfValid = true;
    }
})
//

// Região:
selectRegion.addEventListener('change', function() {
    if (selectRegion.value == "") {
        changeLabelAndInputToRed('label-region', 'UF inválida', 'region');
        isRegionValid = false;
    } else {
        changeLabelAndInputToGreen('label-region', 'UF', 'region');
        isRegionValid = true;
    }
});
//

// Data:
inputDate.addEventListener('keyup', function() {
    if (inputDate.value.length < 10) {
        changeLabelAndInputToRed('label-date', 'Data de nascimento inválida', 'date');
        isDateValid = false;
    } else {
        changeLabelAndInputToGreen('label-date', 'Data de nascimento', 'date');
        isDateValid = true;
    }
});
//