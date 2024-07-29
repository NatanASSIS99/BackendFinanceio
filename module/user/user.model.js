import knex from '/../sevices/knex';

export const getAll =() => {
    return knex('users');

};

export const get =() => {
    return knex('users').where({id}).first();

};

export const save = (params) => {
    return knex ('users'). delete(id);
    };

export const remove = (id) => {
    return knex('users').delete(id);
    };

export const update = (id, params) => {
    return knex('users').where({id}.update(params));

    }