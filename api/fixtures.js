const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require("nanoid");

const User = require("./models/User");
const Photo = require("./models/Photo");

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, user, jhon] = await User.create({
        email: 'admin@gmail.com',
        password: 'admin',
        token: nanoid(),
        role: 'admin',
        displayName: 'Admin',
        avatarImage: 'fixtures/avatar.png',
    }, {
        email: 'user@gmail.com',
        password: 'user',
        token: nanoid(),
        role: 'user',
        displayName: 'User',
        avatarImage: 'fixtures/avatar.png'
    }, {
        email: 'jhon@gmail.com',
        password: 'jhon',
        token: nanoid(),
        role: 'user',
        displayName: 'Jhon',
        avatarImage: 'fixtures/avatar.png'
    });

    await Photo.create({
        author: admin['_id'],
        title: "Admin photo",
        image: "fixtures/adminPhoto",
        published: true,
    }, {
        author: user['_id'],
        title: "User photo",
        image: "fixtures/userPhoto",
        published: true,
    }, {
        author: jhon['_id'],
        title: "Jhon photo",
        image: "fixtures/jhonPhoto",
        published: true,
    });

    await mongoose.connection.close();
};

run().catch(console.error);