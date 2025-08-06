// Dados dos produtos (adicione os da sua cliente)
const produtos = [
    {
        id: 1,
        nome: "Bolo de Chocolate",
        preco: 50.00,
        imagem: "imagens/bolo-chocolate.jpg",
        descricao: "Bolo fofinho com cobertura de ganache",
        categoria: "bolos"
    },
    {
        id: 2,
        nome: "Brigadeiro Gourmet",
        preco: 2.50,
        imagem: "imagens/brigadeiro.jpg",
        descricao: "Brigadeiro premium com chocolate 70%",
        categoria: "bolos"
    }
];

let carrinho = [];

// Renderiza os produtos na página
function renderizarProdutos(categoriaSelecionada = 'todos') {
    const container = document.getElementById('produtos');
    const produtosFiltrados = categoriaSelecionada === 'todos'
        ? produtos
        : produtos.filter(produto => produto.categoria === categoriaSelecionada);

    container.innerHTML = produtosFiltrados.map(produto => `
        <div class="produto" data-id="${produto.id}">
            <img src="${produto.imagem}" alt="${produto.nome}">
            <div class="produto-info">
                <h3>${produto.nome}</h3>
                <p>${produto.descricao}</p>
                <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
                <button class="botao adicionar-carrinho">Adicionar</button>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.adicionar-carrinho').forEach(botao => {
        botao.addEventListener('click', adicionarAoCarrinho);
    });
}

// Adiciona produto ao carrinho
function adicionarAoCarrinho(e) {
    const produtoId = parseInt(e.target.closest('.produto').dataset.id);
    const produto = produtos.find(p => p.id === produtoId);
    carrinho.push(produto);
    atualizarCarrinho();
}

// Atualiza o carrinho e o total
function atualizarCarrinho() {
    const itensCarrinho = document.getElementById('itens-carrinho');
    const totalElement = document.getElementById('total');
    
    itensCarrinho.innerHTML = carrinho.map(item => `
        <div class="item-carrinho">
            <span>${item.nome}</span>
            <span>R$ ${item.preco.toFixed(2)}</span>
        </div>
    `).join('');

    const total = carrinho.reduce((sum, item) => sum + item.preco, 0);
    totalElement.textContent = `R$ ${total.toFixed(2)}`;

    // Atualiza link do WhatsApp
    const whatsappBtn = document.getElementById('finalizar-pedido');
    const mensagem = `Olá! Quero encomendar:\n${carrinho.map(item => `- ${item.nome} (R$ ${item.preco.toFixed(2)})`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`;
    whatsappBtn.href = `https://wa.me/5571993070776?text=${encodeURIComponent(mensagem)}`;
}

function filtrarCategoria(categoria) {
    renderizarProdutos(categoria);
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    
    // Personaliza com o nome da cliente
    const nomeCliente = "Michele"; // Substitua pelo nome real
    document.getElementById('nome-cliente').textContent = nomeCliente;
});

// Slider automático da página principal
document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelector(".slides");
    if (slides) {
        let pos = 0;
        setInterval(() => {
            pos -= 1;
            slides.style.transform = `translateX(${pos}px)`;
            // Reseta quando chega no fim (ajuste conforme largura total do conteúdo)
            if (Math.abs(pos) > slides.scrollWidth / 2) {
                pos = 0;
            }
        }, 30); // Velocidade de rolagem (menor = mais rápido)
    }
});