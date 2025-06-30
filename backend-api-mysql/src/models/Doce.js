const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Doce = sequelize.define('Doce', {
    id_produto: { // Foreign Key para Produto (e também Primary Key desta tabela)
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: { 
        model: 'produto',
        key: 'id_produto', 
      },
      onUpdate: 'CASCADE', // Se o id_produto for atualizado em Produto, atualiza aqui
      onDelete: 'CASCADE', // Se o Produto for deletado, deleta o Doce
    },
    tipo: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    tableName: 'doce',
    timestamps: false,
  });
  // Define as associações DESTE modelo para outros
  Doce.associate = (models) => {
    Doce.belongsTo(models.Produto, {
      foreignKey: 'id_produto', // Chave estrangeira do Doce que aponta para Produto
      as: 'produto',
    });
  };
  return Doce;
};