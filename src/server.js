require('dotenv').config({path: 'src/process.env'})
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const router = require('./routes/router.js')
const app = express()

const PORT = process.env.PORT

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization")
    app.use(cors());
    next();
});

app.get("/", function(req, res, next){
    res.status(200).send("Server is running!")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.use(cookieParser())
app.use(router)

app.listen(PORT, () => {
    console.log("Server is running at localhost:" + PORT)
})