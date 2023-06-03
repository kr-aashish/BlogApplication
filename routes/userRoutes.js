const express = require('express');
const { signup, login, updateUser, getAllUsers} = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/login', login)

userRouter.put('/:userId', updateUser);

userRouter.get('/all', getAllUsers)

module.exports = userRouter;