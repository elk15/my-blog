const Comment = require('../models/commentsModel');
const mongoose = require('mongoose');
const { body, validationResult } = require("express-validator");

const getComments = async (req, res) => {
    const comments = await Comment.find({}).sort({createdAt: -1});

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

const getCommentsByPost = async (req, res) => {
    const {id} = req.params;

    const comments = await Comment.find({replyingTo: id}).sort({createdAt: -1});

    res.status(200).json(comments);
}

const createComment = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({max: 50})
        .withMessage('Name cannot exceed 50 characters')
        .escape(),
    body('body', 'Comment is required')
        .trim()
        .notEmpty()
        .escape(),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            let emptyFields = [];
            errors.array().forEach(err => {
                emptyFields.push(err.path);
            })
            res.status(400).json({errors: errors.array(), emptyFields});
            return;
        }

        try {
            const {name, body, replyingTo} = req.body;
            const comment = await Comment.create({name, body, replyingTo});
        res.status(200).json(comment);
        } catch(err) {
            res.status(400).json({errors: [{msg: err.message}]});
        }
    }
]

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

const updateComment = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({max: 50})
        .withMessage('Name cannot exceed 50 characters')
        .escape(),
    body('body', 'Comment is required')
        .trim()
        .notEmpty()
        .escape(),
    async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
            return;
        }
    
        try {
            const {id} = req.params;
            const comment = await Comment.findOneAndUpdate({_id: id}, {
                ...req.body
            }, {new: true});
            res.status(200).json(comment);
        } catch(err) {
            res.status(400).json({errors: [{msg: err.message}]});
        }
    }
]

module.exports = {
    getComments,
    getCommentsByPost,
    getComment,
    createComment,
    deleteComment,
    updateComment,
}