import db from '../../services/knex.js';
import bcrypt from 'bcrypt';

const TABLE = 'users';

// Recupera todos os usuários
export const getAll = () => {
    return db(TABLE).select(
        'id',
        'name',
        'email',
        'created_at',
        'updated_at'
    );
};

// Recupera um usuário baseado na consulta fornecida
export const get = async (query) => {
    return db(TABLE)
        .where(query)
        .select('id', 'name', 'email', 'password', 'created_at', 'updated_at')
        .first();
};

// Salva um novo usuário no banco de dados
export const save = (params) => {
    // Hash da senha antes de salvar
    params.password = bcrypt.hashSync(params.password, 10);
    return db(TABLE).insert(params).returning('*');
};

// Remove um usuário baseado no ID
export const remove = (id) => {
    return db(TABLE).where({ id }).delete();
};

// Atualiza os dados de um usuário baseado no ID
export const update = (id, params) => {
    // Se a senha for fornecida, hash-a antes de atualizar
    if (params.password) {
        params.password = bcrypt.hashSync(params.password, 10);
    }
    return db(TABLE).where({ id }).update(params).returning('*');
};

// Recupera um usuário baseado no email
export const getByEmail = (email) => {
    return db(TABLE).where({ email }).first();
};

// Recupera um usuário baseado no nome
export const getByName = (name) => {
    return db(TABLE).where({ name }).first();
};
