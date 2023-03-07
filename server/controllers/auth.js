const User = require('../models/user');
const jwttoken = require('jsonwebtoken');
var { expressjwt: jwt } = require("express-jwt");



const signin = async (req, res) => {

    try {

        let user = await User.findOne({ email: req.body.email })
        // console.log(req.body);
        if (!user) {
            throw new Error('user not found');
        }
        if (!user.authenticate(req.body.password)) {
            throw new Error("Email and password don't match.");
        }

        const token = jwttoken.sign({
            _id: user._id,
        }, process.env.JWT_SECRET)

        res.cookie('token', token, {
            maxAge: 86400000

        })



        return res.json({
            token,
            user: { _id: user._id, username: user.username, email: user.email },
            message: "login successfully"
        })
    } catch (err) {
        res.send({ message: 'something went wrong' });
    }
}

const signout = (req, res) => {
    res.clearCookie("token")
    return res.status(200).json({
        message: "signed out"
    })
}

const requireSignin = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
    algorithms: ["HS256"]
})

const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
        return res.status(403).json({
            error: "User is not authorized"
        })
    }
    next()
}

module.exports = {
    signin,
    signout,
    requireSignin,
    hasAuthorization
}
