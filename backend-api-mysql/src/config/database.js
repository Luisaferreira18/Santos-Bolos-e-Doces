require('dotenv').config();

module.exports = {
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'sua_senha_do_mysql',
  database: process.env.DB_NAME || 'seu_nome_do_banco',
  port: process.env.DB_PORT || 3306, 
  define: {
    timestamps: true,
    underscored: true,
  },
  logging: false,
};