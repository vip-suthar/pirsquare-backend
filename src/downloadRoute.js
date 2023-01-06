const router = require('express').Router();
const path = require('path');

router.get('/', async (req, res) => {
    // Extract link and get file from storage send download stream 
    try {
        res.download(path.join(__dirname, '..', req.query.file_path));
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;