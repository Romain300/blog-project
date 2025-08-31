const { body, validationResult } = require('express-validator');
const db = require('../db/queries');
const bcrypt = require('bcryptjs');

const validateUser = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name cannot be empty'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password cannot be empty'),
    body('cpassword')
        .trim()
        .notEmpty()
        .withMessage('Confirm password cannot be empty')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password and Confirm password must match');
            }
            return true;
        })
];


const createUser = [
    validateUser,

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            console.log('Creating new user');
            const { name, password } = req.body;
            const email = req.body.email.trim().toLowerCase();
            const userExist = await db.getUserByEmail(email);
            if (userExist) {
                return res.status(400).json({
                    errors: [{ msg: 'Email already used '}]
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await db.createUser(name, email, hashedPassword);
            console.log('New user has been created');
            return res.status(201).json({
                message: 'User created successfully',
                user: { id: newUser.id, name: newUser.name, email: newUser.email }
            })
        }catch (error) {
            console.error(error);
            return res.status(500).json({ errorMessage: 'something went wrong during user creation' });
        }
    }
];

module.exports = {
    createUser
};

