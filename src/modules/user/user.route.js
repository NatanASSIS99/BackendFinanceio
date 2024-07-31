import express from 'express';
import { getAll, get, save, remove, update } from './index.js'; // Certifique-se de que o caminho está correto

const router = express.Router();

// Rota para obter todos os usuários
router.get('/', async (req, res) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Rota para obter um usuário por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await get(req.params.id);
        if (user) {
            res.json(user);
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
            res.json({ message: 'User updated' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
    }
});

export default router;
