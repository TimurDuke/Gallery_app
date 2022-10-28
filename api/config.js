const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mongo: {
        db: 'mongodb://localhost/...',
        options: {useNewUrlParser: true},
    },
    fb: {
        appId: '2987459394886185',
        appSecret: process.env.FACEBOOK_APP_SECRET,
    }
};