// Define o usuário e senha corretos para a simulação
const usuarioCorreto = "ana@gmail.com";
const senhaCorreta = "12345";

// Seleciona os elementos do formulário no HTML
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('login-error');

// Adiciona um evento que "escuta" o envio do formulário
loginForm.addEventListener('submit', (event) => {
    // Impede o comportamento padrão do formulário, que é recarregar a página
    event.preventDefault();

    // Pega os valores digitados pelo usuário
    const emailDigitado = emailInput.value;
    const senhaDigitada = passwordInput.value;

    // Primeiro, esconde a mensagem de erro caso ela esteja visível de uma tentativa anterior
    errorMessage.classList.add('d-none');

    // Verifica se os dados digitados são iguais aos dados corretos
    if (emailDigitado === usuarioCorreto && senhaDigitada === senhaCorreta) {
        // Se forem corretos:
        alert("Login realizado com sucesso! Redirecionando...");

        // Redireciona para a página principal (mude 'index.html' se o nome do seu arquivo principal for outro)
        window.location.href = "index.html"; 
    } else {
        // Se forem incorretos:
        // Mostra a mensagem de erro, removendo a classe que a esconde
        errorMessage.classList.remove('d-none');
    }
});