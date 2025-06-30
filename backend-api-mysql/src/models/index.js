const Sequelize = require('sequelize'); 
const dbConfig = require('../config/database'); 

const connection = new Sequelize(dbConfig);

const Cliente = require('./Cliente')(connection);
const Pedido = require('./Pedido')(connection); 
const Produto = require('./Produto')(connection);
const Doce = require('./Doce')(connection);
const Bolo = require('./Bolo')(connection);
const PedidoProduto = require('./PedidoProduto')(connection);
const Avaliacao = require('./Avaliacao')(connection); 


const models = {
  Cliente,
  Pedido,
  Produto,
  Doce,
  Bolo,
  PedidoProduto,
  Avaliacao,
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  connection, 
  ...models,  
};