const router = require('express').Router();
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, config.DEST),
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueName)
    }
});
const upload = multer({ storage, limits: { fileSize: 1000000 * 100 } }).single('my_file'); //100mb

router.post('/', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        fs.writeFileSync(path.join(__dirname, '..', config.DEST, config.UPLOAD_FILES_LIST), req.file.path.replaceAll("\\", "/") + "\n", {
            encoding: 'utf-8',
            flag: 'a'
        })

        res.json({
            status: "ok",
            file_path: req.file.path.replaceAll("\\", "/") 
        });
    });
});

module.exports = router;