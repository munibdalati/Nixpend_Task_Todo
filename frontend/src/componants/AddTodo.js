import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/AddToDo.css";

function AddTodo() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [progressValue, setProgressValue] = useState(0); // Initial progress value
  const [status, setStatus] = useState("todo");
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const addingTask = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      await axios.post(
        "/api/todo/createtodo",
        { title, description, progressBar: progressValue, status },
        config
      );
      console.log("Form submission successful")
      navigate("/");
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.error);
    }

  };

  return (
    <Container className="d-flex justify-content-center align-items-center pt-5">
      <Form className="w-50" onSubmit={addingTask}>
        <h2 className="text-center">Adding New Todo</h2>
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
          <ProgressBar now={progressValue} label={`${progressValue}%`} />
        </div>
        <Form.Group controlId="editProgress" className="mb-4">
          <Form.Control
            type="number"
            min="0"
            max="100"
            value={progressValue}
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
        <div class="d-flex justify-content-center align-items-center mt-4">
        <Button variant="success" type="submit" className="">
          Add
        </Button>{" "}
        </div>
        
      </Form>
    </Container>
  );
}

export default AddTodo;
