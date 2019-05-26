const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const WordPosts = require('../models/WordPost');

router.get('/', (req, res) => {
    // const result = [
    //     {"id":"5ce927ee60a5590020c3ebc0","word":"Car","translation":"Автомобіль","imageSrc":"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/adc29613-bd86-46bc-8afe-f735a64103d5/d3409fh-2bfd7bfb-12c5-4918-ad27-bbb13b0a295f.jpg/v1/fill/w_730,h_1095,q_70,strp/contemplative_reptile_6120858_by_stockproject1_d3409fh-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTY4OCIsInBhdGgiOiJcL2ZcL2FkYzI5NjEzLWJkODYtNDZiYy04YWZlLWY3MzVhNjQxMDNkNVwvZDM0MDlmaC0yYmZkN2JmYi0xMmM1LTQ5MTgtYWQyNy1iYmIxM2IwYTI5NWYuanBnIiwid2lkdGgiOiI8PTExMjUifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.8FLV9JsbHBdPgwl-5zYh7cEYNkw7BkfZgG5qc-Hj-Q8","__v":0},
    //     {"id":"5ce927ee60a5590020c3ebа0","word":"Car","translation":"Автомобіль","imageSrc":"","__v":0},
    //     {"id":"5ce927ee60a5590020c3ebа8","word":"Car","translation":"Автомобіль","imageSrc":"","__v":0},
    //     {"id":"5ce927ee60a5590020c3ebа6","word":"Car","translation":"Автомобіль","imageSrc":"","__v":0},
    //     {"id":"5ce927ee60a5590020c3ebа2","word":"Butterfly","translation":"Автомобіль","imageSrc":"","__v":0},
    //     {"id":"5ce927ee60a5590020c3ebа5","word":"Something","translation":"Автомобіль","imageSrc":"","__v":0},
    //     {"id":"5cea58dcafe56e455cdc59e4","word":"Word","translation":"Слово","imageSrc":"","__v":0}
    //     ];
    //
    // res.writeHead(200, {"X-Total-Count": "10"});
    // res.end(JSON.stringify(result));

    WordPosts.find({}, function (err, wordPost) {
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
    WordPosts.findById(req.params.id, (err, items) => {
        if (err) res.status(500).send(error)
        res.status(200).json(items);
    });
});

router.put('/:id', (req, res) => (
    WordPosts.findAndModify(
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

    console.log(newWordPost);
    newWordPost
        .save()
        .then(wordPost => {
            res.json(wordPost)
        });
});

module.exports = router;