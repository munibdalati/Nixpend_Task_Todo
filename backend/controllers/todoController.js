const ToDo = require("../models/ToDos");

// getAllToDos
exports.getAllToDos = async (req, res) => {
  try {
    const ToDos = await ToDo.find();
    res.status(200).json({
      status: "success",
      results: ToDos.length,
      data: {
        ToDos,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

//createToDo
exports.createToDo = async (req, res) => {
  const { title, description, subtasks, progressBar, status } = req.body;

  try {
    // Check if a todo with the same title already exists
    const existingTodo = await ToDo.findOne({ title });

    if (existingTodo) {
      return res.status(409).json({
        status: "fail",
        message: "A todo with the same title already exists.",
      });
    }
    const todo = await ToDo.addToDo(
      title,
      description,
      subtasks,
      progressBar,
      status
    );
    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(400).json({ status: "fail", error: error.message });
  }
};

// updateToDo
exports.updateToDo = async (req, res) => {
  try {
    const todo = await ToDo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

// deleteToDo
exports.deleteToDo = async (req, res) => {
  try {
    await ToDo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "To do deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

// getToDo
exports.getToDo = async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};
