const express = require('express');
const PedidoController = require('../controllers/PedidoController');
const router = express.Router();

// Rota para listar todos os pedidos
router.get('/pedidos', PedidoController.index);

// Rota para criar um novo pedido
router.post('/pedidos', PedidoController.store);

// Rota para buscar um pedido específico pelo ID
router.get('/pedidos/:id', PedidoController.show);

// Rota para atualizar um pedido específico pelo ID
router.put('/pedidos/:id', PedidoController.update);

// Rota para excluir um pedido específico pelo ID
router.delete('/pedidos/:id', PedidoController.delete);

module.exports = router;