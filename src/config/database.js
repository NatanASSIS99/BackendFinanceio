import knex from 'knex';

const knexConfig = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: 3306, // Corrigido o porto para o padrão do MySQL
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'natan',
    database: process.env.DB_NAME || 'projeto_financeiro'
  }
});

export default knexConfig;
