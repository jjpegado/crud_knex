const rota = require('express').Router();
const crudUsuario = require('../controllers/crud');

rota.post('/', crudUsuario.cadastrarUsuario);
rota.get('/:id', crudUsuario.obterUsuario);
rota.get('/', crudUsuario.listarUsuario);
rota.put('/:id', crudUsuario.atualizarUsuario);
rota.delete('/:id', crudUsuario.deletarUsuario);


module.exports = rota