const fs = require('fs');
const path = require('path');
const config = require('../config');
const router = require('express').Router();

router.post('/', (req, res) => {
    try {

        if (!fs.existsSync(path.join('./', config.DEST))) {
            fs.mkdirSync(path.join('./', config.DEST), { recursive: true });
        }

        if (!fs.existsSync(path.join('./', config.DEST, config.UPLOAD_FILES_LIST))) {
            fs.writeFileSync(path.join('./', config.DEST, config.UPLOAD_FILES_LIST), '');
        }
        
        res.json({
            status: "ok",
            message: "Storage Created Successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = router;