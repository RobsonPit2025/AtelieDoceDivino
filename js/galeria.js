console.log('[galeria.js] carregado');
window.GALERIA_LOADED = true;
/**
 * Inicializa uma galeria de produtos a partir de um conjunto de arquivos de imagem.
 * 
 * @param {Object} config - Configuração da galeria.
 * @param {string} config.containerId - ID do elemento HTML onde a galeria será renderizada.
 * @param {string} config.basePath - Caminho base para as imagens.
 * @param {string[]} config.arquivos - Lista de arquivos de imagem.
 * @param {string[]} [config.titulos] - Lista opcional de títulos para cada imagem.
 * @param {string} [config.tituloPadrao] - Título padrão caso `titulos` não seja fornecido.
 */
function initGaleria({ containerId, basePath, arquivos, titulos = [], tituloPadrao = "Produto" }) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container com ID "${containerId}" não encontrado.`);
        return;
    }

    container.innerHTML = "";
    console.log('[galeria.js] iniciando galeria em #' + containerId, { basePath, qtd: arquivos.length });

    arquivos.forEach((arquivo, index) => {
        const card = document.createElement("div");
        card.classList.add("card-produto");

        const img = document.createElement("img");
        img.src = `${basePath}/${arquivo}`;
        img.alt = titulos[index] || `${tituloPadrao} ${index + 1}`;
        img.style.width = "150px";
        img.style.height = "150px";
        img.style.objectFit = "cover";
        img.style.borderRadius = "8px";
        img.style.display = "block";
        img.style.margin = "0 auto";

        img.addEventListener("click", () => {
            abrirLightbox(img.src, img.alt);
        });

        const nome = document.createElement("h3");
        nome.textContent = titulos[index] || `${tituloPadrao} ${index + 1}`;

        const preco = document.createElement("p");
        preco.classList.add("preco");
        preco.textContent = "R$ 0,00"; // Pode ser atualizado com valores reais

        const btnAdicionar = document.createElement("button");
        btnAdicionar.textContent = "Adicionar ao carrinho";
        btnAdicionar.addEventListener("click", () => {
            adicionarAoCarrinho({
                nome: nome.textContent,
                preco: 0.0, // Ajustar conforme necessário
                imagem: img.src
            });
        });

        card.appendChild(img);
        card.appendChild(nome);
        card.appendChild(preco);
        card.appendChild(btnAdicionar);

        container.appendChild(card);
    });
}

/**
 * Adiciona um item ao carrinho.
 * Essa função deve ser adaptada ao sistema de carrinho existente.
 */
function adicionarAoCarrinho(item) {
    console.log("Item adicionado ao carrinho:", item);
    // Aqui você pode integrar com o carrinho real do site
}

// ===== Lightbox =====
function criarLightbox() {
    const lightbox = document.createElement("div");
    lightbox.id = "lightbox";
    lightbox.className = "lightbox"; // usa estilos do CSS
    lightbox.innerHTML = `
        <span id="lightbox-fechar" class="lightbox-close">&times;</span>
        <img id="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    const fechar = document.getElementById("lightbox-fechar");
    if (fechar) fechar.addEventListener("click", fecharLightbox);
    lightbox.addEventListener("click", (e) => {
        if (e.target.id === "lightbox") fecharLightbox();
    });
}

function abrirLightbox(src, alt) {
    let lightbox = document.getElementById("lightbox");
    if (!lightbox) { criarLightbox(); lightbox = document.getElementById("lightbox"); }
    const img = document.getElementById("lightbox-img");
    img.src = src;
    img.alt = alt;
    lightbox.classList.add("show");
}

function fecharLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        lightbox.classList.remove("show");
    }
}