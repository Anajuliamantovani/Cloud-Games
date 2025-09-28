const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('mouseenter', () => {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) {
      new bootstrap.Dropdown(dropdown).show();
    }
  });

  dropdown.addEventListener('mouseleave', () => {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (menu) {
      new bootstrap.Dropdown(dropdown).hide();
    }
  });
});

fetch('cabecalho.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('header-placeholder').innerHTML = data;
            });

fetch('rodape.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('rodape').innerHTML = data;
            });

function redirecionarPagina() {
    window.location.href = 'index.html';
}

// Seleciona todas as divs que representam uma opção de pagamento
const paymentOptions = document.querySelectorAll('.payment-option-custom');

// VERIFICA SE OS ELEMENTOS DE PAGAMENTO EXISTEM NA PÁGINA ATUAL
// Isso garante que o código só rode na página do carrinho, evitando erros.
if (paymentOptions.length > 0) {
    
    // Adiciona um "ouvinte" de clique para cada opção
    paymentOptions.forEach(option => {
        option.addEventListener('click', () => {

            paymentOptions.forEach(opt => {
                opt.classList.remove('active');
            });

            option.classList.add('active');

            const radioInput = option.querySelector('input[type="radio"]');
            if (radioInput) {
                radioInput.checked = true;
            }
        });
    });
}
