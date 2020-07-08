const db = require("../data/db")
const { v5: uuidv5 } = require('uuid');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

exports.fetchUserById = (req, res, next) => {
    const id = req.params.id
    const user = db.users.find((user) => { return user.id == id })
    if(user != null){
        return res.status(200).json(user.username)
    }else{
        return res.status(404).json({ message: "User doesn't exists in database" })
    }
}

exports.fetchUsers = (req, res, next) => {
    return res.status(200).json(db.users)
}

exports.fetchUser = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    let hash = bcrypt.hashSync(password, salt)
    const user = db.users.find((user) => { return user.username == username && user.password == hash})
    if(user != null){
        const token = jwt.sign({username: user.username, password: password}, process.env.SECRET_API, {
            expiresIn: 600
        })
        return res.status(200).json({ auth: true, token: token, id: user.id })
    }
    return res.status(401).json({ auth: false, message : "Invalid login!" })
}

exports.createUser = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    const name_space = '1b671a64-40d5-491e-99b0-da01ff1f3341'
    
    if(username != null || password != null){
        let encrypitedPassword = bcrypt.hashSync(password, salt)
        const user = {
            id : uuidv5(req.body.username, name_space),
            username : username,
            password : encrypitedPassword,
        }
        db.users.push(user)
        const token = jwt.sign({username: user.username, password: password}, process.env.SECRET_API, {
            expiresIn: 600
        })
        return res.status(201).json({ auth: true, token: token, id: user.id })
    }
    return res.status(401).json({ auth: false, message : "Username or password invalid!" })
}

exports.deleteUser = (req, res, next) => {
    const id = req.params.id
    const user = db.users.find(
        (u) => {
            return u.id == id
        }
    )

    if(user != null){
        db.users.splice(db.users.indexOf(user), 1)
        
        return res.status(200).json(
            { message: 'Exclusion performed' }
        )  
    }
    
    return res.status(404).json(
        { message: 'Task doesn\'t exists' }
    )
}