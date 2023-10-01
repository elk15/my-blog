const Comment = require('../models/commentsModel');
const mongoose = require('mongoose');

const getComments = async (req, res) => {
    const comments = await Comment.find({}).sort({createdAt: -1});

    res.status(200).json(comments);
}

const getPostComments = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such comment'});
    }

    const comments = await Comment.find({replyingTo: id}).sort({createdAt: -1});``

    res.status(200).json(comments);
}

const getComment = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such comment'});
    }

    const comment = await Comment.findById(id);

    if (!comment) {
        return res.status(404).json({error: 'No such comment'});
    }

    res.status(200).json(comment);
}

const createComment = async (req, res) => {
    const {name, body, replyingTo} = req.body;
    try {
        const comment = await Comment.create({name, body, replyingTo});
        res.status(200).json(comment);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

const deleteComment = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such comment'});
    }

    const comment = await Comment.findOneAndDelete({_id: id});

    if (!comment) {
        return res.status(404).json({error: 'No such comment'});
    }

    res.status(200).json(comment);
}

const updateComment = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such comment'});
    }

    const comment = await Comment.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!comment) {
        return res.status(404).json({error: 'No such comment'});
    }

    res.status(200).json(comment);
}

module.exports = {
    getComments,
    getPostComments,
    getComment,
    createComment,
    deleteComment,
    updateComment,
}