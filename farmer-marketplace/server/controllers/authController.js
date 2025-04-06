// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const register = async (req, res) => {
//     const { name, email, password, isFarmer } = req.body;
//     try {
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const user = new User({ name, email, password: hashedPassword, isFarmer });
//         await user.save();
//         res.status(201).json({ message: 'User registered' });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// const login = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const user = await User.findOne({ email });
//         if (!user) return res.status(404).json({ message: 'User not found' });
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//         res.status(200).json({ token, user });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// };

// module.exports = { register, login };


// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// require('dotenv').config();

// // User Registration
// const registerUser = async (req, res) => {
//     const { name, email, password, isFarmer } = req.body;
//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) return res.status(400).json({ message: 'User already exists.' });

//         const hashedPassword = await bcrypt.hash(password, 12);
//         const newUser = new User({ name, email, password: hashedPassword, isFarmer });

//         await newUser.save();
//         res.status(201).json({ message: 'User registered successfully.' });
//     } catch (error) {
//         console.error('Error during registration:', error);
//         res.status(500).json({ message: 'Something went wrong. Please try again later.' });
//     }
// };

// // User Login
// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
//     try {
//         const existingUser = await User.findOne({ email });
//         if (!existingUser) return res.status(404).json({ message: 'User not found.' });

//         const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
//         if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials.' });

//         const token = jwt.sign(
//             { id: existingUser._id, isFarmer: existingUser.isFarmer },
//             process.env.JWT_SECRET,
//             { expiresIn: '1h' }
//         );

//         res.status(200).json({ token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).json({ message: 'Something went wrong. Please try again later.' });
//     }
// };

// module.exports = { registerUser, loginUser };


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET || 'default-secret-key'; // Fallback for development

// User Registration
const registerUser = async (req, res) => {
    const { name, email, password, isFarmer } = req.body;

    console.log('Registration attempt with data:', { name, email, isFarmer });

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log(`Registration failed: User with email ${email} already exists.`);
            return res.status(400).json({ message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            isFarmer,
        });

        await newUser.save();
        console.log(`Registration successful for user: ${email}`);
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error.message);
        console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
        res.status(500).json({ message: 'Something went wrong. Please try again later.', error: error.message });
    }
};

// User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            console.log(`Login failed: User with email ${email} not found.`);
            return res.status(404).json({ message: 'User not found.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            console.log(`Login failed: Incorrect password for user ${email}`);
            return res.status(400).json({ message: 'Invalid credentials.' });
        }

        const token = jwt.sign(
            { id: existingUser._id, isFarmer: existingUser.isFarmer },
            jwtSecret,
            { expiresIn: '1h' }
        );

        console.log(`Login successful for user: ${email}`);
        res.status(200).json({
            token,
            user: {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                isFarmer: existingUser.isFarmer,
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};

module.exports = { registerUser, loginUser };
