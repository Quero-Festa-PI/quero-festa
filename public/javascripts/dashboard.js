let selecionarAnoVendasLoja = document.getElementById("select-vendas-loja");
let selecionarPeriodoVendasProduto = document.getElementById("select-vendas-produtos");

if (selecionarAnoVendasLoja) {
    const idLoja = document.getElementById("id-loja").value;

    selecionarAnoVendasLoja.addEventListener("change", (evento) => {
        const ano = evento.target.value;
        getVendasLoja(ano);
    })

    selecionarPeriodoVendasProduto.addEventListener("change", (evento) => {
        const periodo = evento.target.value;
        getVendasProdutos(periodo);
    })

    function getVendasLoja(ano) {
        fetch(`http://localhost:3000/lojas/dashboardGrafico/vendasLoja?ano=${ano}&id=${idLoja}`, {
            method: 'post',
        })
            .then((resposta) => {
                resposta = resposta.json()
                return resposta;
            })
            .then((dado) => {
                const { qtdVendas, somaVendas } = dado;
                chartVendasLoja.data.datasets[0].data = qtdVendas;
                chartVendasLoja.data.datasets[1].data = somaVendas;
                chartVendasLoja.update();
            })

    }

    function getVendasProdutos(periodo) {
        fetch(`http://localhost:3000/lojas/dashboardGrafico/vendasProduto?periodo=${periodo}&id=${idLoja}`, {
            method: 'post',
        })
            .then((resposta) => {
                resposta = resposta.json()
                return resposta;
            })
            .then((dado) => {
                const { labels, datasetGanhos, datasetQuantidade, datasetPedidos } = dado;
                chartVendasProdutos.data.labels = labels;
                chartVendasProdutos.data.datasets[0].data = datasetGanhos;
                chartVendasProdutos.data.datasets[1].data = datasetQuantidade;
                chartVendasProdutos.data.datasets[2].data = datasetPedidos;
                chartVendasProdutos.update();
            })
    }

    let canvas = document.getElementById("vendas-loja");

    var chartVendasLoja = new Chart(canvas, {
        type: 'line',
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Out", "Nov", "Dez"],
            datasets: [{
                label: "Qtd de Vendas",
                data: [],
                borderColor: "#FF826E",
                backgroundColor: "transparent",
                pointBackgroundColor: "#FF826E",
                pointRadius: 4,
                yAxisID: "y-axis-B",
                fill: false,
            }, {
                label: "Qtd de Ganhos (R$)",
                data: [],
                borderColor: "#6B8E23",
                backgroundColor: "transparent",
                pointBackgroundColor: "#6B8E23",
                pointRadius: 4,
                yAxisID: "y-axis-A",
                fill: false,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: 'Resultados x Loja'
            },
            scales: {
                yAxes: [{
                    type: "linear",
                    display: true,
                    position: "left",
                    id: "y-axis-A",
                    ticks: {
                        beginAtZero: true
                    },
                }, {
                    type: "linear",
                    display: true,
                    position: "right",
                    id: "y-axis-B",
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    },
                }],
            }
        }
    });

    canvas = document.getElementById("vendas-produtos");

    var chartVendasProdutos = new Chart(canvas, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: "Total de Ganhos (R$)",
                data: [],
                borderColor: "#6B8E23",
                backgroundColor: "transparent",
                pointBackgroundColor: "#6B8E23",
                pointRadius: 4,
                yAxisID: "y-axis-A",
                fill: false,
            }, {
                label: "Quantidade Vendida",
                data: [],
                borderColor: "#FF826E",
                backgroundColor: "transparent",
                pointBackgroundColor: "#FF826E",
                pointRadius: 4,
                yAxisID: "y-axis-A",
                fill: false,
            }, {
                label: "Total de Pedidos",
                data: [],
                borderColor: "#a00000",
                backgroundColor: "transparent",
                pointBackgroundColor: "#a00000",
                pointRadius: 4,
                yAxisID: "y-axis-B",
                fill: false,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            hoverMode: 'index',
            stacked: false,
            title: {
                display: true,
                text: 'Resultados x Produtos'
            },
            scales: {
                yAxes: [{
                    type: "linear",
                    display: true,
                    position: "left",
                    id: "y-axis-A",
                    ticks: {
                        beginAtZero: true
                    },
                }, {
                    type: "linear",
                    display: true,
                    position: "right",
                    id: "y-axis-B",
                    ticks: {
                        beginAtZero: true
                    },
                    gridLines: {
                        drawOnChartArea: false,
                    },
                }],
                xAxes: [{
                    ticks: {
                        autoSkip: false,
                        minRotation: 90,
                        maxRotation: 90,
                    }
                }]
            }
        }
    });

    const alterarPagamentos = document.getElementsByClassName("alterar-pagamento");
    for (let i = 0; i < alterarPagamentos.length; i++) {
        const botao = alterarPagamentos[i];
        botao.addEventListener("click", (evento) => {
            id = evento.target.attributes[0].nodeValue;
            alterarPagamento(id);
            evento.target.parentNode.innerHTML = 'Efetuado';
        })
    }

    function alterarPagamento(id) {
        fetch(`http://localhost:3000/pedidos/alterar-pagamento/${id}?_method=PUT`, {
            method: 'post',
        })
            .then((resposta) => {
                resposta = resposta.json()
                return resposta;
            })
            .then((dado) => {
            })
    }

    const alterarEntregas = document.getElementsByClassName("caminhao");
    for (let i = 0; i < alterarEntregas.length; i++) {
        const botao = alterarEntregas[i];
        botao.addEventListener("click", (evento) => {
            id = evento.target.attributes[0].nodeValue;
            alterarEntrega(id);
            evento.target.parentNode.parentNode.remove();
        })
    }

    function alterarEntrega(id) {
        fetch(`http://localhost:3000/pedidos/alterar-entrega/${id}?_method=PUT`, {
            method: 'post',
        })
            .then((resposta) => {
                resposta = resposta.json()
                return resposta;
            })
            .then((dado) => {
            })
    }

    getVendasLoja(selecionarAnoVendasLoja.value);
    getVendasProdutos(selecionarPeriodoVendasProduto.value);
}
