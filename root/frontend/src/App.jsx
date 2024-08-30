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
          <Route path="/task/add" element={<TaskSheduler />} />
          <Route path="/task/showAll" element={<TaskPreview />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
