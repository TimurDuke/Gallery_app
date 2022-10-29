const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const config = require("../config");
const Photo = require("../models/Photo");
const auth = require("../middleware/auth");
const personalPhotosAuth = require("../middleware/personalPhotosAuth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get("/", personalPhotosAuth, async (req, res) => {
    try {
        let query = {published: {$eq: true}};

        if (req.query.author) {
            query.author= req.query.author;

            if (req.user['_id'].toString() === req.query.author || req.user.role === 'admin') {
                delete query.published;
            }
        }

        const photos = await Photo.find(query).populate('author', 'displayName');

        res.send(photos);
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post("/", auth, upload.single('image'), async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user['_id'];

        const image = req.file ? 'uploads/' + req.file.filename : null;

        let published = false;

        if (req.user.role === 'admin') {
            published = true;
        }

        const photoData = {
            author: userId,
            title,
            image,
            published,
        };

        const photo = new Photo(photoData);

        await photo.save();
        res.send(photo);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const photoId = req.params.id;
        const userId = req.user['_id'];

        const photo = await Photo.findById(photoId);

        if (!photo) {
            return res.status(404).send({message: "Photo with this id not found!"});
        }

        if (userId.toString() === photo['author'].toString() || req.user.role === 'admin') {
            await Photo.findByIdAndDelete(photo['_id']);
            return res.send({message: "Photo successfully deleted!"});
        } else {
            return res.status(403).send({message: "You do not have permission to delete this photo."});
        }
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;