import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Newrepo from "./pages/Newrepo";
import Createrepo from "./pages/Createrepo";
import Displayproj from "./pages/Displayproj";
import Repodashboard from "./pages/Repodashboard";
import AnalyticsChart from "./pages/AnalyticsChart";

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

          <Route path="/newrepo/:projectId" element={<Newrepo />} />
          <Route path="/createrepo" element={<Createrepo />} />
          <Route path="/displayproj" element={<Displayproj />} />
          <Route path="/repodashboard" element={<Repodashboard />} />
          <Route path="/analytics" element={<AnalyticsChart />} />

        </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
