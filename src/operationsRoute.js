const router = require('express').Router();
const path = require('path');
const fs = require('fs');
const gTTS = require('gtts');
const ffmpeg = require('./ffmpeg');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

router.post('/text_file_to_audio', (req, res) => {
    try {

        const filepath = path.join(__dirname, '../', req.body.file_path);

        const data = fs.readFileSync(filepath, 'utf8');
        console.log(data);
        const gtts = new gTTS(data, 'en');
        const audio_filepath = path.join(config.DEST, uuidv4() + '.mp3');
        gtts.save(audio_filepath, function (err, result) {
            if (err) {
                throw new Error(err);
            }
            res.send({
                status: "ok",
                message: "text to speech converted",
                audio_file_path: audio_filepath.replaceAll("\\", "/")
            })
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

})

router.post('/merge_image_and_audio', async (req, res) => {
    try {

        const imagefilepath = path.join(__dirname, '..', req.body.image_file_path);
        const audiofilepath = path.join(__dirname, '..', req.body.audio_file_path);
        const videooutfilepath = path.join(__dirname, '..', config.DEST, uuidv4() + '.mp4');

        ffmpeg()
            .input(imagefilepath)
            .input(audiofilepath)
            .videoCodec('mpeg4')
            .size('1920x1080')
            .save(videooutfilepath)
            .on('end', function () {
                res.json({
                    status: "ok",
                    message: "Video Created Successfully",
                    video_file_path: path.join(config.DEST, path.basename(videooutfilepath))
                })
            })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

});

router.post('/merge_video_and_audio', async (req, res) => {
    try {

        const videofilepath = path.join(__dirname, '..', req.body.video_file_path);
        const audiofilepath = path.join(__dirname, '..', req.body.audio_file_path);
        const videooutfilepath = path.join(__dirname, '..', config.DEST, uuidv4() + '.mp4');

        ffmpeg()
            .input(videofilepath)
            .input(audiofilepath)
            .videoCodec('mpeg4')
            .outputOptions(['-map 0:v', '-map 1:a', '-c:v copy'])
            .save(videooutfilepath)
            .on('end', function () {
                res.json({
                    status: "ok",
                    message: "Video and Audio Merged Successfully",
                    video_file_path: path.join(config.DEST, path.basename(videooutfilepath))
                })
            })

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

})


router.post('/merge_all_video', async (req, res) => {
    try {

        const videofilespath = req.body.video_file_path_list.map(item => path.join(__dirname, '..', item));
        const videooutfilepath = path.join(__dirname, '..', config.DEST, uuidv4() + '.mp4');

        const merged_video = ffmpeg();

        videofilespath.forEach(item => {
            merged_video.input(item);
        });

        merged_video
            .mergeToFile(videooutfilepath)
            .on('end', function () {
                res.json({
                    status: "ok",
                    message: "Merged All Video Successfully",
                    video_file_path: path.join(config.DEST, path.basename(videooutfilepath))
                })
            });

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

})

module.exports = router;