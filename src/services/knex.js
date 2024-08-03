// src/services/knex.js
import knex from 'knex';

const knexConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'natan',
    database: process.env.DB_NAME || 'projeto_financeiro'
  }
};

const db = knex(knexConfig);

export default db;
