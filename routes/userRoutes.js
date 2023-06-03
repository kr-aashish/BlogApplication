const express = require('express');
const { signup, login, updateUser, refreshTokens} = require('../controllers/userController');
const {verifyToken} = require("../jwtAuth");
const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/login', login);

userRouter.put('/:userId', verifyToken, updateUser);

userRouter.post('/refresh', refreshTokens)

module.exports = userRouter;