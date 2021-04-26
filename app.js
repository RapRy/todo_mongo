const express = require('express')
const mongoose = require('mongoose')

const todoRoutes = require('./routes/todoRoutes')


const app = express()

// const dbURI = "mongodb+srv://testUser:test123@cluster0.vu7xx.mongodb.net/TestingDB"
const dbURI = "mongodb://testUser:test123@cluster0-shard-00-00.vu7xx.mongodb.net:27017,cluster0-shard-00-01.vu7xx.mongodb.net:27017,cluster0-shard-00-02.vu7xx.mongodb.net:27017/TestingDB?ssl=true&replicaSet=atlas-5qniev-shard-0&authSource=admin&retryWrites=true&w=majority"

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .catch(err => console.log(err))

app.set('view engine', 'ejs')

//middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))

// routes
app.use('/', todoRoutes)


app.listen(3000, () => console.log('server listening at port 3000'))