import { React, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import { useAuthStore } from "./store/authStore";
import FloatingShape from "./components/User/FloatingShape";
import LoadingSpinner from "./components/User/LoadingSpinner";

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

// Redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-emerald-900 flex items-center justify-center relative overflow-hidden">
        <FloatingShape color="bg-blue-500" size="w-64 h-64" top="-5%" left="10%" delay={0} />
        <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="70%" left="80%" delay={5} />
        <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="-10%" delay={2} />

        <Routes>
          {/* Public Routes */}
          <Route path="/signup" element={<RedirectAuthenticatedUser><SignUpPage /></RedirectAuthenticatedUser>} />
          <Route path="/login" element={<RedirectAuthenticatedUser><LoginPage /></RedirectAuthenticatedUser>} />
          <Route path="/forgot-password" element={<RedirectAuthenticatedUser><ForgotPasswordPage /></RedirectAuthenticatedUser>} />
          <Route path="/reset-password/:token" element={<RedirectAuthenticatedUser><ResetPasswordPage /></RedirectAuthenticatedUser>} />

          {/* Protected Routes with Sidebar */}
          <Route path="/" element={<ProtectedRoute><Sidebar><DashboardPage /></Sidebar></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Sidebar><ProfilePage /></Sidebar></ProtectedRoute>} />
          <Route path="/task/add" element={<ProtectedRoute><Sidebar><TaskSheduler /></Sidebar></ProtectedRoute>} />
          <Route path="/task/showAll" element={<ProtectedRoute><Sidebar><TaskPreview /></Sidebar></ProtectedRoute>} />
          <Route path="/task/:id" element={<ProtectedRoute><Sidebar><TaskDetails /></Sidebar></ProtectedRoute>} />
          <Route path="/analize/task/status" element={<ProtectedRoute><Sidebar><StatusPage /></Sidebar></ProtectedRoute>} />
          <Route path="/newrepo/:projectId" element={<ProtectedRoute><Sidebar><Newrepo /></Sidebar></ProtectedRoute>} />
          <Route path="/createrepo" element={<ProtectedRoute><Sidebar><Createrepo /></Sidebar></ProtectedRoute>} />
          <Route path="/displayproj" element={<ProtectedRoute><Sidebar><Displayproj /></Sidebar></ProtectedRoute>} />
          <Route path="/repodashboard" element={<ProtectedRoute><Sidebar><Repodashboard /></Sidebar></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Sidebar><AnalyticsChart /></Sidebar></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminProtectedRoute><Sidebar><AdminDashboardPage /></Sidebar></AdminProtectedRoute>} />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
