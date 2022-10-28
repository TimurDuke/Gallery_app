const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require("nanoid");

const User = require("./models/User");

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [admin, user] = await User.create({
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
    });

    await mongoose.connection.close();
};

run().catch(console.error);