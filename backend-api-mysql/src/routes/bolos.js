const express = require('express');
const BoloController = require('../controllers/BoloController');

const router = express.Router();

// Rota para listar todos os bolos
router.get('/bolos', BoloController.index);

// Rota para criar um novo bolo
router.post('/bolos', BoloController.store);

// Rota para buscar um bolo específico pelo ID
router.get('/bolos/:id', BoloController.show);

// Rota para atualizar um bolo específico pelo ID
router.put('/bolos/:id', BoloController.update);

// Rota para excluir um bolo específico pelo ID
router.delete('/bolos/:id', BoloController.delete);

module.exports = router;