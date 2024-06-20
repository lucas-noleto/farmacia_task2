async function obterUltimoIdEIncrementar() {
	const url = 'http://localhost:3000/remedios/';

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('Não foi possível obter os dados da API');
		}

		const remedios = await response.json();

		let ultimoId = 16;
		remedios.forEach(remedio => {
			const idNumerico = parseInt(remedio.id);
			console.log(idNumerico)
			if (idNumerico > ultimoId) {
				ultimoId = idNumerico;
			}
		});

		const proximoId = ultimoId + 1;

		console.log(`Último ID encontrado: ${ultimoId}`);
		console.log(`Próximo ID a ser utilizado: ${proximoId}`);

		return proximoId.toString();
	} catch (error) {
		console.error('Erro ao obter o último ID e incrementar:', error.message);
		throw error;
	}
}

async function cadastraRemedios() {
	var id = await obterUltimoIdEIncrementar()
	const url = 'http://localhost:3000/remedios/';

	const novoRemedio = {
		id: id,
		nome: document.getElementById('nomeRemedio').value,
		fabricante: document.getElementById('fabricanteRemedio').value,
		protocoloClinico: document.getElementById('protocoloClinico').value,
		lote: document.getElementById('lote').value,
		dataFabricacao: document.getElementById('fabricacao').value,
		validade: document.getElementById('validade').value
	};

	try {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(novoRemedio)
		});

		if (!response.ok) {
			throw new Error('Erro ao cadastrar o remédio');
		}

		console.log(`Remédio "${nome}" cadastrado com sucesso.`);
	} catch (error) {
		console.error('Erro ao cadastrar o remédio:', error.message);
	}
}

// Add a confirmação de campo vazio 