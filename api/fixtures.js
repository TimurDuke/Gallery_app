const mongoose = require('mongoose');
const config = require('./config');

const run = async () => {
    await mongoose.connect(config.mongo.db);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    await mongoose.connection.close();
};

run().catch(console.error);