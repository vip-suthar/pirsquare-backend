const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const config = require('../config');

router.get('/', (req, res) => {

    const data = fs.readFileSync(path.join(__dirname, '..', config.DEST, config.UPLOAD_FILES_LIST), 'utf-8');

    const filesList = data.replaceAll('\r', '').split('\n').filter(item => item.trim() !== "");

    res.json({
        status: "ok",
        data: filesList
    })

})

module.exports = router;