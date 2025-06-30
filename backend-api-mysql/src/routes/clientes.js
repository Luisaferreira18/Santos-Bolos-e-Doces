const express = require('express');
const ClienteController = require('../controllers/ClienteController');

const router = express.Router();

// Rota para listar todos os clientes
router.get('/clientes', ClienteController.index);

// Rota para criar um novo cliente
router.post('/clientes', ClienteController.store);

// Rota para buscar um cliente específico pelo ID
router.get('/clientes/:id', ClienteController.show);

// Rota para atualizar um cliente específico pelo ID
router.put('/clientes/:id', ClienteController.update);

// Rota para excluir um cliente específico pelo ID
router.delete('/clientes/:id', ClienteController.delete);

// Rota de Login
router.post('/clientes/login', ClienteController.login);

module.exports = router;