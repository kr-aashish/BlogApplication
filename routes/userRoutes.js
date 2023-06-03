const express = require('express');
const { signup, login, updateUser, getAllUsers} = require('../controllers/userController');
const {verifyToken} = require("../jwtAuth");
const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/login', login)

userRouter.put('/:userId', verifyToken, updateUser);

module.exports = userRouter;