const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const VideoPost = require('../models/VideoPost');

router.get('/', (req, res) => {

    VideoPost.find({}, function (err, wordPost) {
        let wordPosts = wordPost;
        if (err) {
            res.send('Something went wrong');
            next();
        }
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(wordPosts));
    })
});

router.get('/:id', (req, res) => {
    VideoPost.findById(req.params.id, (err, items) => {
        if (err) res.status(500).send(error)
        res.status(200).json(items);
    });
});

router.put('/:id', (req, res) => (
    VideoPost.findAndModify(
        req.params.id,
        req.body,
        {new: true},
        (err, todo) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    )
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
            res.json(wordPost)
        });
});

module.exports = router;