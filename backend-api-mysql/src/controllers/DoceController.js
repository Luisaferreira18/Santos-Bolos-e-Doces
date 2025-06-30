const { Doce, Produto } = require('../models');

module.exports = {
  async index(req, res) { // Lista todos os doces com detalhes do produto base
    try {
      const doces = await Doce.findAll({
        include: [{ model: Produto, as: 'produto' }]
      });
      return res.json(doces);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async store(req, res) { // Cria um novo doce associando a um produto existente
    const { id_produto, tipo } = req.body;
    try {
      const doce = await Doce.create({ id_produto, tipo });
      return res.status(201).json(doce);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async show(req, res) { // Busca um doce específico pelo ID do produto
    const { id } = req.params;
    try {
      const doce = await Doce.findByPk(id, {
        include: [{ model: Produto, as: 'produto' }]
      });
      if (!doce) {
        return res.status(404).json({ error: 'Doce não encontrado.' });
      }
      return res.json(doce);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async update(req, res) { // Atualiza um doce específico pelo ID do produto
    const { id } = req.params;
    const { tipo } = req.body;
    try {
      const [updated] = await Doce.update({ tipo }, {
        where: { id_produto: id }
      });
      if (updated) {
        const updatedDoce = await Doce.findByPk(id, {
          include: [{ model: Produto, as: 'produto' }]
        });
        return res.json(updatedDoce);
      }
      return res.status(404).json({ error: 'Doce não encontrado para atualização.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async delete(req, res) { // Exclui um doce específico pelo ID do produto
    const { id } = req.params;
    try {
      const deleted = await Doce.destroy({
        where: { id_produto: id }
      });
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ error: 'Doce não encontrado para exclusão.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};