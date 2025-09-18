import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import "./index.css";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<TaskList />} />
        </Routes>
      </Router>
  );
}

export default App;
