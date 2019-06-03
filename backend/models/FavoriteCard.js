const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoriteCardSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    cardId: {
        type: String,
        required: true
    },
    card:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'word_posts'
    },
});

const FavoriteCard = mongoose.model('favorite_cards', FavoriteCardSchema);

module.exports = FavoriteCard;
