import express from 'express';
import userRoutes from './routes/users.js'; // Certifique-se de que o caminho está correto

const app = express();

app.use(express.json()); // Middleware para analisar JSON

// Rotas
app.use('/user', userRoutes);

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
