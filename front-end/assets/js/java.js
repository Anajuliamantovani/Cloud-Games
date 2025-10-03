// ===============================================
// == CÓDIGO EXISTENTE
// ===============================================

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
        // Primeiro, insere o HTML do cabeçalho na página
        document.getElementById('header-placeholder').innerHTML = data;

        // ===============================================
        // == CÓDIGO DA BUSCA (INSERIDO AQUI!) ==
        // ===============================================
        // Agora que o cabeçalho existe, podemos adicionar a funcionalidade de busca.

        const searchInput = document.getElementById('searchInput');

        // Só executa o código de busca se o campo existir
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                const searchTerm = searchInput.value.trim().toLowerCase();
                const gameCards = document.querySelectorAll('.game-card');

                gameCards.forEach(function (card) {
                    const gameTitleElement = card.querySelector('.game-title');
                    if (gameTitleElement) {
                        const gameTitle = gameTitleElement.textContent.toLowerCase();

                        if (gameTitle.includes(searchTerm)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        }
        // ===============================================
        // == FIM DO CÓDIGO DA BUSCA
        // ===============================================
    });

fetch('rodape.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('rodape').innerHTML = data;
    });

function redirecionarPagina() {
    window.location.href = 'index.html';
}

// Código para gerenciar a seleção de opções de pagamento no carrinho
const paymentOptions = document.querySelectorAll('.payment-option-custom');

if (paymentOptions.length > 0) {
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


function iniciarPesquisa() {
    const termo = document.getElementById('searchInput').value.trim();
    const termoCodificado = encodeURIComponent(termo);

    if (termoCodificado) {
        // **MUDANÇA AQUI:** Redireciona para buscarJogos.html com o termo 'q'
        window.location.href = `buscaJogos.html?q=${termoCodificado}`;
    } else {
        // Se a busca estiver vazia, pode-se ir para a página de busca para mostrar todos
        window.location.href = `buscaJogos.html`;
    }
}


