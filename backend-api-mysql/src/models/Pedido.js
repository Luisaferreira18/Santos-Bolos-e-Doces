const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Pedido = sequelize.define('Pedido', {
    id_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clientes',
        key: 'id_cliente',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    forma_pagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nome_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itens_pedido_json: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Em Andamento',
    },
  }, {
    tableName: 'pedido',
    timestamps: true,
    underscored: true
  });

  Pedido.associate = (models) => {
    Pedido.belongsTo(models.Cliente, { foreignKey: 'id_cliente', as: 'clientes' });

    Pedido.belongsToMany(models.Produto, {
      through: models.PedidoProduto,
      foreignKey: 'id_pedido',
      otherKey: 'id_produto',
      as: 'produtos',
    });
  };
  
  return Pedido;
};