import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Newrepo from "./pages/Newrepo";
import Createrepo from "./pages/Createrepo";
import Displayproj from "./pages/Displayproj";
import Repodashboard from "./pages/Repodashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 bg-gray-100 transition-all duration-300">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="text-2xl font-bold">Main Content Area</h1>
                </div>
              }
            />
            <Route path="/newrepo" element={<Newrepo />} />
            <Route path="/createrepo" element={<Createrepo />} />
            <Route path="/displayproj" element={<Displayproj/>} />
            <Route path="/repodashboard" element={<Repodashboard/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
