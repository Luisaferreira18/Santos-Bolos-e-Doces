const { Cliente } = require('../models');
const bcrypt = require('bcryptjs');

const ClienteController = {
    // Listar todos os clientes
    async index(req, res) {
        try {
            const clientes = await Cliente.findAll({
                attributes: { exclude: ['senha'] }
            });
            return res.status(200).json(clientes);
        } catch (error) {
            console.error('Erro ao buscar clientes:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao buscar clientes.' });
        }
    },

    // Buscar um cliente por ID
    async show(req, res) {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByPk(id, {
                attributes: { exclude: ['senha'] }
            });
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado.' });
            }
            return res.status(200).json(cliente);
        } catch (error) {
            console.error('Erro ao buscar cliente por ID:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao buscar cliente.' });
        }
    },

    // Criar um novo cliente
    async store(req, res) {
        const { nome, telefone, email, senha } = req.body;
        try {
            // Validação básica para os campos obrigatórios
            if (!nome || !email || !senha) {
                return res.status(400).json({ error: 'Nome, e-mail e senha são obrigatórios.' });
            }
            if (!email.includes('@')) {
                return res.status(400).json({ error: 'Formato de e-mail inválido.' });
            }
            if (senha.length < 6) {
                return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
            }
            
            
            const cliente = await Cliente.create({ nome, telefone, email, senha });

            const clienteResponse = { ...cliente.toJSON() };
            delete clienteResponse.senha;
            return res.status(201).json(clienteResponse);
        } catch (error) {
            console.error('Erro ao criar cliente:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ error: 'E-mail já cadastrado.' });
            }
            return res.status(500).json({ error: 'Erro interno do servidor ao criar cliente.' });
        }
    },

    // Atualizar um cliente
    async update(req, res) {
        const { id } = req.params;
        const { nome, telefone, email, senha } = req.body;
        try {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado.' });
            }

            // Validações para update (se os campos forem fornecidos e válidos)
            if (email && !email.includes('@')) {
                return res.status(400).json({ error: 'Formato de e-mail inválido.' });
            }
            if (senha && senha.length < 6) {
                return res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres.' });
            }

            // Atualiza os campos. O hook 'beforeUpdate' no modelo cuidará do hash da senha.
            await cliente.update({ nome, telefone, email, senha });

            // Retorna o cliente atualizado, excluindo a senha
            const clienteResponse = { ...cliente.toJSON() };
            delete clienteResponse.senha;
            return res.status(200).json(clienteResponse);
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).json({ error: 'E-mail já cadastrado.' });
            }
            return res.status(500).json({ error: 'Erro interno do servidor ao atualizar cliente.' });
        }
    },

    // Excluir um cliente
    async delete(req, res) {
        const { id } = req.params;
        try {
            const cliente = await Cliente.findByPk(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente não encontrado.' });
            }
            await cliente.destroy();
            return res.status(204).send(); // 204 No Content para sucesso na exclusão
        } catch (error) {
            console.error('Erro ao excluir cliente:', error);
            return res.status(500).json({ error: 'Erro interno do servidor ao excluir cliente.' });
        }
    },

    // --- Login do cliente (SEM JWT) ---
    async login(req, res) {
        debugger;
        const { email, senha } = req.body;

        try {
            const cliente = await Cliente.findOne({ where: { email } });
            if (!cliente) {
                return res.status(400).json({ message: 'Credenciais inválidas.' });
            }

            // 2. Comparar a senha fornecida com a senha hasheada no banco de dados
            const senhaValida = await bcrypt.compare(senha, cliente.senha);

            if (!senhaValida) {
                return res.status(400).json({ message: 'Credenciais inválidas.' });
            }
              const clienteData = cliente.toJSON();
              console.log("Resposta JSON completa enviada do backend (TESTE):", clienteData);

            return res.status(200).json({
                message: 'Login bem-sucedido!',
                id_cliente: cliente.id_cliente,  
                nome: cliente.nome, 
                telefone: cliente.telefone 
            });

        } catch (error) {
            console.error('Erro durante o login:', error);
            return res.status(500).json({ message: 'Erro interno do servidor durante o login.' });
        }
    }
};

module.exports = ClienteController;