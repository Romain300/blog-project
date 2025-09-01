const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();

const validateUser = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('Password cannot be empty')
];

const logInUser = [
    validateUser,

    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                return res.status(400).json({
                    errors: [{ msg: info.message }]
                });
            }

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });
            return res.status(200).json({
                token,
                user: { email: user.email, name: user.name },
                message: 'Auth Passed'
            });
        })(req, res, next);
    }
];

module.exports = {
    logInUser
};