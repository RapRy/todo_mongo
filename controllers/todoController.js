const Todo = require('../models/todo')

const Todos = (req, res) => {
    Todo.find({isDone: false}).sort({createdAt: -1})
        .then(result => {

            let newTodos = []

            result.forEach(({ _id, todo, isDone, createdAt }, i) => {
                let hours = createdAt.getHours()
                let minutes = createdAt.getMinutes()
                let ampm = hours >= 12 ? 'PM' : 'AM'
                let month = createdAt.getMonth()
                let day = createdAt.getDate()
                let year = createdAt.getFullYear()
                let date = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

                hours = hours % 12;
                hours = hours ? hours : 12

                let newDate = `${date[month]} ${day}, ${year} | ${hours}:${minutes} ${ampm}`

                newTodos.push({_id, todo, isDone, newDate})
            })

            res.render('index', { title: "Todos", todos: newTodos })
        })
        .catch(err => {
            console.log(err)
        })
}

const CompletedTodos = (req, res) => {
    Todo.find({isDone: true}).sort({updatedAt: -1})
        .then(result => {
            let newTodos = []

            result.forEach(({ _id, todo, isDone, updatedAt }, i) => {
                let hours = updatedAt.getHours()
                let minutes = updatedAt.getMinutes()
                let ampm = hours >= 12 ? 'PM' : 'AM'
                let month = updatedAt.getMonth()
                let day = updatedAt.getDate()
                let year = updatedAt.getFullYear()
                let date = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

                hours = hours % 12;
                hours = hours ? hours : 12

                let newDate = `${date[month]} ${day}, ${year} | ${hours}:${minutes} ${ampm}`

                newTodos.push({_id, todo, isDone, newDate})
            })            

            res.render('completed', { title: "Completed", todos: newTodos })
        })
        .catch(err => console.log(err))
}

const AddTodo = (req, res) => {
    const todo = new Todo(req.body)

    todo.save()
        .then(result => {
            res.redirect('/')
        })
        .catch(err => {
            console.log(err)
        })
}

const MarkTodo = (req, res) => {
    const id = req.params.id

    Todo.findByIdAndUpdate(id, { isDone: true })
        .then(result => {
            res.json({redirect: '/'})
        })
        .catch(err => {
            console.log(err)
        })
}

const DeleteTodo = (req, res) => {
    const id = req.params.id

    Todo.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/'})
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    Todos,
    CompletedTodos,
    AddTodo,
    MarkTodo,
    DeleteTodo
}