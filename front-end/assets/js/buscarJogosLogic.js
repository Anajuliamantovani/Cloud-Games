document.addEventListener('DOMContentLoaded', () => {
    // 1. Extrai o termo de busca da URL
    const params = new URLSearchParams(window.location.search);
    const termoPesquisado = params.get('q');
    
    // Atualiza o título
    document.getElementById('resultadoTitulo').textContent = termoPesquisado 
        ? `Resultados para: "${termoPesquisado}"`
        : 'Todos os Jogos';

    // 2. Carrega o JSON dos dados
    // Lembre-se de ajustar o caminho para o seu arquivo dadosJogos.json
    fetch('../assets/json/dadosJogos.json') 
        .then(response => response.json())
        .then(JOGOS_DATA => {
            // 3. Filtra os jogos
            const jogosFiltrados = filtrarJogos(JOGOS_DATA, termoPesquisado);
            
            // 4. Renderiza os cards na tela
            renderizarCards(jogosFiltrados);
        })
        .catch(error => {
            console.error("Erro ao carregar ou processar dados:", error);
            document.getElementById('cardsContainer').innerHTML = '<p class="text-danger">Não foi possível carregar os jogos.</p>';
        });
});

function filtrarJogos(jogos, termo) {
    if (!termo) {
        return jogos; // Se não houver termo, retorna todos
    }
    const termoFormatado = termo.toLowerCase();
    
    return jogos.filter(jogo => 
        // Filtra se o título do jogo inclui o termo de busca
        jogo.titulo.toLowerCase().includes(termoFormatado)
    );
}

function renderizarCards(jogos) {
    const container = document.getElementById('cardsContainer');
    container.innerHTML = ''; // Limpa o container
    
    if (jogos.length === 0) {
        container.innerHTML = '<p class="text-white">Nenhum jogo encontrado. Tente outro termo.</p>';
        return;
    }

    jogos.forEach(jogo => {
        // Cria o HTML do Card
        const cardHtml = `

            <div class="row">
                <div class="col">


                    <div class="card mb-4 corCardGame text-white" style="max-width: auto; max-height: 180px;" onclick="redirecionarParaJogo('${jogo.id}')">
                        <div class="row">
                            <div class="col-auto m-2">
                                <img src="${jogo.banner}" class="rounded-start rounded " alt="..."
                                    style="width: 290px;">
                            </div>
                            <div class="col">
                                <div class="card-body">
                                    <h5 class="card-title">${jogo.titulo}</h5>
                                    <p class="card-text">
                                        data de lançamento: 24 de fevereiro de 2017
                                    </p>
                                    <p class="card-text"><small class="text-white>
                                        <span class="badge text-bg-primary rounded-pill">PC</span>
                                    </p>
                                    <div class="row d-flex align-items-center">
                                        <div class="col-auto">
                                            <p class="card-text"><small class="text-white">
                                                    <span class="badge text-bg-primary rounded-pill">JRPG</span>
                                                    <span class="badge text-bg-primary rounded-pill">RPG</span>
                                                    <span class="badge text-bg-primary rounded-pill">Ação</span>
                                                    <span class="badge text-bg-primary rounded-pill">Aventura</span>
                                                    <span class="badge text-bg-primary rounded-pill">Anime</span>
                                                </small>
                                            </p>
                                        </div>
                                        <div class="col-auto ms-auto">
                                            <div class="input-group">
                                                <button type="button" class="btn btn-secondary">R$${jogo.preco}</button>
                                                <button type="button" class="btn btn-primary">Adicionar ao
                                                    Carrinho</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        `;
        container.innerHTML += cardHtml;
    });
}

// 5. Função de Redirecionamento ao clicar no Card
function redirecionarParaJogo(gameId) {
    // Redireciona para jogo.html, passando o ID exato do jogo como parâmetro
    window.location.href = `telaJogo.html?id=${gameId}`; 
}
