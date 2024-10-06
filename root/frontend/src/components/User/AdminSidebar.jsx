import { useState, createContext, useContext } from "react";
import { FaHome, FaSignOutAlt, FaQuestionCircle } from "react-icons/fa";
import { MdDownload, MdChevronLeft, MdChevronRight } from "react-icons/md";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const SidebarContext = createContext();

export default function AdminSidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  // Handle logout
  const handleLogout = () => {
    // Perform logout logic here (e.g., clearing tokens, session, etc.)
    logout();  // Call your logout function here
    navigate('/login');  // Redirect user to login page after logout
  };

  // Handle download user reports
  const handleDownloadUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/download-users",
        {
          responseType: "blob", // Important for handling binary data
        }
      );

      // Create a URL for the blob response
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users_report.csv"); // Change file name if needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading users:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <aside
        className={`fixed top-0 left-0 h-full transition-all duration-300 ${
          expanded ? "w-[250px]" : "w-[80px]"
        } bg-white border-r shadow-sm z-50`}
      >
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={logo}
              className={`overflow-hidden transition-all duration-300 ${
                expanded ? "w-20" : "w-0"
              }`}
              alt="Logo"
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <MdChevronLeft size={24} /> : <MdChevronRight size={24} />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 space-y-2">
              <SidebarItem icon={<FaHome />} text="Home" to="/admin/home" />
              <SidebarItem
                icon={<MdDownload />}
                text="Download User Reports"
                onClick={handleDownloadUsers} // Attach download handler
              />
              <SidebarItem
                icon={<FaSignOutAlt />}
                text="LogOut"
                onClick={handleLogout} // Attach logout handler
              />
            </ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img src={profile} className="w-10 h-10 rounded-md" alt="Profile" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all duration-300 ${
                expanded ? "w-full ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">Admin</h4>
                <span className="text-xs text-gray-600">admin@example.com</span>
              </div>
              <div className="flex items-center">
                <FaQuestionCircle size={20} />
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <main
        className={`flex-1 transition-all duration-300 ${
          expanded ? "ml-[250px]" : "ml-[80px]"
        } bg-gray-100`}
      >
        {children}
      </main>
    </div>
  );
}

export function SidebarItem({ icon, text, active, to, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the passed onClick handler if it exists
    } else {
      navigate(to); // Otherwise, navigate to the given route
    }
  };

  return (
    <li
      onClick={handleClick}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "w-full ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </li>
  );
}
