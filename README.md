```

E rodar o servidor:

```bash
npx json-server db.json
```

O servidor estará disponível em `http://localhost:3000`.

Assim, podemos consumir a nossa API fake com JavaScript:

```javascript
fetch("http://localhost:3000/usuarios")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });
```

## Rotas

As APIs RESTful possuem rotas que representam os recursos disponíveis. Cada rota corresponde a um recurso e possui um método HTTP associado.

Por exemplo, a rota `/usuarios` pode corresponder ao recurso de usuários e possuir os métodos HTTP GET, POST, PUT e DELETE.

Baseado no exemplo acima, as rotas da API RESTful do JsonPlaceholder são:

```
GET    /usuarios
GET    /usuarios/:id
POST   /usuarios
PUT    /usuarios/:id
PATCH  /usuarios/:id
DELETE /usuarios/:id
```