import db from '../../services/knex.js'; // Ajuste o caminho conforme necessário
import bcrypt from 'bcrypt'; // Certifique-se de importar bcrypt

export const getAll = () => {
    return db('users').select(
        'id',
        'name',
        'email',
        'created_at',
        'update_at'
    );
};

export const get = (id) => {
    return db('users')
    .where({ id })
    .select('id', 'name', 'email', 'created_at', 'update_at')
    .first();
};

export const save = (params) => {
    params.password = bcrypt.hashSync(params.password, 10);  // Corrigido de put para save
    return db('users').insert(params);
};

export const remove = (id) => {
    return db('users').where({ id }).delete();
};

export const update = (id, params) => {
    if (params.password) {
        params.password = bcrypt.hashSync(params.password, 10);  // Se a senha for fornecida, criptografá-la
    }
    return db('users').where({ id }).update(params);
};
