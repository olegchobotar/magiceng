const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VideoCategorySchema = new Schema({
    categoryName: {
        type: String,
        required: true
    }
});

VideoCategorySchema.method('transform', function() {
    let obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;

    return obj;
});


const VideoCategory = mongoose.model('video_categories', VideoCategorySchema);

module.exports = VideoCategory;
