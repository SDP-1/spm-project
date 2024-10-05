import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  
  if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
      return <Navigate to="/" replace />;
  }

  return children;
};


// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
const { isAuthenticated } = useAuthStore();

if (isAuthenticated) {
  return <Navigate to="/" replace />;
}

return children;
};


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

      <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboardPage />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* catch all routes */}
        <Route path="*" element={<Navigate to="/" replace />} />

    </Router>
  );
}

export default App;
