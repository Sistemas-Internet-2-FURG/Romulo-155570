/*

    Aqui adicionamos . e - nos números inseridos no input do CPF.

*/

function formatCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length <= 3) {
        return cpf;
    } else if (cpf.length <= 6) {
        return cpf.slice(0, 3) + '.' + cpf.slice(3);
    } else if (cpf.length <= 9) {
        return cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6);
    } else {
        return cpf.slice(0, 3) + '.' + cpf.slice(3, 6) + '.' + cpf.slice(6, 9) + '-' + cpf.slice(9);
    }
}

function changeCPF(event) {
    var input = event.target;
    var cpf = input.value;

    cpf = formatCPF(cpf);
    input.value = cpf; 
}

document.getElementById('cpf').addEventListener('input', changeCPF);