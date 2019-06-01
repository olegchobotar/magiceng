const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideoPostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String
    },
    link: {
        type: String,
        required: true
    }
});

VideoPostSchema.method('transform', function() {
    let obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;

    return obj;
});

const VideoPost = mongoose.model('video_posts', VideoPostSchema);

module.exports = VideoPost;
