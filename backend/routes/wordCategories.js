const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const WordCategories = require('../models/WordCategory');

router.get('/all', (req, res) => {
    WordCategories.find({}, function (err, wordCategory) {
        if (err) {
            res.send('Something went wrong');
            next();
        }
        let returnedCategories = [];
        for (let i = 0; i < wordCategory.length; i++) {
            returnedCategories.push(wordCategory[i].simpleForm());
        }
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(returnedCategories));
    })
});

router.get('/', (req, res) => {
    WordCategories.find({}, function (err, wordCategory) {
        if (err) {
            res.send('Something went wrong');
            next();
        }
        let returnedCategories = [];
        for (let i = 0; i < wordCategory.length; i++) {
            returnedCategories.push(wordCategory[i].transform());
        }
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(returnedCategories));
    })
});

router.get('/:id', (req, res) => {
    WordCategories.findById(req.params.id, (err, wordPost) => {
        if (err) res.status(500).send(error);
        res.status(200).json(wordPost.transform());
    });
});

router.get('/find/:word', (req, res) => {
    WordCategories.find({ "categoryName": { "$regex": req.params.word, "$options": "i" } } , (err, data) => {
        if (err) return res.send(err);
        return res.send(data);
    });
});

router.put('/:id', (req, res) => (

    WordCategories.findByIdAndUpdate (
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
    return WordCategories.findByIdAndRemove(req.params.id)
        .then(() => {res.writeHead(200, {"Data-key": "10"});
            res.end(JSON.stringify(WordCategories));})
        .catch(next);
});

router.post('/', (req, res) => {

    const newWordCategory = new WordCategories({
        categoryName: req.body.categoryName,
    });
    newWordCategory
        .save()
        .then(wordCategory => {
            res.json(wordCategory.transform());
        });
});

module.exports = router;
