const { Schema, model, isValidObjectId } = require("mongoose");

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
});

const User = model("User", userSchema);

const getById = async (id) => {
    if (!isValidObjectId(id)) {
        return null;
    }

    return await User.findById(id);
};

const getByEmail = async (email) => {
    return await User.findOne({ email });
};

const insert = async (user) => {
    const newUser = new User(user);
    return await newUser.save();
};

module.exports = {
    getById,
    getByEmail,
    insert,
};