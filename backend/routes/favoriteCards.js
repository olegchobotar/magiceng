const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const FavoriteCards = require('../models/FavoriteCard');

router.get('/', (req, res) => {

    FavoriteCards.find({}, function (err, favoriteCards) {
        if (err) {
            res.send('Something went wrong');
            next();
        }
        res.writeHead(200, {"X-Total-Count": "10"});
        res.end(JSON.stringify(favoriteCards));
    })
});

router.get('/:userId', (req, res) => {
    FavoriteCards.find({ "userId": { "$regex": req.params.word, "$options": "i" } } , (err, data) => {
        if (err) return res.send(err);
        return res.send(data);
    });
});

// router.get('/:id', (req, res) => {
//     FavoriteCard.findById(req.params.id, (err, videoPost) => {
//         if (err) res.status(500).send(error)
//         res.status(200).json(videoPost.transform());
//     });
// });

router.delete('/:id', (req, res, next) => {
    return FavoriteCards.findByIdAndRemove(req.params.id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

router.post('/', (req, res) => {
    const newFavoriteCard = new FavoriteCards({
        userId: req.body.userId,
        cardId: req.body.cardId,
    });
    FavoriteCards.find({ "userId": { "$regex": req.body.userId, "$options": "i" },
        "cardId": { "$regex": req.body.cardId, "$options": "i" }} , (err, data) => {
        if (err) return res.send(err);
        console.log(data);
        if (data.length > 0) {
            console.log('deleted');
             FavoriteCards.findByIdAndRemove(req.body.id)
                 .then(() => res.sendStatus(200))

        } else {
            console.log('added');
            newFavoriteCard
                .save()
                .then(favoriteCard => {
                    res.json(favoriteCard)
                });
        }
    });
});

module.exports = router;
