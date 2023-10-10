const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'});
}

// login user
const loginUser = [
    body("email", "Email cannot be empty")
        .trim()
        .notEmpty()
        .escape(),
    body("password", "Password cannot be empty")
        .trim()
        .notEmpty()
        .escape(),
    async (req, res) => {
        const {email, password} = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(400).json({errors: errors.array()});
            return;
        } 
        
        try {
            const user = await User.login(email, password);
        
            // create a token
            const token = createToken(user._id);
        
            res.status(200).json({email, token});
        } catch(err) {
            res.status(400).json({errors: [{msg: err.message}]});
        }
    }
]

// signup user
const signupUser = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email cannot be empty")
        .isEmail()
        .withMessage("Email isn't valid")
        .escape(),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("Password cannot be empty")
        .isStrongPassword({
            minLength: 8, 
            minLowercase:1, 
            minUppercase: 1, 
            minNumbers:1,
            minSymbols: 1,
        })
        .withMessage("Password must be at least 8 characters long and have at least " + 
        "one lowercase and uppercase letter, a number and a symbol.")
        .escape(),
    async (req, res) => {
        // const {email, password} = req.body;
        // const errors = validationResult(req);

        // if (!errors.isEmpty()) {
        //     res.status(400).json({errors: errors.array()});
        //     return;
        // } 
        
        // try {
        //     const user = await User.signup(email, password);
        
        //     // create a token
        //     const token = createToken(user._id);
        
        //     res.status(200).json({email, token});
        // } catch(err) {
        //     res.status(400).json({errors: [{msg: err.message}]});
        // }

        res.status(400).json({error: "Signing up disabled"});

    }
]

module.exports = { signupUser, loginUser };