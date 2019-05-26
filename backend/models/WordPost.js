const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WordPostSchema = new Schema({
    word: {
        type: String,
        required: true
    },
    translation: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        required: true
    }
});

const WordPost = mongoose.model('word_posts', WordPostSchema);

module.exports = WordPost;