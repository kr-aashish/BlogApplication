const express = require("express");
const {
    createPost,
    getAllPosts,
} = require("../controllers/postController");
const postRouter = express.Router();

postRouter.get("/", getAllPosts);

postRouter.post("/:userId", createPost);

module.exports = postRouter;