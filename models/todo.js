const mongoose = require('mongoose')
const { Schema, model } = mongoose

const todosSchema = new Schema({
    todo: {
        type:String,
        required:true
    },
    isDone: {
        type:Boolean,
        required:true
    }
}, {timestamps: true})

const Todo = model('todo', todosSchema)
module.exports = Todo