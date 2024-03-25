class PasswordsDoNotMatchError extends Error {
    constructor(message) {
        super(message);
        this.name = "PasswordsDoNotMatchError";
    }
}

class EmailAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = "EmailAlreadyExistsError";
    }
}

module.exports = {
    PasswordsDoNotMatchError,
    EmailAlreadyExistsError,
};