/*
    
    É aqui onde mudamos as labels do formulário e as bordas do input para vermelho ou verde.
    Também temos funções pra exibir e ocultar mensagens de sucesso ou erro.

*/

// Fazendo ficar vermelho, verde ou resetar:
export function changeLabelAndInputToRed(label, text, input) {
    document.getElementById(label).setAttribute('style', 'color: red');
    document.getElementById(label).innerHTML = text;
    document.getElementById(input).setAttribute('style', 'border-color: red');
};


export function changeLabelAndInputToGreen(label, text, input) {
    document.getElementById(label).setAttribute('style', 'color: #22c55e; font-weight: 600;')
    document.getElementById(label).innerHTML = text;
    document.getElementById(input).setAttribute('style', 'border-color: #22c55e');
};

export function resetLabelAndInput(label, text, input) {
    document.getElementById(label).setAttribute('style', 'color: #111827; font-weight: 0;')
    document.getElementById(label).innerHTML = text;
    document.getElementById(input).setAttribute('style', 'border-color: #d1d5db');
    document.getElementById(input).value = "";
};
//

// Mensagens de sucesso e erro:
export function showSuccessMessage(text) {
    document.getElementById('success-message').setAttribute('style', 'display: block');
    document.getElementById('success-message').innerHTML = text;
    
};

export function hideSuccessMessage() {
    document.getElementById('success-message').setAttribute('style', 'display: none');
};

export function showErrorMessage(text) {
    document.getElementById('error-message').setAttribute('style', 'display: block');
    document.getElementById('error-message').innerHTML = text;
};

export function hideErrorMessage() {
    document.getElementById('error-message').setAttribute('style', 'display: none');
};
//