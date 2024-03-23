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
    let notification = document.createElement('div');
    notification.classList.add('notification', 'success');
    notification.innerHTML = `
                                <p>${text}</p>
                                <button class="bg-green-50 hover:bg-green-200 rounded-lg p-2 close-button">
                                    <img class="w-6 h-6" src="./img/close-green-icon.png" />
                                </button>
                            `

    let notificationArea = document.getElementById('notification-area');
    notificationArea.appendChild(notification);

    setTimeout(() => { notification.remove() }, 6000);

    let closeButton = notification.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        notification.remove(); // Remover a notificação quando o botão for clicado
    });
};

export function showErrorMessage(text) {
    let notification = document.createElement('div');
    notification.classList.add('notification', 'error');
    notification.innerHTML = `
                                <p>${text}</p>
                                <button class="bg-red-50 hover:bg-red-200 rounded-lg p-2 close-button">
                                    <img class="w-6 h-6" src="./img/close-red-icon.png" />
                                </button>
                            `

    let notificationArea = document.getElementById('notification-area');
    notificationArea.appendChild(notification);

    setTimeout(() => { notification.remove() }, 6000);

    let closeButton = notification.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        notification.remove();
    });
};
//