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
        console.log(returnedWords);
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(returnedWords));
    })
});

module.exports = router;