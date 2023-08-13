import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import Button from "react-bootstrap/Button";
import axios from "axios";

function KanbanBoard() {
  const [incomplete, setIncomplete] = useState([]);
  const [doing, setDoing] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [data, setData] = useState([]);


  const getTasks = () => {
    axios
      .get("/api/todo/todolist")
      .then((response) => {
        const jsonData = response.data.data.ToDos; // Extract ToDos array from the response
        setData(jsonData);
        setIncomplete(jsonData.filter((data) => data.status === 1));
        setDoing(jsonData.filter((data) => data.status === 2));
        setCompleted(jsonData.filter((data) => data.status === 3));
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  console.log(data);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

    //REMOVE FROM SOURCE ARRAY

    if (source.droppableId == 3) {
      setCompleted(removeItemById(draggableId, completed));
    } else if (source.droppableId == 2) {
      setDoing(removeItemById(draggableId, doing));
    } else {
      setIncomplete(removeItemById(draggableId, incomplete));
    }

    // GET ITEM

    const task = findItemById(draggableId, [
      ...incomplete,
      ...doing,
      ...completed,
    ]);

    //ADD ITEM
    if (destination.droppableId == 3) {
      setCompleted([{ ...task, status: 3 }, ...completed]);
    } else if (destination.droppableId == 2) {
      setDoing([{ ...task, status: 2 }, ...doing]);
    } else {
      setIncomplete([{ ...task, status: 1 }, ...incomplete]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item._id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item._id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd} >
      <h2 className="text-center py-4">Progress Board</h2>
      <div className="d-flex justify-content-center align-items-start">
        {/* Columns */}
        <div className="d-flex justify-content-center align-items-start">
          <Column title={"To-do"} tasks={incomplete} id={"1"} />
          <Column title={"Doing"} tasks={doing} id={"2"} />
          <Column title={"Done"} tasks={completed} id={"3"} />
          {/* You can add more columns here */}
        </div>
        {/* Add list button */}
        <Button variant="success" className="board__addList">
          Add another list
        </Button>{" "}

      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;
