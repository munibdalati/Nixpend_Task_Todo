import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import "../css/Task.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  background-color: ${(props) => bgcolorChange(props)};
`;
//Control the color of task when dragging it
function bgcolorChange(props) {
  return props.isdragging
    ? "lightgreen"
    : "#fffada";
}
 function Task({ task, index }) {

  //deleting the task
  const deleteTodo = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete ${title}`)) {
      try {
        await axios.delete("/api/todo/deletetodo/" + id, {
          data: { todoId: id },
        });
        window.location.reload();
        console.log("deleted successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Draggable draggableId={`${task._id}`} key={task._id} index={index}>
      {(provided, snapshot) => (
        <Container
          className="task__container d-flex flex-column"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={snapshot.isdragging}
        >
          <div className="d-flex justify-content-between">
            {/* task title */}
            <h5 className="task__title">{task.title}</h5>

            {/* progress value */}
            <h6 className="">{task.progressBar}%</h6>
          </div>

          {/* descrption */}
          <div className="mt-2">{task.description}</div>

          <div className="d-flex justify-content-end">
            {/* Edit button */}
            <Link to={`/edittodo/${task._id}`} className="text-decoration-none">
              <Button variant="warning" className="m-1">
                Edit
              </Button>{" "}
            </Link>
            {/* Delete button */}
            <Button
              variant="danger"
              className="m-1"
              onClick={() => deleteTodo(task._id, task.title)}
            >
              Delete
            </Button>{" "}
          </div>

          {provided.placeholder}
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
