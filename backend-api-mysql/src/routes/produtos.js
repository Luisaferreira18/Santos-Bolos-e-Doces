const express = require('express');
const ProdutoController = require('../controllers/ProdutoController');

const router = express.Router();

// Rota para listar todos os produtos
router.get('/produtos', ProdutoController.index);

// Rota para criar um novo produto
router.post('/produtos', ProdutoController.store);

// Rota para buscar um produto específico pelo ID
router.get('/produtos/:id', ProdutoController.show);

// Rota para atualizar um produto específico pelo ID
router.put('/produtos/:id', ProdutoController.update);

// Rota para excluir um produto específico pelo ID
router.delete('/produtos/:id', ProdutoController.delete);

module.exports = router;