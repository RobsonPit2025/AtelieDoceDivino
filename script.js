// Dados dos produtos (adicione os da sua cliente)
const produtos = [
    {
        id: 1,
        nome: "Bolo de Chocolate",
        preco: 50.00,
        imagem: "imagens/bolo-chocolate.jpg",
        descricao: "Bolo fofinho com cobertura de ganache"
    },
    {
        id: 2,
        nome: "Brigadeiro Gourmet",
        preco: 2.50,
        imagem: "imagens/brigadeiro.jpg",
        descricao: "Brigadeiro premium com chocolate 70%"
    }
];

let carrinho = [];

// Renderiza os produtos na página
function renderizarProdutos() {
    const container = document.getElementById('produtos');
    container.innerHTML = produtos.map(produto => `
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

    // Adiciona eventos aos botões
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
    whatsappBtn.href = `https://wa.me/5511999999999?text=${encodeURIComponent(mensagem)}`;
}

// Inicializa a página
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    
    // Personaliza com o nome da cliente
    const nomeCliente = "Ana"; // Substitua pelo nome real
    document.getElementById('nome-cliente').textContent = nomeCliente;
});