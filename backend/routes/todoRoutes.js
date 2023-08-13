const express = require("express");
const router = express.Router();
const todoController = require('../controllers/todoController');

// ----------------- get all to do route -----------------
router.get('/todolist', todoController.getAllToDos);

// ----------------- create to do route -----------------
router.post('/createtodo', todoController.createToDo);

// ----------------- delete to do route -----------------
router.delete('/deletetodo/:id', todoController.deleteToDo);

// ----------------- update to do route -----------------
router.put('/updatetodo/:id', todoController.updateToDo);

// ----------------- get to do by id -----------------
router.get('/todolist/:id', todoController.getToDo);

module.exports = router;

