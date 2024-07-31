import express from 'express';
import { getAll, get, save, remove, update } from './index.js'; // Certifique-se de que o caminho está correto

const router = express.Router();

// Função utilitária para remover a senha do objeto do usuário
const removePassword = (user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

// Rota para obter todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await getAll();
        const usersWithoutPasswords = users.map(removePassword);
        res.json(usersWithoutPasswords);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Rota para obter um usuário por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await get(req.params.id);
        if (user) {
            res.json(removePassword(user));
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

// Rota para criar um novo usuário
router.post('/', async (req, res) => {
    try {
        const userId = await save(req.body);
        res.status(201).json({ id: userId });
    } catch (error) {
        console.error('Error in route:', error.message);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Rota para remover um usuário por ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await remove(req.params.id);
        if (result) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

// Rota para atualizar um usuário por ID
router.put('/:id', async (req, res) => {
    try {
        const result = await update(req.params.id, req.body);
        if (result) {
            const updatedUser = await get(req.params.id); // Recarregar o usuário atualizado
            res.json(removePassword(updatedUser));
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

export default router;
