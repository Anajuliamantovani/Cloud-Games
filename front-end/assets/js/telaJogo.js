// Localização do seu arquivo JSON. Ajuste o caminho se necessário!
const JSON_PATH = '../assets/json/dadosJogos.json'; 

document.addEventListener('DOMContentLoaded', () => {
    // 1. Extrai o ID do jogo da URL (parâmetro ?id=)
    const params = new URLSearchParams(window.location.search);
    const gameId = params.get('id');

    if (!gameId) {
        // Se não houver ID na URL, mostra um erro básico e para
        document.getElementById('tituloJogo').textContent = "Erro: Jogo não especificado.";
        return;
    }

    // 2. Carrega o JSON com os dados de todos os jogos
    fetch(JSON_PATH)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados dos jogos. Status: ' + response.status);
            }
            return response.json();
        })
        .then(JOGOS_DATA => {
            // 3. Busca o jogo pelo ID exato
            const jogoEncontrado = JOGOS_DATA.find(jogo => jogo.id === gameId);

            if (jogoEncontrado) {
                carregarDetalhesJogo(jogoEncontrado);
            } else {
                document.getElementById('tituloJogo').textContent = "Jogo não encontrado.";
                // Esconde a área principal se o jogo não for encontrado
                document.querySelector('.container.px-0').style.display = 'none';
            }
        })
        .catch(error => {
            console.error("Erro no carregamento dos dados:", error);
            document.getElementById('tituloJogo').textContent = "Falha ao carregar dados do servidor.";
        });
});

/**
 * Preenche a página HTML com os detalhes do objeto jogo fornecido.
 * @param {Object} jogo - Objeto contendo todos os dados do jogo.
 */
function carregarDetalhesJogo(jogo) {
    // 1. TÍTULO
    document.getElementById('tituloJogo').textContent = jogo.titulo;

    // Exibe uma string (texto)
    console.log("O jogo foi carregado com sucesso!");

    // 2. PREENCHE DADOS DO CARD LATERAL (BANNER, DESCRIÇÃO, DETALHES)
    document.getElementById('bannerLateral').src = jogo.banner || '';
    document.getElementById('descricaoCurta').textContent = jogo.descricaoCurta || 'Descrição não disponível.';
    
    // Detalhes (Data, Dev, Dist)
    document.getElementById('dataLancamento').textContent = `Data de Lançamento: ${jogo.dataLancamento || 'N/A'}`;
    document.getElementById('desenvolvimento').textContent = `Desenvolvimento: ${jogo.desenvolvimento || 'N/A'}`;
    document.getElementById('distribuidora').textContent = `Distribuidora: ${jogo.distribuidora || 'N/A'}`;

    // 3. PREÇO
    document.getElementById('precoJogo').textContent = jogo.preco || 'Preço Indisponível';

    // 4. BADGES DE PLATAFORMA, CATEGORIA E MODO DE JOGO
    // Função auxiliar para criar e injetar os badges
    const injetarBadges = (containerId, listaBadges) => {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '';
            (listaBadges || []).forEach(texto => {
                const badge = document.createElement('span');
                badge.className = 'badge text-bg-primary rounded-pill me-1';
                badge.textContent = texto;
                container.appendChild(badge);
            });
        }
    };
    
    injetarBadges('plataformasBadges', jogo.plataformas);
    injetarBadges('categoriaBadges', jogo.categorias);
    injetarBadges('modoJogoBadges', jogo.modoJogo);
    
    // 5. REQUISITOS DO SISTEMA
    // Assumindo que os requisitos vêm como strings formatadas no JSON
    document.getElementById('requisitosMinimos').innerHTML = jogo.requisitosMinimos || 'Não especificado.';
    document.getElementById('RequisitosRecomendados').innerHTML = jogo.RequisitosRecomendados || 'Não especificado.';
    
    // 6. CARROSSEL E MINIATURAS (A lógica mais complexa)

     // 6.1 VÍDEO PRINCIPAL (CORREÇÃO DE CARREGAMENTO)
    const videoElement = document.getElementById('gameVideo');
    const videoSource = document.getElementById('videoSource');
    
    if (videoElement && videoSource && jogo.videoSrc) {
        // 1. Altera o SRC da tag <source>
        videoSource.src = jogo.videoSrc;
        
        // 2. Tenta recarregar o vídeo (ESSENCIAL PARA QUE O NAVEGADOR RECONHEÇA A MUDANÇA)
        videoElement.load();
        
        // 3. Opcional: Garante que ele volte a tocar, pois 'load' pode parar
        videoElement.play(); 
    }

    // 6.2 SLIDES DE IMAGENS PRINCIPAIS
    const imagemSlides = [
        document.getElementById('imagemSlide1'),
        document.getElementById('imagemSlide2'),
        document.getElementById('imagemSlide3'),
        document.getElementById('imagemSlide4')
    ];
    const imagemSources = [
        jogo.imagemSrc1,
        jogo.imagemSrc2,
        jogo.imagemSrc3,
        jogo.imagemSrc4
    ];

    imagemSlides.forEach((imgElement, index) => {
        if (imgElement && imagemSources[index]) {
            imgElement.src = imagemSources[index];
        }
    });

    // Lista de elementos de miniatura no HTML (começando pela miniatura do vídeo)
    const miniaturas = [
        document.getElementById('miniatura0'), // Este é o thumb do slide de VÍDEO (data-bs-slide-to="0")
        document.getElementById('miniatura1'),
        document.getElementById('miniatura2'),
        document.getElementById('miniatura3'),
        document.getElementById('miniatura4')
    ];

    // Lista de fontes que serão injetadas nas miniaturas
    const thumbnailSources = [
        jogo.imagemSrc1, // Usando a primeira imagem como thumb para o vídeo
        jogo.imagemSrc1,
        jogo.imagemSrc2,
        jogo.imagemSrc3,
        jogo.imagemSrc4
    ];

    miniaturas.forEach((thumbElement, index) => {
        if (thumbElement && thumbnailSources[index]) {
            thumbElement.src = thumbnailSources[index];
        }
    });

}

