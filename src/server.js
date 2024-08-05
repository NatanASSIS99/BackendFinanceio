import express from 'express';
import dotenv from 'dotenv';
import authRouter from './modules/auth/auth.route.js';
import userRouter from './modules/user/user.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Middleware para capturar erros de parsing de JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Bad JSON format' });
    }
    next();
});

// Rotas
app.use('/user', userRouter);
app.use('/auth', authRouter);

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});
