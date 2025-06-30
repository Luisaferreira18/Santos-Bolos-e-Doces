const { Bolo, Produto } = require('../models');

module.exports = {
  async index(req, res) { // Lista todos os bolos com detalhes do produto base
    try {
      const bolos = await Bolo.findAll({
        include: [{ model: Produto, as: 'produto' }]
      });
      return res.json(bolos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async store(req, res) { // Cria um novo bolo associando a um produto existente
    const { id_produto, tamanho } = req.body;
    try {
      const bolo = await Bolo.create({ id_produto, tamanho });
      return res.status(201).json(bolo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async show(req, res) { // Busca um bolo específico pelo ID do produto
    const { id } = req.params;
    try {
      const bolo = await Bolo.findByPk(id, {
        include: [{ model: Produto, as: 'produto' }]
      });
      if (!bolo) {
        return res.status(404).json({ error: 'Bolo não encontrado.' });
      }
      return res.json(bolo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async update(req, res) { // Atualiza um bolo específico pelo ID do produto
    const { id } = req.params;
    const { tamanho } = req.body;
    try {
      const [updated] = await Bolo.update({ tamanho }, {
        where: { id_produto: id }
      });
      if (updated) {
        const updatedBolo = await Bolo.findByPk(id, {
          include: [{ model: Produto, as: 'produto' }]
        });
        return res.json(updatedBolo);
      }
      return res.status(404).json({ error: 'Bolo não encontrado para atualização.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async delete(req, res) { // Exclui um bolo específico pelo ID do produto
    const { id } = req.params;
    try {
      const deleted = await Bolo.destroy({
        where: { id_produto: id }
      });
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ error: 'Bolo não encontrado para exclusão.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};