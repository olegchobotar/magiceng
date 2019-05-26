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
    link: {
        type: String,
        required: true
    }
});

const VideoPost = mongoose.model('video_posts', VideoPostSchema);

module.exports = VideoPost;