import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "../css/scroll.css";
import Task from "./Task";
import "../css/Column.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Column({ title, tasks, id }) {

  return (
    <div className="column">
      {/* Column title */}
      <h4 className="column-title">{title}</h4>
      <div className="column-content">
        <Droppable droppableId={id}>
          {(provided, snapshot) => (
            <div
              className="column-taskList"
              ref={provided.innerRef}
              {...provided.droppableProps}
              isdraggingover={snapshot.isdraggingover}
            >
              {/* Tasks */}
              {tasks.map((task, index) => (
                <Task key={index} index={index} task={task} />
              
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        

        <Link to="/addtodo" className="text-center">
        <Button variant="success" className="column__addcardbtn">
        {tasks.length === 0 ? "+ Add Card" : "+ Add Another Card"}
        </Button>{" "}     </Link>
      </div>
    </div>
  );
}
