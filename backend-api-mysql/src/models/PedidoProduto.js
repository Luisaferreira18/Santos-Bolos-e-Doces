const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PedidoProduto = sequelize.define('PedidoProduto', {
    id_pedido: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Parte da chave primária composta
      allowNull: false,
      references: { 
        model: 'pedido',
        key: 'id_pedido',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    id_produto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { 
        model: 'produto', 
        key: 'id_produto',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'pedido_produto',
    timestamps: false, 
  });
  return PedidoProduto;
};