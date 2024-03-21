import { isFirstNameValid, isSecondNameValid, isEmailValid, isCpfValid, isRegionValid, isDateValid, selectRegion, inputDate } from "./form-listeners.js";
import { changeLabelAndInputToRed, hideErrorMessage, hideSuccessMessage, resetLabelAndInput, showErrorMessage, showSuccessMessage } from "./form-feedback.js";
import { checkAge } from "./date-check.js";

let form = document.getElementById("main-form");

function resetAllInputs() {
    resetLabelAndInput('label-firstName', 'Nome', 'first-name');
    resetLabelAndInput('label-secondName', 'Sobrenome', 'second-name');
    resetLabelAndInput('label-email', 'E-mail', 'email');
    resetLabelAndInput('label-cpf', 'CPF', 'cpf');
    resetLabelAndInput('label-region', 'UF', 'region');
    resetLabelAndInput('label-date', 'Data de nascimento', 'date');
};

function errorMessage(){
    showErrorMessage('Corrija os campos inválidos.');
    setTimeout(() => { hideErrorMessage() }, 6000);
}

function formSubmit() {
    if (selectRegion.value == "") {
        changeLabelAndInputToRed('label-region', 'UF inválida', 'region');
        errorMessage();
        return
    }

    if (inputDate.value.lenght < 10) {
        changeLabelAndInputToRed('label-date', 'Data de nascimento inválida', 'date');
        errorMessage();
        return
    } else if (!checkAge(inputDate.value)) {
        changeLabelAndInputToRed('label-date', 'Você precisa ser maior de 16 anos e não ter mais de 120 anos de idade', 'date');
        showErrorMessage('Corrija os campos inválidos.');
        setTimeout(() => { hideErrorMessage() }, 6000);
        return
    }

    switch (true) {
        case !isFirstNameValid:
            errorMessage();
            changeLabelAndInputToRed('label-firstName', 'Nome inválido, insira no mínimo 3 caracteres', 'first-name');
            break;
        case !isSecondNameValid:
            errorMessage();
            changeLabelAndInputToRed('label-secondName', 'Sobrenome inválido, insira no mínimo 3 caracteres', 'second-name');
            break;
        case !isEmailValid:
            errorMessage();
            changeLabelAndInputToRed('label-email', 'E-mail inválido', 'email');
            break;
        case !isCpfValid:
            errorMessage();
            changeLabelAndInputToRed('label-region', 'CPF inválido', 'cpf');
            break;
        case !isRegionValid:
            errorMessage();
            changeLabelAndInputToRed('label-cpf', 'UF inválida', 'region');
            break;
        case !isDateValid:
            errorMessage();
            changeLabelAndInputToRed('label-date', 'Data de nascimento inválida', 'date');
            break;
        default:
            showSuccessMessage('Conta criada com sucesso.');
            setTimeout(() => { hideSuccessMessage() }, 6000);
            resetAllInputs();
    };
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (typeof formSubmit === "function") {
        formSubmit();
    }
});
