import knex from 'knex';
import knexConfig from '../config/database.js'; // Certifique-se de que o caminho está correto

const knexService = knex(knexConfig);

export default knexService;
