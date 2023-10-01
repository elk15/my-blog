const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
    },
    body: {
        type: String,
        required: true,
    },
    replyingTo: {
        type: Schema.Types.ObjectId, ref: "Post",
        required: true,
    }
}, {timestamps: true})

commentSchema.virtual("createdAt_formatted").get(function () {
    return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_SHORT);
})

commentSchema.virtual("updatedAt_formatted").get(function () {
    return DateTime.fromJSDate(this.updatedAt).toLocaleString(DateTime.DATETIME_SHORT);
})

module.exports = mongoose.model('Comment', commentSchema);