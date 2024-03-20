function formatarCPF(cpf) {
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
function aplicarFormatacao(event) {
    var input = event.target;
    var valor = input.value;

    valor = formatarCPF(valor);
    
    // Mudando o valor do input:
    input.value = valor; 
}

document.getElementById('cpf').addEventListener('input', aplicarFormatacao);