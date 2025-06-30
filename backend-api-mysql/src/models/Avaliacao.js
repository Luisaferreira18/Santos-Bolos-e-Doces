// src/models/Avaliacao.js
const { DataTypes } = require('sequelize'); 

module.exports = (sequelize) => { 
  const Avaliacao = sequelize.define('Avaliacao', {
    id_avaliacao: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    id_pedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'pedido', 
        key: 'id_pedido',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: false, // Dependendo da regra de negócio, pode ser true se a avaliação puder ser anônima
      references: {
        model: 'clientes',
        key: 'id_cliente',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    nota: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
    comentario: {
      type: DataTypes.TEXT, 
      allowNull: true
    },
    data_avaliacao: {
      type: DataTypes.DATE, 
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
  }, {
    tableName: 'avaliacoes',
    timestamps: true, 
    underscored: true 
  });

  Avaliacao.associate = function(models) {
    Avaliacao.belongsTo(models.Pedido, { foreignKey: 'id_pedido', as: 'pedido' });
    Avaliacao.belongsTo(models.Cliente, { foreignKey: 'id_cliente', as: 'clientes' }); 
  };

  return Avaliacao;
};