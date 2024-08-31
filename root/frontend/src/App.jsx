import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import TaskSheduler from "./components/Automated scheduling/pages/TaskScheduler";
import TaskPreview from "./components/Automated scheduling/pages/TaskPreview";
import TaskDetails from "./components/Automated scheduling/pages/TaskDetails";
import StatusPage from "./components/Analyz result/pages/StatusPage";

function App() {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route path="/task/add" element={<TaskSheduler />} />
          <Route path="/task/showAll" element={<TaskPreview />} />
          <Route path="/task/:id" element={<TaskDetails />} />
          <Route path="/analize/task/status" element={<StatusPage />} />
        </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
