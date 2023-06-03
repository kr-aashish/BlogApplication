const { default: mongoose } = require("mongoose");
const { postModel } = require("../models/postSchema.js");

const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        const adminId = req.params.userId;

        const post = await postModel.create({
            title: title,
            description: description,
            adminId: adminId,
        });

        const postMetadata = await post.save();

        // Set response headers
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.status(201).json(postMetadata);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPost = async (req, res) => {
    try {
        const postId = req.params.postId;

        const postMetadata = await postModel.findById(postId);

        if (postMetadata) {
            // Set response headers
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-store');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');

            res.json(postMetadata);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updatePost = async (req, res) => {
    try {
        const { _id, title, description, adminId } = req.body;

        const filter = { _id: mongoose.Types.ObjectId(_id) };
        const update = { title: title, description: description, adminId: adminId };
        const options = { new: true };

        const updatedPostMetadata = await postModel.findOneAndUpdate(filter, update, options);

        if (updatedPostMetadata) {
            // Set response headers
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-store');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');

            res.json(updatedPostMetadata);
        } else {
            res.status(404).json({ error: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const allPosts = await postModel.find({});

        // Set response headers
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.json(allPosts);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { createPost, getPost, updatePost, getAllPosts };