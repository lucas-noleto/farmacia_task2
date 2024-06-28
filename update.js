// Adicionar evento de submit ao formulário de atualização
document.getElementById('formUpdate').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const nomeRemedio = document.getElementById('nomeRemedio').value;
    const fabricanteRemedio = document.getElementById('fabricanteRemedio').value;
    const protocoloClinico = document.getElementById('protocoloClinico').value;
    const lote = document.getElementById('lote').value;
    const fabricacao = document.getElementById('fabricacao').value;
    const validade = document.getElementById('validade').value;
    const remedioId = this.dataset.remedioId; // Usando 'this' para referenciar o próprio formulário

    const url = `http://localhost:3000/remedios/${remedioId}`;

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
        // Esconder o modal após atualização
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalUpdate'));
        modal.hide();
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao atualizar remédio. Verifique o console para mais detalhes.');
    }
});

// Adicionar evento ao botão "Voltar" no modal de atualização
document.querySelector('#modalUpdate .btn-secondary').addEventListener('click', function () {
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalUpdate'));
    modal.hide();
});

// Função para abrir o modal de atualização
function abrirModalUpdate(remedioId) {
    const modalElement = document.getElementById('modalUpdate');
    const formUpdate = document.getElementById('formUpdate');
    formUpdate.dataset.remedioId = remedioId;

    // Buscar o remédio específico para preencher o modal
    fetch(`http://localhost:3000/remedios/${remedioId}`)
        .then(response => response.json())
        .then(remedio => {
            // Preencher os campos do formulário com os dados do remédio
            document.getElementById('nomeRemedio').value = remedio.nome || '';
            document.getElementById('fabricanteRemedio').value = remedio.fabricante || '';
            document.getElementById('protocoloClinico').value = remedio.protocolo_clinico || '';
            document.getElementById('lote').value = remedio.lote || '';
            document.getElementById('fabricacao').value = remedio.fabricacao || '';
            document.getElementById('validade').value = remedio.validade || '';
            
            // Mostrar o modal após preencher os dados
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
        })
        .catch(error => console.error('Erro ao buscar o remédio:', error));
}
