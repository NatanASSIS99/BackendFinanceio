import bcrypt from 'bcrypt';
import knexService from '../../services/knex.js';

// Função para obter todos os usuários
export const getAll = async () => {
    try {
        const result = await knexService('users').select('*').debug();
        console.log('Query:', knexService('users').select('*').toQuery());
        return result;
    } catch (error) {
        console.error('Error in getAll:', error.message);
        throw error;
    }
};

// Função para obter um usuário por ID
export const get = async (id) => {
    try {
        const result = await knexService('users').where({ id }).first().debug();
        console.log('Query:', knexService('users').where({ id }).first().toQuery());
        return result;
    } catch (error) {
        console.error('Error in get:', error.message);
        throw error;
    }
};

// Função para salvar um novo usuário
export const save = async (params) => {
    try {
        const hashedPassword = bcrypt.hashSync(params.password, 10);
        const userData = { ...params, password: hashedPassword };
        const [userId] = await knexService('users').insert(userData).debug();
        console.log('User ID:', userId);
        return userId;
    } catch (error) {
        console.error('Error in save:', error.message);
        throw error;
    }
};

// Função para remover um usuário por ID
export const remove = async (id) => {
    try {
        const result = await knexService('users').where({ id }).del().debug();
        console.log('Query:', knexService('users').where({ id }).del().toQuery());
        return result;
    } catch (error) {
        console.error('Error in remove:', error.message);
        throw error;
    }
};

// Função para atualizar um usuário por ID
export const update = async (id, params) => {
    try {
        const allowedColumns = ['username', 'email', 'password', 'role'];
        const updateData = Object.keys(params)
            .filter(key => allowedColumns.includes(key))
            .reduce((obj, key) => {
                obj[key] = params[key];
                return obj;
            }, {});

        const result = await knexService('users').where({ id }).update(updateData).debug();
        console.log('Query:', knexService('users').where({ id }).update(updateData).toQuery());
        return result;
    } catch (error) {
        console.error('Error in update:', error.message);
        throw error;
    }
};
