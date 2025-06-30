const { Avaliacao, Pedido, Cliente } = require('../models');

module.exports = {
  async store(req, res) {
    const { id_pedido, id_cliente, nota, comentario } = req.body;

    try {
      const pedido = await Pedido.findByPk(id_pedido);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }
      const avaliacaoExistente = await Avaliacao.findOne({ where: { id_pedido } });
      if (avaliacaoExistente) {
        return res.status(409).json({ error: 'Este pedido já possui uma avaliação. Use o método PUT para atualizá-la.' });
      }

      const avaliacao = await Avaliacao.create({
        id_pedido,
        id_cliente: id_cliente || null, 
        nota,
        comentario,
      });

      return res.status(201).json(avaliacao);
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
      return res.status(500).json({
        message: 'Erro interno do servidor ao criar avaliação.',
        details: error.message,
        sqlMessage: error.original ? error.original.sqlMessage : undefined
      });
    }
  },

  async show(req, res) {
    const { id } = req.params; 
    try {
      const avaliacao = await Avaliacao.findByPk(id, {
        include: [
          { model: Pedido, as: 'pedido', attributes: ['id_pedido', 'total', 'data_pedido', 'status'] }, 
          { model: Cliente, as: 'cliente', attributes: ['id_cliente', 'nome'] }
        ]
      });
      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliação não encontrada.' });
      }
      return res.json(avaliacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async index(req, res) {
    try {
      const avaliacoes = await Avaliacao.findAll({
        include: [
          { model: Pedido, as: 'pedido', attributes: ['id_pedido', 'total', 'data_pedido', 'status'] },
          { model: Cliente, as: 'cliente', attributes: ['id_cliente', 'nome'] }
        ]
      });
      return res.json(avaliacoes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async update(req, res) {
    const { id } = req.params; 
    const { nota, comentario } = req.body;

    try {
      const [updatedRows] = await Avaliacao.update(
        { nota, comentario }, 
        {
          where: { id_avaliacao: id },
          returning: true, 
        }
      );

      if (updatedRows === 0) { 
        return res.status(404).json({ error: 'Avaliação não encontrada ou não houve mudanças nos dados.' });
      }
      const updatedAvaliacao = await Avaliacao.findByPk(id, {
        include: [
            { model: Pedido, as: 'pedido', attributes: ['id_pedido', 'total', 'data_pedido', 'status'] },
            { model: Cliente, as: 'cliente', attributes: ['id_cliente', 'nome'] }
        ]
      });
      
      return res.json(updatedAvaliacao);
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error);
      return res.status(500).json({
        message: 'Erro interno do servidor ao atualizar avaliação.',
        details: error.message,
        sqlMessage: error.original ? error.original.sqlMessage : undefined
      });
    }
  },

  async delete(req, res) {
    const { id } = req.params; 

    try {
      const deletedRows = await Avaliacao.destroy({
        where: { id_avaliacao: id },
      });

      if (deletedRows === 0) { 
        return res.status(404).json({ error: 'Avaliação não encontrada.' });
      }

      return res.status(204).send();
    } catch (error) {
      console.error('Erro ao excluir avaliação:', error);
      return res.status(500).json({
        message: 'Erro interno do servidor ao excluir avaliação.',
        details: error.message,
        sqlMessage: error.original ? error.original.sqlMessage : undefined
      });
    }
  },
};