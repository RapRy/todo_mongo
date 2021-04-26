const express = require('express')

const router = express.Router()

const { Todos, CompletedTodos, AddTodo, MarkTodo, DeleteTodo } = require('../controllers/todoController.js')

router.get('/', Todos)

router.get('/CompletedTodos', CompletedTodos)

router.post('/', AddTodo)

router.put('/:id', MarkTodo)

router.delete('/:id', DeleteTodo)

module.exports = router