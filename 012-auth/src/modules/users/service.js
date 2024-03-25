const argon2 = require("argon2");

const { PasswordsDoNotMatchError, EmailAlreadyExistsError } = require("./errors");
const Users = require("./repository");

const get = async (id) => {
    return await Users.getById(id);
};

const register = async ({ email, password, confirmPassword, ...fields }) => {
    const userExists = await Users.getByEmail(email);
    if (userExists) {
        throw new EmailAlreadyExistsError("Email already exists");
    }

    if (password !== confirmPassword) {
        throw new PasswordsDoNotMatchError("Passwords do not match");
    }

    const user = {
        ...fields,
        email,
        passwordHash: await argon2.hash(password),
    };

    return await Users.insert(user);
};

const authenticate = async (email, password) => {
    const user = await Users.getByEmail(email);

    if (!user) {
        return null;
    }

    if (!await argon2.verify(user.passwordHash, password)) {
        return null;
    }

    return user;
};

module.exports = {
    get,
    register,
    authenticate,
};