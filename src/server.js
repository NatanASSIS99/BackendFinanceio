import express from 'express';
import dotenv from 'dotenv';
import router from './modules/user/user.route.js'; // Certifique-se de que o caminho está correto

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());  // Para que o express possa lidar com JSON no corpo da requisição
app.use('/user', router);  // Usar o router para rotas com o prefixo /api

app.get('/users', (_, res) => {
    return res.send('Sistema Operacional!');
});

app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});
