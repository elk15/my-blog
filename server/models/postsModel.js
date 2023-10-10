const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 100,
    },
    snippet: {
        type: String,
        required: true,
        maxLength: 300,
    },
    body: {
        type: String,
        required: true,
    },
    tags: [{type: String}],
    isPublished: {
        type: Boolean,
        default: false,
    },
    author: {
        type: String,
        required: true,
    }
}, {timestamps: true})

postSchema.virtual("createdAt_formatted").get(function () {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_SHORT);
})

postSchema.virtual("updatedAt_formatted").get(function () {
    return DateTime.fromJSDate(this.updatedAt).toLocaleString(DateTime.DATETIME_SHORT);
})

module.exports = mongoose.model('Post', postSchema);