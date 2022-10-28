const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const idValidator = require("mongoose-id-validator");
const {nanoid} = require('nanoid');

const {Schema, model} = mongoose;

const SALT_WORK_FACTOR = 10;

const validateUnique = async value => {
    const user = await User.findOne({email: value});

    if (user) return false;
};

const validateEmail = value => {
    const pattern = /^([a-zA-Z0-9]+[_.]?[a-zA-Z0-9])+@([a-zA-Z]{2,5})\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    if (!pattern.test(value)) return false;
};

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            {validator: validateEmail, message: 'Email is not valid!'},
            {validator: validateUnique, message: 'This user is already registered'},
        ]
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['admin', 'user'],
    },
    displayName: {
        type: String,
        required: true,
    },
    avatarImage: {
        type: String,
        required: true,
    },
    facebookId: {
        type: String,
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.set('toJSON', {
    transform: (doc, ret) => {
        delete ret.password;
        return ret;
    },
});

UserSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
    return this.token = nanoid();
};

UserSchema.plugin(idValidator, {message: 'Bad ID value for {PATH}'});

const User = model("User", UserSchema);

module.exports = User;