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
    }
});


const FavoriteCard = mongoose.model('favorite_cards', FavoriteCardSchema);

module.exports = FavoriteCard;
