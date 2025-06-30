const { Pedido, Cliente, Produto, PedidoProduto, connection } = require('../models');

module.exports = {
  async index(req, res) {
    try {
      const { clienteId } = req.query;

      // Criar filtro condicionalmente
      const whereCondition = clienteId ? { id_cliente: clienteId } : {};

      const pedidos = await Pedido.findAll({
        where: whereCondition,
        include: [
          { model: Cliente, as: 'clientes', attributes: ['nome', 'email'] },
          {
            model: Produto,
            as: 'produtos',
            through: { attributes: ['quantidade'] },
            attributes: ['id_produto', 'descricao', 'valor', 'sabor']
          }
        ]
      });

      // Desserializar o itens_pedido_json para itens_pedido
      const pedidosComItens = pedidos.map(pedido => {
        const pedidoJson = pedido.toJSON();
        pedidoJson.itens_pedido = JSON.parse(pedidoJson.itens_pedido_json || '[]');
        return pedidoJson;
      });

      return res.json(pedidosComItens);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async store(req, res) {
    const {
      id_cliente,
      descricao,
      data_pedido,
      total,
      forma_pagamento,
      nome_cliente,
      telefone_cliente,
      itens_pedido,
      status
    } = req.body;

    const transaction = await connection.transaction();

    try {
      if (!total || !forma_pagamento || !nome_cliente || !telefone_cliente || !itens_pedido || itens_pedido.length === 0) {
        await transaction.rollback();
        return res.status(400).json({
          error: 'Campos obrigatórios do pedido ausentes ou inválidos.',
          missing_fields: {
            total: !total,
            forma_pagamento: !forma_pagamento,
            nome_cliente: !nome_cliente,
            telefone_cliente: !telefone_cliente,
            itens_pedido: !itens_pedido || itens_pedido.length === 0
          }
        });
      }

      const itens_pedido_json = JSON.stringify(itens_pedido);

      const pedido = await Pedido.create({
        id_cliente: id_cliente || null,
        descricao: descricao || null,
        data_pedido: data_pedido || new Date(),
        total: total,
        forma_pagamento: forma_pagamento,
        nome_cliente: nome_cliente,
        telefone_cliente: telefone_cliente,
        itens_pedido_json: itens_pedido_json,
        status: status || 'Em Andamento',
      }, { transaction });

      if (itens_pedido && itens_pedido.length > 0) {
        const pedidoProdutos = itens_pedido.map(item => {
            const quantidadeDoItem = item.quantidadeDocinhos || 1; 

            if (!item.id_produto) {
                throw new Error(`id_produto ausente para o item: ${JSON.stringify(item)}`);
            }

            return {
                id_pedido: pedido.id_pedido,
                id_produto: item.id_produto,
                quantidade: quantidadeDoItem,
            };
        });
        await PedidoProduto.bulkCreate(pedidoProdutos, { transaction });
      }

      await transaction.commit();

      const novoPedido = await Pedido.findByPk(pedido.id_pedido, {
        include: [
          { model: Cliente, as: 'clientes', attributes: ['nome', 'email'] },
          {
            model: Produto,
            as: 'produtos',
            through: { attributes: ['quantidade'] },
            attributes: ['id_produto', 'descricao', 'valor', 'sabor']
          }
        ]
      });

      const novoPedidoJson = novoPedido.toJSON();
      novoPedidoJson.itens_pedido = JSON.parse(novoPedidoJson.itens_pedido_json || '[]');

      return res.status(201).json(novoPedidoJson);

    } catch (error) {
      if (!transaction.finished) {
        await transaction.rollback();
      }
      console.error(error);
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          error: 'Erro de validação ao criar pedido.',
          details: error.errors.map(err => err.message)
        });
      }
      if (error.parent && error.parent.code === 'ER_BAD_NULL_ERROR' && error.parent.sqlMessage.includes('id_produto')) {
        return res.status(400).json({ error: 'Erro: ID do produto não pode ser nulo. Verifique os dados enviados.', details: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor ao criar pedido.', details: error.message });
    }
  },

  async show(req, res) {
    const { id } = req.params;
    try {
      const pedido = await Pedido.findByPk(id, {
        include: [
          { model: Cliente, as: 'clientes', attributes: ['nome', 'email'] },
          {
            model: Produto,
            as: 'produtos',
            through: { attributes: ['quantidade'] },
            attributes: ['id_produto', 'descricao', 'valor', 'sabor']
          }
        ]
      });
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }
      const pedidoJson = pedido.toJSON();
      pedidoJson.itens_pedido = JSON.parse(pedidoJson.itens_pedido_json || '[]');
      return res.json(pedidoJson);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const {
        id_cliente,
        descricao,
        data_pedido,
        total,
        forma_pagamento,
        nome_cliente,
        telefone_cliente,
        itens_pedido,
        status
    } = req.body;

    const transaction = await connection.transaction();

    try {
      let itens_pedido_json = undefined;
      if (itens_pedido !== undefined) {
          itens_pedido_json = JSON.stringify(itens_pedido);
      }

      const [updated] = await Pedido.update({
          id_cliente,
          descricao,
          data_pedido,
          total,
          forma_pagamento,
          nome_cliente,
          telefone_cliente,
          itens_pedido_json,
          status
      }, {
        where: { id_pedido: id },
        transaction
      });

      if (!updated) {
        await transaction.rollback();
        return res.status(404).json({ error: 'Pedido não encontrado para atualização.' });
      }

      if (itens_pedido !== undefined) {
        await PedidoProduto.destroy({ where: { id_pedido: id }, transaction });
        if (itens_pedido.length > 0) {
          const newPedidoProdutos = itens_pedido.map(item => {
              const quantidadeDoItem = item.quantidadeDocinhos || 1;
              if (!item.id_produto) {
                  throw new Error(`id_produto ausente para o item durante a atualização: ${JSON.stringify(item)}`);
              }
              return {
                  id_pedido: id,
                  id_produto: item.id_produto,
                  quantidade: quantidadeDoItem,
              };
          });
          await PedidoProduto.bulkCreate(newPedidoProdutos, { transaction });
        }
      }

      await transaction.commit();

      const updatedPedido = await Pedido.findByPk(id, {
        include: [
          { model: Cliente, as: 'clientes', attributes: ['nome', 'email'] },
          {
            model: Produto,
            as: 'produtos',
            through: { attributes: ['quantidade'] },
            attributes: ['id_produto', 'descricao', 'valor', 'sabor']
          }
        ]
      });

      const updatedPedidoJson = updatedPedido.toJSON();
      updatedPedidoJson.itens_pedido = JSON.parse(updatedPedidoJson.itens_pedido_json || '[]');

      return res.json(updatedPedidoJson);

    } catch (error) {
      await transaction.rollback();
      console.error(error);
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
          error: 'Erro de validação ao atualizar pedido.',
          details: error.errors.map(err => err.message)
        });
      }
      if (error.parent && error.parent.code === 'ER_BAD_NULL_ERROR' && error.parent.sqlMessage.includes('id_produto')) {
        return res.status(400).json({ error: 'Erro: ID do produto não pode ser nulo durante a atualização. Verifique os dados enviados.', details: error.message });
      }
      return res.status(500).json({ error: 'Erro interno do servidor ao atualizar pedido.', details: error.message });
    }
  },

  async delete(req, res) {
    const { id } = req.params;
    const transaction = await connection.transaction();

    try {
      await PedidoProduto.destroy({ where: { id_pedido: id }, transaction });

      const deleted = await Pedido.destroy({
        where: { id_pedido: id },
        transaction
      });

      if (deleted) {
        await transaction.commit();
        return res.status(204).send();
      }
      await transaction.rollback();
      return res.status(404).json({ error: 'Pedido não encontrado para exclusão.' });
    } catch (error) {
      await transaction.rollback();
      console.error(error);
      return res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  }
};
