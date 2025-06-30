const express = require('express');
const DoceController = require('../controllers/DoceController');

const router = express.Router();

// Rota para listar todos os doces
router.get('/doces', DoceController.index);

// Rota para criar um novo doce
router.post('/doces', DoceController.store);

// Rota para buscar um doce específico pelo ID
router.get('/doces/:id', DoceController.show);

// Rota para atualizar um doce específico pelo ID
router.put('/doces/:id', DoceController.update);

// Rota para excluir um doce específico pelo ID
router.delete('/doces/:id', DoceController.delete);

module.exports = router;