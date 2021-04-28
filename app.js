const express = require('express')
const mongoose = require('mongoose')

const todoRoutes = require('./routes/todoRoutes')
const dotenv = require('dotenv')


const app = express()
dotenv.config()

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DBURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((res) => app.listen(PORT, () => console.log('server listening at port '+ PORT)))
    .catch(err => console.log(err))

app.set('view engine', 'ejs')

//middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended:true }))

// routes
app.use('/', todoRoutes)
