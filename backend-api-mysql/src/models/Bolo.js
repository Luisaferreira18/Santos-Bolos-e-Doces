const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Bolo = sequelize.define('Bolo', {
    id_produto: { // Foreign Key para Produto
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
    tamanho: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  }, {
    tableName: 'bolo',
    timestamps: false,
  });
  // Define as associações DESTE modelo para outros
  Bolo.associate = (models) => {
    Bolo.belongsTo(models.Produto, {
      foreignKey: 'id_produto',
      as: 'produto',
    });
  };
  return Bolo;
};