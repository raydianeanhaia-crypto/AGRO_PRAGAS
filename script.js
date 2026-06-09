// --- SISTEMA DE CADASTRO DA FAZENDA ---
const formFazenda = document.getElementById('form-fazenda');
const tabelaDados = document.getElementById('tabela-dados').getElementsByTagName('tbody')[0];

formFazenda.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    // Pega os valores dos campos
    const talhao = document.getElementById('nome-talhao').value;
    const praga = document.getElementById('tipo-praga').value;
    const nivel = document.getElementById('nivel-infestacao').value;

    // Cria uma nova linha na tabela
    const novaLinha = tabelaDados.insertRow();

    const celulaTalhao = novaLinha.insertCell(0);
    const celulaPraga = novaLinha.insertCell(1);
    const celulaNivel = novaLinha.insertCell(2);

    celulaTalhao.textContent = talhao;
    celulaPraga.textContent = praga;
    celulaNivel.textContent = nivel;

    // Aplica uma cor baseada no risco
    if (nivel === "Alto") {
        celulaNivel.style.color = "red";
        celulaNivel.style.fontWeight = "bold";
    } else if (nivel === "Médio") {
        celulaNivel.style.color = "orange";
        celulaNivel.style.fontWeight = "bold";
    } else {
        celulaNivel.style.color = "green";
    }

    // Limpa o formulário para o próximo registro
    formFazenda.reset();
});


// --- SISTEMA DE GRÁFICO FINANCEIRO ---
const ctx = document.getElementById('graficoFinanceiro').getContext('2d');
let meuGrafico;

// Inicializa o gráfico com valores padrão
function inicializarGrafico(lucro, despesa) {
    meuGrafico = new Chart(ctx, {
        type: 'bar', // Gráfico de barras
        data: {
            labels: ['Lucros', 'Despesas'],
            datasets: [{
                label: 'Valores em R$',
                data: [lucro, despesa],
                backgroundColor: [
                    '#4caf50', // Verde para lucro
                    '#f44336'  // Vermelho para despesa
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Função chamada pelo botão para atualizar o gráfico
function atualizarGrafico() {
    const novoLucro = parseFloat(document.getElementById('input-lucro').value) || 0;
    const novaDespesa = parseFloat(document.getElementById('input-despesa').value) || 0;

    // Atualiza os dados do gráfico e redesenha
    meuGrafico.data.datasets[0].data = [novoLucro, novaDespesa];
    meuGrafico.update();
}

// Carrega o gráfico assim que a página abre
window.onload = function() {
    inicializarGrafico(5000, 2500);
};