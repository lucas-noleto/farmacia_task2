// Função para obter parâmetros da URL
function getParameterByName(id) {
	const url = new URL(window.location.href);
	return url.searchParams.get(id);
}

// Função para preencher o formulário com os dados do remédio
async function preencherFormulario(id) {
	try {
		const response = await fetch(`http://localhost:3000/remedios/${id}`);
		const remedio = await response.json();

		const htmlForm = document.getElementById("atualizarForm");

		htmlForm.innerHTML =
			`
        <div class="mb-3">
          <label for="nomeRemedio" class="form-label">Novo Nome:</label>
          <input type="text" class="form-control" id="nomeRemedio" name="nomeRemedio" placeholder="Digite o novo nome do remédio" value="${remedio.nome}">
        </div>
        <div class="mb-3">
          <label for="fabricanteRemedio" class="form-label">Novo Fabricante:</label>
          <input type="text" class="form-control" id="fabricanteRemedio" name="fabricanteRemedio" placeholder="Digite o novo fabricante do remédio" value="${remedio.fabricante}">
        </div>
        <div class="mb-3">
          <label for="protocoloClinico" class="form-label">Protocolo Clínico:</label>
          <input type="text" class="form-control" id="protocoloClinico" name="protocoloClinico" placeholder="Digite o protocolo clínico" value="${remedio.protocolo_clinico}">
        </div>
        <div class="mb-3">
          <label for="lote" class="form-label">Lote:</label>
          <input type="text" class="form-control" id="lote" name="lote" placeholder="Digite o lote" value="${remedio.lote}">
        </div>
        <div class="mb-3">
          <label for="fabricacao" class="form-label">Data de Fabricação:</label>
          <input type="text" class="form-control" id="fabricacao" name="fabricacao" value="${remedio.fabricacao}">
        </div>
        <div class="mb-3">
          <label for="validade" class="form-label">Data de Validade:</label>
          <input type="text" class="form-control" id="validade" name="validade" value="${remedio.validade}">
        </div>
        <button type="button" class="btn btn-primary" onclick="atualizarRemedios()">Atualizar Remédio</button>
        <button type="button" class="btn btn-primary" onclick="window.history.back()">Voltar</button>
    	`;
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
	const nomeRemedio = document.getElementById('nomeRemedio').value;
	const fabricanteRemedio = document.getElementById('fabricanteRemedio').value;
	const protocoloClinico = document.getElementById('protocoloClinico').value;
	const lote = document.getElementById('lote').value;
	const fabricacao = document.getElementById('fabricacao').value;
	const validade = document.getElementById('validade').value;

	const url = `http://localhost:3000/remedios/${getParameterByName("id")}`;

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
