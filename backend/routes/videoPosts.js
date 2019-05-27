const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const VideoPost = require('../models/VideoPost');

router.get('/', (req, res) => {

    VideoPost.find({}, function (err, videoPost) {
        if (err) {
            res.send('Something went wrong');
            next();
        }
        let returnedWords = [];
        for (let i = 0; i < videoPost.length; i++) {
            returnedWords.push(videoPost[i].transform());
        }
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(returnedWords));
    })
});

router.get('/find/:word', (req, res) => {
    VideoPost.find({$text: /.*b.*/}, (err, data) => {
        console.log(req.params.word);
            if (err) return res.send(err)
            return res.send(data)
        });
});

router.get('/:id', (req, res) => {
    VideoPost.findById(req.params.id, (err, videoPost) => {
        if (err) res.status(500).send(error)
        res.status(200).json(videoPost.transform());
    });
});

router.put('/:id', (req, res) => (
    VideoPost.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        function (err, place) {
            res.send(place);
    })
));

router.delete('/:id', (req, res, next) => {
    return VideoPost.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

router.post('/', (req, res) => {
    const newVideoPost = new VideoPost({
        title: req.body.title,
        description: req.body.description,
        link: req.body.link,
    });

    console.log(newVideoPost);
    newVideoPost
        .save()
        .then(wordPost => {
            res.json(wordPost.transform())
        });
});

module.exports = router;