async function readItem(id) {
	try {
		const response = await fetch(`http://localhost:3000/remedios/${id}`);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Erro ao buscar o remédio:', error);
	}
}

async function alimentaTabela(data) {
	const htmlData = data.map(data => `
    <tr>
	    <td>${data.id}</td>
	    <td>${data.nome}</td>
	    <td>${data.fabricante}</td>
	    <td>${data.protocolo_clinico}</td>
	    <td>${data.lote}</td>
	    <td>${data.fabricacao}</td>
	    <td>${data.validade}</td>
	    <td>
        <button class="btn btn-primary" title="Visualizar" onclick="location.href='view.html?id=${data.id}'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
          </svg>
        </button>
        <button class="btn btn-success" title="Editar" onclick="location.href='update.html?id=${data.id}'">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
          </svg>
        </button>
        <button class="btn btn-danger" title="Deletar" onclick="deletarRemedioPorId(${data.id})">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
          </svg>
        </button>
		<button class="btn btn-warning" title="Atualizar Estoque" onclick="abrirModalEstoque(${data.id})">
      	<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam-fill" viewBox="0 0 16 16">
  			<path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003zM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461z"/>
		</svg>
        </button>
        </td>
    </tr>
  `);

	const conteudoElement = document.getElementById('conteudo');
	if (conteudoElement) {
		conteudoElement.innerHTML = htmlData.join('');
	} else {
		console.error('Elemento #conteudo não encontrado no DOM.');
	}
}

fetch("http://localhost:3000/remedios")
	.then((response) => response.json())
	.then((data) => {
		alimentaTabela(data);
	});

document.getElementById('btn-buscar').addEventListener('click', async () => {
	const nomeBuscado = document.getElementById('name').value;
	try {
		const response = await fetch("http://localhost:3000/remedios");
		const remedios = await response.json();
		const remedioEncontrado = remedios.find(remedio => remedio.nome.toLowerCase() === nomeBuscado.toLowerCase());
		if (remedioEncontrado) {
			location.href = `view.html?id=${remedioEncontrado.id}`;
		} else {
			alert('Remédio não encontrado');
		}
	} catch (error) {
		console.error('Erro ao buscar os remédios:', error);
	}
});

async function deletarRemedioPorId(id) {
	const url = `http://localhost:3000/remedios/${id}`;

	try {
		const response = await fetch(url, {
			method: 'DELETE'
		});

		if (!response.ok) {
			throw new Error('Erro ao deletar o remédio');
		}

		console.log(`Remédio com ID ${id} deletado com sucesso.`);
	} catch (error) {
		console.error('Erro ao deletar o remédio:', error.message);
	}
}

document.getElementById('formEstoque').addEventListener('submit', async function (e) {
	e.preventDefault();

	const estoque = document.getElementById('estoque').value;
	const parsedEstoque = parseInt(estoque, 10);
	const remedioId = document.getElementById('formEstoque').dataset.remedioId;

	if (isNaN(parsedEstoque) || parsedEstoque < 0 ) {
        alert('Erro: O estoque não pode ser negativo ou diferente de um número inteiro.');
        return;
    }

	try {
		const response = await fetch(`http://localhost:3000/remedios/${remedioId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ estoque: parseInt(estoque, 10) })
		});

		if (response.ok) {
			alert('Estoque atualizado com sucesso!');
			const modalElement = document.getElementById('modalEditarEstoque');
			const modal = bootstrap.Modal.getInstance(modalElement);
			modal.hide();
			fetch("http://localhost:3000/remedios")
			.then((response) => response.json())
			.then((data) => {
				alimentaTabela(data);
		});

		} else {
			const errorData = await response.json();
			console.error('Erro ao atualizar o estoque:', errorData);
			alert('Erro ao atualizar o estoque. Por favor, tente novamente.');
		}
	} catch (error) {
		console.error('Erro ao atualizar o estoque:', error);
		alert('Erro ao atualizar o estoque. Por favor, tente novamente.');
	}
});


function abrirModalEstoque(remedioId) {
	const modalElement = document.getElementById('modalEditarEstoque');
	const formEstoque = document.getElementById('formEstoque');
	formEstoque.dataset.remedioId = remedioId;

	// Buscar o remédio específico para obter o estoque atual
	fetch(`http://localhost:3000/remedios/${remedioId}`)
		.then(response => response.json())
		.then(remedio => {
			document.getElementById('estoque').value = remedio.estoque || 0; // Se não houver estoque, definir como 0
			const modal = new bootstrap.Modal(modalElement);
			modal.show();
		})
		.catch(error => console.error('Erro ao buscar o remédio:', error));
}
