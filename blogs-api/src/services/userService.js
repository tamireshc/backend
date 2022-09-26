const { User } = require('../models');

const checkUser = async (email, password) => {
    const hasUser = await User.findOne({
        where: { email },
    });

    if (!hasUser) {
        return { type: 'NOT_FOUND', message: 'Invalid fields' };
    }

    if (hasUser.password !== password) {
        return { type: 'NOT_FOUND', message: 'Invalid fields' };
    }

    return { type: null, message: hasUser };
};

const createUser = async ({ displayName, email, password, image }) => {
    const hasUser = await User.findOne({
        where: { email },
    });

    if (hasUser) {
        return { type: 'USER_REGISTERED', message: 'User already registered' };
    }
    const newUser = await User.create({ displayName, email, password, image });
    return { type: null, message: newUser };
};

const getAllUsers = async () => {
    const users = await User.findAll({
        attributes: { exclude: ['password'] },
    });
    return { type: null, message: users };
};

const getUserById = async (id) => {
    const user = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] },
    });
    if (!user) {
        return { type: 'NOT_FOUND', message: 'User does not exist' };
    }
    return { type: null, message: user };
};

const deleteUser = async (email) => {
    const result = await User.destroy({
        where: { email },
    });
    return { type: null, message: result };
};

module.exports = {
    checkUser,
    createUser,
    getAllUsers,
    getUserById,
    deleteUser,
};