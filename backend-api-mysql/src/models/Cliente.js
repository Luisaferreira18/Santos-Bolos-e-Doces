const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize) => {
    const Cliente = sequelize.define('Cliente', {
        id_cliente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nome: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        telefone: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        senha: { 
            type: DataTypes.STRING(255), // Armazenará o hash da senha
            allowNull: false
        }
    }, {
        tableName: 'clientes',
        timestamps: false
    });

    // --- HOOKS DO SEQUELIZE PARA HASH DE SENHA ---
    Cliente.addHook('beforeCreate', async (cliente) => {
        if (cliente.senha) { 
            const salt = await bcrypt.genSalt(10); 
            cliente.senha = await bcrypt.hash(cliente.senha, salt); // Faz o hash da senha
        }
    });

    Cliente.addHook('beforeUpdate', async (cliente) => {
        if (cliente.changed('senha') && cliente.senha) {
            const salt = await bcrypt.genSalt(10);
            cliente.senha = await bcrypt.hash(cliente.senha, salt);
        }
    });

    // --- Método para comparar senha---
    Cliente.prototype.comparePassword = async function (candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.senha);
    };

    return Cliente;
};