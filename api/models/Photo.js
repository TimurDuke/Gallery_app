const mongoose = require("mongoose");
const {nanoid} = require("nanoid");

const { Schema, model } = mongoose;

const PhotoSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        required: true,
        default: false,
    },
    token: String,
});

PhotoSchema.methods.generateToken = function () {
    return this.token = nanoid();
};

const Photo = model("Photo", PhotoSchema);

module.exports = Photo;