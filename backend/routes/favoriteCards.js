const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const FavoriteCards = require('../models/FavoriteCard');
const WordPost = require('../models/WordPost');

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
    FavoriteCards.find({ "userId": { "$regex": req.params.userId, "$options": "i" } }).populate('card')
        .exec(function(err, post) {
        if (err) return res.send(err);
        return res.send(post);
    });
});

router.get('/find/:userId/:word', (req, res) => {
    FavoriteCards.find({ "userId": req.params.userId,
     "card.word": { "$regex": req.params.word, "$options": "i" }}).populate('card')
        .exec(function(err, post) {
            if (err) return res.send(err);
            console.log(req.params.userId)
            console.log(req.params.word)
            console.log(post);
            return res.send(post);
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

router.put('/', (req, res) => {
    const newFavoriteCard = new FavoriteCards({
        userId: req.body.userId,
        cardId: req.body.cardId
    });
        WordPost.findById( req.body.cardId , (err, word) => {
            if (word) {
                 FavoriteCards.findOne({ "userId":  req.body.userId,
                     "cardId" : req.body.cardId}).populate('card')
                    .exec(function(err, card) {
                        if (err) return res.send(err);
                        if (card) {
                            FavoriteCards.findByIdAndRemove(card._id)
                                .exec(function (err, card) {
                                })

                        } else {
                            newFavoriteCard.card = word;
                            newFavoriteCard.save();
                        }
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
    FavoriteCards.find({ "userId":req.body.userId })
        .exec(function(err, cards) {
            if (err) return res.send(err);
            return res.send(cards);
        });
    });

module.exports = router;
