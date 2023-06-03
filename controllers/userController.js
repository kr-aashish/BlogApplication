const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/userSchema');

const signup = async (req, res) => {
    try {
        const { name, email, password, age} = req.body;

        // Check if user with the same email already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            age
        });

        // Set response headers
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.status(201).json({
            message: 'User created successfully',
            data: {
                email: user.email,
                id: user._id,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user with the provided email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT access token
        const accessToken = jwt.sign({ userId: user._id },
            process.env.ACCESS_TOKEN_KEY,
            { expiresIn: '1h' });

        // Generate a JWT refresh token
        const refreshToken = jwt.sign({ userId: user._id },
            process.env.REFRESH_TOKEN_KEY,
            { expiresIn: '7d' });

        // Set response headers
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.status(200).json({
            message: 'Login successful',
            accessToken,
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, age } = req.body;
        const userId = req.params.userId;
        const filter = { _id: mongoose.Types.ObjectId(userId) };
        const update = { name, age };
        const options = { new: true };

        const updatedUser = await UserModel.findOneAndUpdate(filter, update, options);

        if (updatedUser) {
            // Set response headers
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Cache-Control', 'no-store');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');

            res.json({
                message: 'User updated successfully',
                data: updatedUser,
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserModel.find({});

        // Set response headers
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-store');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

const refreshTokens = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        // Verify the refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid refresh token' });
            }

            // Generate a new access token
            const accessToken = jwt.sign({ userId: decoded.userId },
                process.env.ACCESS_TOKEN_KEY, {
                    expiresIn: '1h' });

            res.json({
                accessToken,
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { signup, login, updateUser, getAllUsers, refreshTokens };
