const { json } = require("body-parser")
const jwt = require('jsonwebtoken')

exports.checkFieldsTaskExists = (req, res, next) => {
    console.log(req.body)
    if(!req.body.title){
        return res.status(400).json({message: 'Title is required'})
    }
    return next()
}

exports.verifyJWT = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_API)
        next()
    } catch(err){
        return res.status(400).json({auth: false, message : 'Token is invalid.'})    
    }
}