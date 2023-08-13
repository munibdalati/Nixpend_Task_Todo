const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creating the schema (how data is arranged in the database)
const ToDoSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    subtasks: {
      type: String,
    },
    progressBar: {
      type: Number,
    },
    status: {
      type: Number,
      required: [true, "Please provide the task status"],
    },
  },
  { timestamps: true }
);

ToDoSchema.statics.addToDo = async function (
  title,
  description,
  subtasks,
  progressBar,
  status
) {
  // validation
  if (!title || !description || !progressBar || !status) {
    throw Error("All fields must be filled");
  }

  const ToDo = await this.create({
    title,
    description,
    subtasks,
    progressBar,
    status,
  });

  return ToDo;
};

module.exports = mongoose.model("ToDo", ToDoSchema);
