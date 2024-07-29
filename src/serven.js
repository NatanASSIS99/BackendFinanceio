import express from 'express'; // Certifique-se de usar import se estiver configurado para módulos ES
const app = express();
import userRoute from './modules/user/user/.route'

const port = 8080;

app.use(express.json()); 

app.use('/user', userRoute)

app.get('/health', (_, res) => {
  res.send('Hello World!');
});

app.listen(8080, () => {
  console.log(`servidor rodando na porta 8080`);
});
