import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import TaskSheduler from "./components/Automated scheduling/pages/TaskScheduler";
import TaskPreview from "./components/Automated scheduling/pages/TaskPreview";
import TaskDetails from "./components/Automated scheduling/pages/TaskDetails";

function App() {
  return (
    <Router>
      <Sidebar>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/add-task" element={<TaskSheduler />} />
          <Route path="/show-tasks" element={<TaskPreview />} />
          <Route path="/tasks/:id" element={<TaskDetails />} />
        </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
