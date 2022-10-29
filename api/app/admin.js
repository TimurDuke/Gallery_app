const router = require("express").Router();
const auth = require("../middleware/auth");

const permit = require("../middleware/permit");
const Photo = require("../models/Photo");

router.get('/moderation', auth, permit('admin'), async (req, res) => {
    try {
        const photos = await Photo.find().populate('author', 'displayName');

        res.send(photos);
    } catch {
        res.sendStatus(500);
    }
});

router.put('/publishPhoto/:id', auth, permit('admin'), async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);

        if (!photo) {
            return res.status(404).send({message: 'Photo with this id not found!'});
        }

        await Photo.updateOne(photo, {published : true});

        res.send(photo);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;