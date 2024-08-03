import { Router } from 'express';
import { getAll, get, save, remove, update } from './index.js';  // Certifique-se de que todos esses métodos estão exportados corretamente

const router = Router();

router.get('/', async (req, res) => {
    try {
        const data = await getAll();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const data = await get(req.params.id);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = await save(req.body);  // Corrigido de put para save
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const data = await remove(req.params.id);
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const data = await update(req.params.id, req.body);  // Corrigido de uptade para update e adicionando req.body
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
