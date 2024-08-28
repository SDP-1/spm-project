import React from "react";
import TaskManager from "./components/Automated scheduling/TaskManager";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    // <div className="container mx-auto p-4">
    //   {/* <h1 className="text-2xl font-bold mb-4">Item Manager</h1> */}
    //   <Sidebar>
    //     <TaskManager />
    //   </Sidebar>
    // </div>

    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100 transition-all duration-300">
        <h1 className="text-2xl font-bold">Main Content Area</h1>
      </main>
    </div>
  );
}

export default App;
