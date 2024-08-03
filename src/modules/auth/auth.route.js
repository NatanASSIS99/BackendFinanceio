import { Router } from 'express';
import {getAll, get, put, remove } from './index.js';
import { login, register } from './index.js'


const router = Router();

router.post('/login', async (req, res) => {
    const data = await login (req.boby);
    res.status(200).json({data});
});

router.get('/register', async (req, res) => {
    const data = await register(req.boby);
    res.status(200).json({data});
});




export default router;