const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const VideoCategories = require('../models/VideoCategory');

router.get('/all', (req, res) => {
    VideoCategories.find({}, function (err, videoCategory) {
        if (err) {
            res.send('Something went wrong');
            next();
        }
        let returnedCategories = [];
        for (let i = 0; i < videoCategory.length; i++) {
            returnedCategories.push(videoCategory[i].simpleForm());
        }
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(returnedCategories));
    })
});

router.get('/', (req, res) => {
    VideoCategories.find({}, function (err, videoCategory) {
        if (err) {
            res.send('Something went wrong');
            next();
        }
        let returnedCategories = [];
        for (let i = 0; i < videoCategory.length; i++) {
            returnedCategories.push(videoCategory[i].transform());
        }
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(returnedCategories));
    })
});

router.get('/edit', (req, res) => {
    VideoCategories.find({}, function (err, videoCategory) {
        if (err) {
            res.send('Something went wrong');
            next();
        }
        let returnedCategories = [];
        for (let i = 0; i < videoCategory.length; i++) {
            returnedCategories.push(videoCategory[i].simpleForm());
        }
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(returnedCategories));
    })
});

router.get('/:id', (req, res) => {
    VideoCategories.findById(req.params.id, (err, wordPost) => {
        if (err) res.status(500).send(error);
        res.status(200).json(wordPost.transform());
    });
});

router.get('/find/:word', (req, res) => {
    VideoCategories.find({ "categoryName": { "$regex": req.params.word, "$options": "i" } } , (err, data) => {
        if (err) return res.send(err);
        return res.send(data);
    });
});

router.put('/:id', (req, res) => (

    VideoCategories.findByIdAndUpdate (
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
    return VideoCategories.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

router.post('/', (req, res) => {

    const newVideoCategory = new VideoCategories({
        categoryName: req.body.categoryName,
    });
    newVideoCategory
        .save()
        .then(videoCategory => {
            res.json(videoCategory.transform());
        });
});

module.exports = router;
