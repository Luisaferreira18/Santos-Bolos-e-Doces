const express = require('express');
const AvaliacaoController = require('../controllers/AvaliacaoController');

const routes = express.Router();

// Rota para criar uma nova avaliação
routes.post('/avaliacoes', AvaliacaoController.store);

// Rota para listar todas as avaliações
routes.get('/avaliacoes', AvaliacaoController.index);

// Rota para buscar uma avaliação específica por ID
routes.get('/avaliacoes/:id', AvaliacaoController.show);

// Rota para atualizar uma avaliação existente por ID
routes.put('/avaliacoes/:id', AvaliacaoController.update);

// Rota para excluir uma avaliação por ID
routes.delete('/avaliacoes/:id', AvaliacaoController.delete);

module.exports = routes;