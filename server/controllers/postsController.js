const Post = require('../models/postsModel');
const mongoose = require('mongoose');

const getPosts = async (req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1});

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

const getAllTags = async (req, res) => {
    const posts = await Post.find({}).sort({createdAt: -1});
    const tags = {};
    posts.forEach(post => {
        post.tags.forEach(tag => {
            if (tags.hasOwnProperty(tag)) {
                tags[tag] += 1;
            } else {
                tags[tag] = 1;
            }
        })
    })
    res.status(200).json(tags);
}

const getPostsByTag = async (req, res) => {
    const posts = await Post.find({ tags: req.params.tag}).sort({createdAt: -1});

    res.status(200).json(posts);
}


const createPost = async (req, res) => {
    const {title, snippet, body, tags, isPublished} = req.body;
    try {
        const post = await Post.create({title, snippet, body, tags, isPublished});
        res.status(200).json(post);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}

const deletePost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'});
    }

    const post = await Post.findOneAndDelete({_id: id});

    if (!post) {
        return res.status(404).json({error: 'No such post'});
    }

    res.status(200).json(post);
}

const updatePost = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such post'});
    }

    const post = await Post.findOneAndUpdate({_id: id}, {
        ...req.body
    });

    if (!post) {
        return res.status(404).json({error: 'No such post'});
    }

    res.status(200).json(post);
}

module.exports = {
    getPosts,
    getPost,
    getAllTags,
    getPostsByTag,
    createPost,
    deletePost,
    updatePost,
}