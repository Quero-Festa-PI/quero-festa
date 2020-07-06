const botaoConsulta = document.getElementById("consultarCep");

if (botaoConsulta) {
    const inputCep = document.getElementById("inputCep");
    botaoConsulta.addEventListener("click", (evento) => {
        var cep = inputCep.value;
        consultarCep(evento, cep);
    })
}

function consultarCep(evento, cep) {
    evento.preventDefault();
    fetch(`http://localhost:3000/usuarios/consultar-cep`, {
        method: 'post',
        body: JSON.stringify({ cep }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (resposta) {
        return resposta.json();
    }).then(function (dados) {
        if (dados.cep) {
            document.getElementById("inputRua").value = dados.address;
            document.getElementById("inputCidade").value = dados.city;
            document.getElementById("inputEstado").value = dados.state;
        } else {
            alert(dados.message);
        }
    })
}