let selecionarAnoVendasAnuais = document.getElementById("vendasAnuais");

if (selecionarAnoVendasAnuais) {
    selecionarAnoVendasAnuais.addEventListener("change", (evento) => {
        const ano = evento.target.value;
        getVendasAnuais(ano);
    })

    function getVendasAnuais(ano) {
        fetch(`http://localhost:3000/lojas/dashboardGrafico/vendasAnuais?ano=${ano}`, {
            method: 'post',
        })
            .then((resposta) => {
                resposta = resposta.json()
                return resposta;
            })
            .then((dado) => {
                const { qtdVendas, somaVendas } = dado;
                chartGraph1.data.datasets[0].data = qtdVendas;
                chartGraph1.data.datasets[1].data = somaVendas;
                chartGraph1.update();
            })

    }

    getVendasAnuais(selecionarAnoVendasAnuais.value);
}