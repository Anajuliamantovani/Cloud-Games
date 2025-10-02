function carregarDetalhesJogo(jogo) {
    // 1. TÍTULO E PLATAFORMAS (Badges)
    const tituloElemento = document.getElementById('tituloJogo');
    
    // Atualiza o Título principal
    tituloElemento.textContent = jogo.titulo; 

    // Limpa e recria os Badges de Plataforma
    // Você precisará de uma div vazia no HTML com id="plataformasBadges" para isso
    const badgesContainer = document.getElementById('plataformasBadges');
    if (badgesContainer) {
        badgesContainer.innerHTML = '';
        jogo.plataformas.forEach(plataforma => {
            const badge = document.createElement('span');
            badge.className = 'badge text-bg-primary rounded-pill me-2';
            badge.textContent = plataforma;
            badgesContainer.appendChild(badge);
        });
    }

    // 2. CARROSSEL (O mais complexo)
    // Para simplificar, vou preencher a primeira imagem (ou o vídeo) e as miniaturas:
    const carouselInner = document.querySelector('#gameCarousel .carousel-inner');
    const miniaturasContainer = document.querySelector('.row.mt-2.g-2'); // O container das miniaturas

    // **Atenção:** Você precisará ter o array de imagens no seu JSON:
    // Exemplo no JSON: "imagensCarrossel": ["../assets/img/metaphor/video.webm", "../assets/img/metaphor/img1.jpg", ...]
    
    carouselInner.innerHTML = '';
    miniaturasContainer.innerHTML = '';

    jogo.imagensCarrossel.forEach((src, index) => {
        // Cria o slide do Carrossel
        const carouselItem = document.createElement('div');
        carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;

        // Determina se é um vídeo ou uma imagem
        if (src.endsWith('.webm') || src.endsWith('.mp4')) {
             // Insere o vídeo (como fizemos antes)
             carouselItem.innerHTML = `
                 <video controls autoplay muted loop class="d-block w-100 carousel-image">
                     <source src="${src}" type="video/${src.endsWith('.webm') ? 'webm' : 'mp4'}"> 
                 </video>`;
        } else {
            // Insere a imagem
            carouselItem.innerHTML = `
                <img src="${src}" class="d-block w-100 carousel-image" alt="Imagem ${index + 1} do Jogo">`;
        }
        carouselInner.appendChild(carouselItem);


        // Cria a miniatura (thumbnail)
        const miniaturaCol = document.createElement('div');
        miniaturaCol.className = 'col-3';
        miniaturaCol.innerHTML = `
            <a href="#" data-bs-target="#gameCarousel" data-bs-slide-to="${index}"
                class="thumbnail-link ${index === 0 ? 'active' : ''}">
                <img src="${jogo.thumbnail[index]}" class="d-block w-100 rounded"
                    alt="Miniatura ${index + 1}">
            </a>`;
        miniaturasContainer.appendChild(miniaturaCol);
    });
    
    // 3. BANNER LATERAL E DESCRIÇÃO
    document.getElementById('bannerLateral').src = jogo.banner; // Imagem do card lateral
    document.getElementById('descricaoCurta').textContent = jogo.descricaoCurta; // Texto do card lateral
    
    // 4. PREÇO
    document.getElementById('precoJogo').textContent = jogo.preco; 
    
    // 5. DATA DE LANÇAMENTO, DESENVOLVIMENTO, ETC.
    document.getElementById('dataLancamento').textContent = `Data de Lançamento: ${jogo.dataLancamento}`;
    document.getElementById('desenvolvimento').textContent = `Desenvolvimento: ${jogo.desenvolvimento}`;
    // ... e assim por diante para todos os detalhes
}