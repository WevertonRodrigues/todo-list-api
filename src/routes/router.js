const { fetchTasksByUser, createTask, updateTask, deleteTask } = require("../controllers/tasks")

const { fetchUserById, fetchUsers, fetchUser, createUser, deleteUser } = require("../controllers/users")

const { checkFieldsTaskExists, verifyJWT } = require("../middlewares/middlewares")

const express = require('express')

const router = express.Router()

//Tasks routes
router.get("/api/:userId/tasks", verifyJWT, fetchTasksByUser)

router.post("/api/:userId/tasks", verifyJWT, createTask)

router.put("/api/:userId/tasks/:id", verifyJWT, updateTask)

router.delete("/api/:userId/tasks/:id", verifyJWT, deleteTask)

//Users routes
router.get("/api/:id", verifyJWT, fetchUserById)

router.get("/api/", fetchUsers)

router.post("/api/login", fetchUser)

router.post("/api/signup", createUser)

router.delete("/api/:id", deleteUser)

module.exports = router