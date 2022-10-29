const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const config = require("../config");
const Photo = require("../models/Photo");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

router.get("/", async (req, res) => {
    try {
        let query;

        if (req.query.author) {
            query = {author: req.query.author};
        }

        const photos = await Photo.find(query).populate('author', 'displayName');

        res.send(photos);
    } catch (e) {
        res.sendStatus(500);
    }
});

router.post("/", auth, upload.single('image'), async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user['_id'];

        const image = req.file ? 'uploads/' + req.file.filename : null;

        const photoData = {
            author: userId,
            title,
            image: image || null
            /* || null для вывода ошибки в инпуте. */
        };

        const photo = new Photo(photoData);

        res.send(photo);
        await photo.save();
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

        if (userId.toString() === photo['author'].toString()) {
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