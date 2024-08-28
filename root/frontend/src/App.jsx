// import React from "react";
// import TaskManager from "./components/Automated scheduling/TaskManager";
// import Sidebar from "./components/Sidebar";

// function App() {
//   return (
//     // <div className="container mx-auto p-4">
//     //   {/* <h1 className="text-2xl font-bold mb-4">Item Manager</h1> */}
//     //     <TaskManager />

//     // </div>

//     <div className="flex">
//       <Sidebar />
//       <main className="flex-1 p-4 bg-gray-100 transition-all duration-300">
//         {/* <h1 className="text-2xl font-bold">
//           Main Content Area
//           </h1> */}
//         <TaskManager />
//       </main>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import TaskSheduler from "./components/Automated scheduling/pages/TaskScheduler";
import TaskPreview from "./components/Automated scheduling/pages/TaskPreview";

function App() {
  return (
    <Router>
      <Sidebar>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/add-task" element={<TaskSheduler />} />
          <Route path="/show-tasks" element={<TaskPreview />} />
        </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
