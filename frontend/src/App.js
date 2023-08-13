import AddTodo from "./componants/AddTodo";
import KanbanBoard from "./componants/KanbanBoard";
import EditTodo from "./componants/EditTodo";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<KanbanBoard />} />
          <Route path="/addtodo" element={<AddTodo />} />
          <Route path="/edittodo/:id" element={<EditTodo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
