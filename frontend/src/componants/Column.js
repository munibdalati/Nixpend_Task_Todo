import React from "react";
import { Droppable } from "react-beautiful-dnd";
import "../css/scroll.css";
import Task from "./Task";
import "../css/Column.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Column({ title, tasks, id, taskCount }) {
  return (
    <div className="column">
      {/* Column title */}
      <div className="column-title d-flex justify-content-between pt-3 px-3">
        <h4 className="">{title}</h4>
        <h6 className="border px-3 py-2 rounded-circle bg-success text-white">{taskCount}</h6>


      </div>

      {/* Column content */}
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

        {/* Add Card button */}
        <Link to="/addtodo" className="text-center">
          <Button variant="success" className="column__addcardbtn">
            {tasks.length === 0 ? "+ Add Card" : "+ Add Another Card"}
          </Button>{" "}
        </Link>
      </div>
    </div>
  );
}
