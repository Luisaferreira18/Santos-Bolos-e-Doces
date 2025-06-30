const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Produto = sequelize.define('Produto', {
    id_produto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sabor: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  }, {
    tableName: 'produto',
    timestamps: true,
  });

  // Define as associações DESTE modelo para outros
  Produto.associate = (models) => {
    // Um produto pode ser um Doce (relacionamento um-para-um)
    Produto.hasOne(models.Doce, {
      foreignKey: 'id_produto',
      as: 'doce',
      onDelete: 'CASCADE',
    });

    // Um produto pode ser um Bolo (relacionamento um-para-um)
    Produto.hasOne(models.Bolo, {
      foreignKey: 'id_produto',
      as: 'bolo',
      onDelete: 'CASCADE',
    });

    // Produtos - Pedidos (Muitos para muitos através de PedidoProduto)
    Produto.belongsToMany(models.Pedido, {
      through: models.PedidoProduto,
      foreignKey: 'id_produto',
      otherKey: 'id_pedido',
      as: 'pedido',
    });
  };

  return Produto;
};