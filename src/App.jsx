import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import "./index.css";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<TaskList />} />
          {/* You can add more routes later like CreateTaskPage, ApiTest etc. */}
        </Routes>
      </Router>
  );
}

export default App;
