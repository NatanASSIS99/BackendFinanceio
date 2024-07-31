import express from 'express';
import dotenv from 'dotenv';
import knex from 'knex';
import knexConfig from './config/database.js';
import userRouter from './modules/user/user.route.js';

dotenv.config();
try{
  const db = knex(knexConfig); // Inicializando o Knex com a configuração

}catch (
  error
){
  console.error(error, 'erro 1'); 
}

const app = express();
const port = 8080;

app.use(express.json()); // Middleware para parsing de JSON

// Usar o roteador de usuários para todas as rotas que começam com "/user"
app.use('/user', userRouter);

app.get('/health', (_, res) => {
  res.send('Sistema está operacional');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
