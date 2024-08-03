import express from 'express';
const app = express();
app.use(express.json());

app.get('/health', (_, res) =>{
    return res.send('Sistema Operacinal!');
});

app.listen(8080, () => {
    console.log('Server rodando na porta 8080');
});