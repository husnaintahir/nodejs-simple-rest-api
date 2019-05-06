const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const COLLECTION_USERS = require('../MongoCollections').USERS


// Define schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
    },
    title: {
        type: String,
        trim: true,
    },
    first_name: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    middle_name: {
        type: String,
        trim: true,
    },
    image_url: {
        type: String,
        trim: true,
    }
}, {
        timestamps: true
    });

// hash pasword
UserSchema.pre('save', function (next) {
    if (this.password) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    }
    next();
});

module.exports = mongoose.model(COLLECTION_USERS, UserSchema);