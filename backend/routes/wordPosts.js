const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const WordPosts = require('../models/WordPost');

router.get('/', (req, res) => {
    WordPosts.find({}, function (err, wordPost) {
        if (err) {
            res.send('Something went wrong');
            next();
        }
        let returnedWords = [];
        for (let i = 0; i < wordPost.length; i++) {
            returnedWords.push(wordPost[i].transform());
        }
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(returnedWords));
    })
});

router.get('/:id', (req, res) => {
    WordPosts.findById(req.params.id, (err, wordPost) => {
        if (err) res.status(500).send(error);
        res.status(200).json(wordPost.transform());
    });
});

router.put('/:id', (req, res) => (

    WordPosts.findByIdAndUpdate (
        req.params.id,
        req.body,
        {new: true},
        (err, todo) => {
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    )
));

router.delete('/:id', (req, res, next) => {
    return WordPosts.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

router.post('/', (req, res) => {

    const newWordPost = new WordPosts({
        word: req.body.word,
        translation: req.body.translation,
        imageSrc: req.body.imageSrc
    });
    newWordPost
        .save()
        .then(wordPost => {
            res.json(wordPost)
        });
});

module.exports = router;