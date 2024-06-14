// Função para obter parâmetros da URL
function getParameterByName(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

// Função para preencher o formulário com os dados do remédio
async function preencherFormulario(id) {
    try {
        const response = await fetch(`http://localhost:3000/remedios/${id}`);
        const remedio = await response.json();

        document.getElementById('idRemedio').value = remedio.id;
        document.getElementById('nomeRemedio').value = remedio.nome;
        document.getElementById('fabricanteRemedio').value = remedio.fabricante;
        document.getElementById('protocoloClinico').value = remedio.protocolo_clinico;
        document.getElementById('lote').value = remedio.lote;
        document.getElementById('fabricacao').value = remedio.fabricacao;
        document.getElementById('validade').value = remedio.validade;
    } catch (error) {
        console.error('Erro ao buscar o remédio:', error);
    }
}

// Chama a função preencherFormulario ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    const idRemedio = getParameterByName('id');
    if (idRemedio) {
        preencherFormulario(idRemedio);
    }
});

async function atualizarRemedios() {
    const idRemedio = document.getElementById('idRemedio').value;
    const nomeRemedio = document.getElementById('nomeRemedio').value;
    const fabricanteRemedio = document.getElementById('fabricanteRemedio').value;
    const protocoloClinico = document.getElementById('protocoloClinico').value;
    const lote = document.getElementById('lote').value;
    const fabricacao = document.getElementById('fabricacao').value;
    const validade = document.getElementById('validade').value;

    const url = `http://localhost:3000/remedios/${idRemedio}`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: nomeRemedio,
            fabricante: fabricanteRemedio,
            protocolo_clinico: protocoloClinico,
            lote: lote,
            fabricacao: fabricacao,
            validade: validade
        })
    };

    try {
        const response = await fetch(url, requestOptions);
        if (!response.ok) {
            throw new Error('Erro ao atualizar remédio: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Remédio atualizado:', data);
        alert('Remédio atualizado com sucesso!');
        document.getElementById('atualizarForm').reset();
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao atualizar remédio. Verifique o console para mais detalhes.');
    }
}