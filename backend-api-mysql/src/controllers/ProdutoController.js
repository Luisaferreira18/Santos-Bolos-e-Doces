const { Produto, Bolo, Doce } = require('../models');

module.exports = {
  async index(req, res) { // Lista todos os produtos, incluindo detalhes de bolo ou doce
    try {
      const produtos = await Produto.findAll({
        include: [
          { model: Bolo, as: 'bolo', required: false },
          { model: Doce, as: 'doce', required: false }
        ]
      });
      return res.json(produtos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async store(req, res) { // Cria um novo produto, podendo ser um bolo ou um doce
    const { descricao, sabor, quantidade, valor, tipo_produto, detalhes_bolo, detalhes_doce } = req.body;
    const transaction = await Produto.sequelize.transaction();

    try {
      const produto = await Produto.create({
        descricao,
        sabor,
        quantidade,
        valor,
      }, { transaction });

      if (tipo_produto === 'bolo' && detalhes_bolo) {
        await Bolo.create({
          id_produto: produto.id_produto,
          tamanho: detalhes_bolo.tamanho,
        }, { transaction });
      } else if (tipo_produto === 'doce' && detalhes_doce) {
        await Doce.create({
          id_produto: produto.id_produto,
          tipo: detalhes_doce.tipo,
        }, { transaction });
      }

      await transaction.commit();
      const novoProduto = await Produto.findByPk(produto.id_produto, {
        include: [
          { model: Bolo, as: 'bolo', required: false },
          { model: Doce, as: 'doce', required: false }
        ]
      });
      return res.status(201).json(novoProduto);
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor ao criar produto.' });
    }
  },

  async show(req, res) { // Busca um produto específico pelo ID, incluindo detalhes de bolo ou doce
    const { id } = req.params;
    try {
      const produto = await Produto.findByPk(id, {
        include: [
          { model: Bolo, as: 'bolo', required: false },
          { model: Doce, as: 'doce', required: false }
        ]
      });
      if (!produto) {
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
      return res.json(produto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async update(req, res) { // Atualiza um produto e seus detalhes de bolo/doce
    const { id } = req.params;
    const { descricao, sabor, quantidade, valor, tipo_produto, detalhes_bolo, detalhes_doce } = req.body;
    const transaction = await Produto.sequelize.transaction();

    try {
      const [updated] = await Produto.update({ descricao, sabor, quantidade, valor }, {
        where: { id_produto: id },
        transaction
      });

      if (!updated) {
        await transaction.rollback();
        return res.status(404).json({ error: 'Produto não encontrado para atualização.' });
      }

      if (tipo_produto) {
        await Bolo.destroy({ where: { id_produto: id }, transaction });
        await Doce.destroy({ where: { id_produto: id }, transaction });

        if (tipo_produto === 'bolo' && detalhes_bolo) {
          await Bolo.create({ id_produto: id, tamanho: detalhes_bolo.tamanho }, { transaction });
        } else if (tipo_produto === 'doce' && detalhes_doce) {
          await Doce.create({ id_produto: id, tipo: detalhes_doce.tipo }, { transaction });
        }
      }

      await transaction.commit();
      const updatedProduto = await Produto.findByPk(id, {
        include: [
          { model: Bolo, as: 'bolo', required: false },
          { model: Doce, as: 'doce', required: false }
        ]
      });
      return res.json(updatedProduto);

    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor ao atualizar produto.' });
    }
  },

  async delete(req, res) { // Exclui um produto
    const { id } = req.params;
    try {
      const deleted = await Produto.destroy({
        where: { id_produto: id }
      });
      if (deleted) {
        return res.status(204).send();
      }
      return res.status(404).json({ error: 'Produto não encontrado para exclusão.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};