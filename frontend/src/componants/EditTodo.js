import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../css/AddToDo.css";

function EditToDo(task) {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progressBar, setProgressValue] = useState(0);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/todo/todolist/" + id)
      .then((result) => {
        console.log("Fetched data:", result.data.data.todo);

        const taskData = result.data.data.todo;
        setTitle(taskData.title);
        setDescription(taskData.description);
        setProgressValue(taskData.progressBar);
        setStatus(taskData.status);
      })
      .catch((err) => console.log(err));
  }, []);

  const UpdateTodo = (e) => {
    e.preventDefault();
    console.log("UpdateTodo function executed!"); 

    axios
      .put("http://localhost:5000/api/todo/updatetodo/" + id, {
        title,
        description,
        progressBar,
        status,
      })
      .then((result) => {
        console.log(result);
          
        navigate("/"); 
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center pt-5">
      <Form className="w-50" onSubmit={UpdateTodo}>
        <h2 className="text-center">Edit your Todo</h2>
        {/* title */}
        <Form.Group controlId="taskTitle" className="mb-4">
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        {/* Description */}
        <Form.Group controlId="taskDescription" className="mb-4">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        {/* here add subtasks */}
        {/* Progress Bar */}
        <div className="mb-4">
          <Form.Label>Progress:</Form.Label>
          <ProgressBar now={progressBar} label={`${progressBar}%`} />
        </div>
        <Form.Group controlId="editProgress" className="mb-4">
          <Form.Control
            type="number"
            min="0"
            max="100"
            value={progressBar}
            onChange={(e) => setProgressValue(parseInt(e.target.value))}
          />
        </Form.Group>
        {/* Status */}
        <Form.Select
          aria-label="Default select example"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Todo Status</option>
          <option value="1">todo</option>
          <option value="2">doing</option>
          <option value="3">done</option>
        </Form.Select>
        <div class="d-flex justify-content-center align-items-center mt-4 gap-4">
          <Button variant="success" type="submit">
            Submit Changes
          </Button>{" "}

        </div>
      </Form>
    </Container>
  );
}

export default EditToDo;
