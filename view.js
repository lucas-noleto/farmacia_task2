document.addEventListener('DOMContentLoaded', (event) => {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	console.log(urlParams)
	if (id) {
		fetch(`http://localhost:3000/remedios/${id}`)
			.then((response) => response.json())
			.then((data) => {
				document.getElementById('nome').value = data.nome;
				document.getElementById('fabricante').value = data.fabricante;
				document.getElementById('protocolo_clinico').value = data.protocolo_clinico;
				document.getElementById('lote').value = data.lote;
				document.getElementById('fabricacao').value = data.fabricacao;
				document.getElementById('validade').value = data.validade;
			})
			.catch((error) => {
				console.error('Erro ao buscar o remédio:', error);
			});
	}
});
