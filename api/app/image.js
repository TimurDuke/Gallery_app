const router = require("express").Router();
const auth = require("../middleware/auth");
const Photo = require("../models/Photo");

router.get('/', async (req, res) => {
    try {
        if (!req.query.token) {
            return res.status(400).send({message: "Token is required"});
        }

        const token = req.query.token;

        const photo = await Photo.find({token}).populate('author', 'displayName');

        if (photo.length === 0) {
            return res.status(404).send({message: "Photo with this id not found!"});
        }

        res.send(photo);
    } catch {
        res.sendStatus(500);
    }
});

router.post('/:id', auth, async (req, res ) => {
    try {
        const photoId = req.params.id;

        const photo = await Photo.findById(photoId);

        if (!photo) {
            return res.status(404).send({message: "Photo with this id not found!"});
        }

        photo.generateToken();
        await photo.save();

        res.send({token: photo.token});
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;