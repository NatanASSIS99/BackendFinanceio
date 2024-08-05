import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getByName, getByEmail, save } from '../user/user.model.js';

const SECRET_KEY = process.env.SECRET_KEY || 'your_secret_key';

export const register = async (params) => {
    try {
        const { name, email, password } = params;

        // Verificar se todos os parâmetros necessários foram fornecidos
        if (!name || !email || !password) {
            throw new Error('Name, email, and password are required');
        }

        // Verificar se o email já está registrado
        const existingUser = await getByEmail(email);
        if (existingUser) {
            throw new Error('This email already exists');
        }

        // Hash da senha do usuário
        const hashedPassword = bcrypt.hashSync(password, 10);
        params.password = hashedPassword;

        // Salvar o usuário no banco de dados
        const user = await save(params);

        // Gerar token JWT
        const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
            expiresIn: '1h',
        });

        return { token, user };
    } catch (error) {
        console.error('Error in register function:', error);
        throw new Error('Registration failed');
    }
};

export const login = async (params) => {
    try {
        const { name, email } = params;

        // Verificar se todos os parâmetros necessários foram fornecidos
        if (!name || !email) {
            throw new Error('Name and email are required');
        }

        // Buscar usuário com base no nome
        const user = await getByName(name);

        // Verificar se o usuário foi encontrado e se o email corresponde
        if (!user || user.email !== email) {
            throw new Error('User not found or email does not match');
        }

        // Gerar o token JWT
        const token = jwt.sign({ id: user.id, name: user.name }, SECRET_KEY, {
            expiresIn: '1h',
        });

        return { token, user };
    } catch (error) {
        console.error('Error in login function:', error);
        throw new Error('Login failed');
    }
};
