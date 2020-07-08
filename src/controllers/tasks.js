const db = require("../data/db")
const { v4: uuidv4 } = require('uuid')

exports.fetchTasksByUser = (req, res, next) => {
    const userId = req.params.userId
    
    return res.status(200).json(
        db.tasks.filter(
            function (task)  {
                return task.userId == userId
            }
        )
    )
}

exports.createTask = (req, res, next) => {
    const task = {
        id : uuidv4(),
        userId : req.params.userId,
        title : req.body.title,
        completed: req.body.completed
    }
    db.tasks.push(task)
    return res.status(201).json(task)
}

exports.updateTask = (req, res, next) => {
    const userId = req.params.userId
    const id = req.params.id

    const task = db.tasks.find(
        (t) => {
            return t.userId == userId && t.id == id
        }
    )

    if(task != null){
        const newTask = {
            id : req.params.id,
            userId : req.params.userId,
            title : req.body.title,
            completed: req.body.completed        
        }
        db.tasks.splice(db.tasks.indexOf(task), 1, newTask)
        return res.status(200).json(newTask)
    }else{
        return res.status(404).json(
            { message: 'Task doesn\'t exists in database' }
        )
    }
}

exports.deleteTask = (req, res, next) => {
    const userId = req.params.userId
    const id = req.params.id
    
    const task = db.tasks.find(
        (t) => {
            return t.userId == userId && t.id == id
        }
    )

    if(task != null){
        db.tasks.splice(db.tasks.indexOf(task), 1)
        return res.status(200).json(
            { message: 'Exclusion performed' }
        )
    }
    
    return res.status(404).json(
        { message: 'Task doesn\'t exists' }
    )
}