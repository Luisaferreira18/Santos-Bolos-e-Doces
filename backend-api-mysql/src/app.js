require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importa a conexão Sequelize e todos os modelos
const { connection } = require('./models');

// Importa todas as rotas da sua aplicação
const clienteRoutes = require('./routes/clientes');
const pedidoRoutes = require('./routes/pedidos');
const produtoRoutes = require('./routes/produtos');
const boloRoutes = require('./routes/bolos');
const doceRoutes = require('./routes/doces');
const avaliacaoRoutes = require('./routes/avaliacoes');

const app = express();

app.use(cors());

// Middleware para fazer o parse do corpo das requisições JSON
app.use(express.json());

// --- Rotas da API ---
app.use('/api', clienteRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', produtoRoutes);
app.use('/api', boloRoutes);
app.use('/api', doceRoutes);
app.use('/api', avaliacaoRoutes);

// --- Conexão e Sincronização com o Banco de Dados ---
connection.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados MySQL estabelecida com sucesso!');
    return connection.sync({ alter: true });
  })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados MySQL.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ou sincronizar com o banco de dados MySQL:', err);
    process.exit(1);
  });

module.exports = app; // Exporta o aplicativo Express para ser usado pelo server.js