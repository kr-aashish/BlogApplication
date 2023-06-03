const express = require("express");
const {
    createPost,
    getAllPosts,
} = require("../controllers/postController");
const {verifyToken} = require("../jwtAuth");
const postRouter = express.Router();

postRouter.get("/", verifyToken, getAllPosts);

postRouter.post("/:userId", verifyToken, createPost);

module.exports = postRouter;