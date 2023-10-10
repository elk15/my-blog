const Post = require('../models/postsModel');
const Comment = require('../models/commentsModel');
const mongoose = require('mongoose');
const { body, validationResult } = require("express-validator");

const getPosts = async (req, res) => {
    const author = req.user._id;

    const posts = await Post.find({author}).sort({createdAt: -1});

    res.status(200).json(posts);
}

const getPublishedPosts = async (req, res) => {
    const posts = await Post.find({isPublished: true}).sort({createdAt: -1});

    res.status(200).json(posts);
}

const getPost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'});
    }

    const post = await Post.findById(id);

    if (!post) {
        return res.status(404).json({error: 'No such post'});
    }

    res.status(200).json(post);
}

const createPost = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({max: 100})
        .withMessage("Title cannot exceed 100 characters"),
    body("snippet")
        .trim()
        .notEmpty()
        .withMessage("Snippet is required")
        .isLength({max: 300})
        .withMessage("Snippet cannot exceed 100 characters"),
    body("body")
        .trim()
        .notEmpty()
        .withMessage("Body is required"),
    body("tags")
        .trim()
        .customSanitizer(tags => {
            return tags.split(", ");
        }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
            return;
        } 

        try {
            const author = req.user._id;
            const {title, snippet, body, tags, isPublished} = req.body;
            const post = await Post.create({title, snippet, body, tags, isPublished, author});
            res.status(200).json(post);
        } catch(err) {
            res.status(400).json({errors: [{msg: err.message}]});
        }
        
    }
]

const deletePost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'});
    }

    const commentsDeleted = await Comment.deleteMany({replyingTo: id});
    const post = await Post.findOneAndDelete({_id: id});

    if (!post) {
        return res.status(404).json({error: 'No such post'});
    }

    res.status(200).json({post, commentsDeleted});
}

const updatePost = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required")
        .isLength({max: 100})
        .withMessage("Title cannot exceed 100 characters"),
    body("snippet")
        .trim()
        .notEmpty()
        .withMessage("Snippet is required")
        .isLength({max: 300})
        .withMessage("Snippet cannot exceed 100 characters"),
    body("body")
        .trim()
        .notEmpty()
        .withMessage("Body is required"),
    body("tags")
        .trim()
        .customSanitizer(tags => {
            return tags.split(", ");
        }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
            return;
        }

        try {
            const {id} = req.params;
            const post = await Post.findOneAndUpdate({_id: id}, {
                ...req.body
            })
            res.status(200).json(post);
        } catch(err) {
            res.status(400).json({errors: [{msg: err.message}]});
        }
    }
]

module.exports = {
    getPosts,
    getPublishedPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
}