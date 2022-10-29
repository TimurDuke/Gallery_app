const express = require('express');
const {nanoid} = require('nanoid');
const axios = require("axios");
const config = require("../config");
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { password, email, displayName } = req.body;

        const userData = {password, email, displayName};

        const user = new User(userData);

        user.generateToken();
        await user.save();

        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/sessions', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email});

    if (!user) {
        return res.status(401).send({message: 'Wrong email or password!'});
    }

    const isMatch = await user.checkPassword(password);

    if (!isMatch) {
        return res.status(401).send({message: 'Wrong username or password!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send(user);
});

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body['accessToken'];
    const accessToken = config.fb.appId + '|' + config.fb.appSecret;

    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const { data } = await axios.get(debugTokenUrl);

        if (data.data.error) {
            return res.status(401).send({message: "Facebook token incorrect!"});
        }

        if (req.body.id !== data.data['user_id']) {
            return res.status(401).send({message: "Wrong user ID"});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            const userData = {
                email: req.body.email,
                password: nanoid(),
                facebookId: req.body.id,
                displayName: req.body.name,
            };

            user = new User(userData);
        }

        user.generateToken();
        await user.save({validateBeforeSave: false});

        res.send(user);
    } catch (e) {
        return res.status(401).send({message: "Facebook token incorrect!"});
    }
});

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = { message: 'Success' };

    if (!token) return res.send(success);

    const user = await User.findOne({token});

    if (!user) return res.send(success);

    user.generateToken();
    await user.save({validateBeforeSave: false});

    res.send({success, user});
});

module.exports = router;