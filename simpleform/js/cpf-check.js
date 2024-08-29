/*
    Essa função implementa o Módulo 11:
        1º Da direita para a esquerda, cada dígito do número é multiplicado por um peso específico;
        2º Os resultados da multiplicação são somados;

        3º O resultado da soma é então dividido por 11;
        4º O resto desta divisão é calculado;

    Suponha que temos o CPF "123.456.789-XX". Para calcular o último dígito verificador "XX":

    9 * 2 + 8 * 3 + 7 * 4 + 6 * 5 + 5 * 6 + 4 * 7 + 3 * 8 + 2 * 9 = 352

    352 % 11 = 6 (resto)

    Como o resto é diferente de 0 ou 1, calculamos o dígito verificador como (11 - resto) = 11 - 6 = 5.
    Então, o primeiro "X" para este CPF é "5".

    Repetimos o processo adicionando o 5 no final e então teremos o outro "X".

    Dessa forma, o CPF completo seria "123.456.789-52".

*/

export function checkCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // removendo o que não é número
    if (cpf.length !== 11) {
        return false;
    }

    // verificando se todos os dígitos são iguais:
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // calculando o primeiro dígito verificador
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = soma % 11;
    var digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf.charAt(9)) !== digitoVerificador1) {
        return false;
    }

    // calculando o segundo dígito verificador
    soma = 0;
    for (var i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    var digitoVerificador2 = resto < 2 ? 0 : 11 - resto;
    
    if (parseInt(cpf.charAt(10)) !== digitoVerificador2) {
        return false;
    }

    // CPF válido
    return true;
}