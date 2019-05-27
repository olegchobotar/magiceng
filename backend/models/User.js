const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String
    }
});

UserSchema.method('transform', function() {
    let obj = this.toObject();

    obj.id = obj._id;
    delete obj._id;

    return obj;
});

const User = mongoose.model('users', UserSchema);

module.exports = User;