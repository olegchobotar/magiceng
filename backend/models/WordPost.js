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
    category: {
        type: String
    },
    imageSrc: {
        type: String,
        required: true
    }
});

WordPostSchema.method('transform', function() {
    let obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;

    return obj;
});

module.exports = mongoose.model('word_posts', WordPostSchema);
