import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import axios from "axios";

const AdminDashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user for editing
  const [newRole, setNewRole] = useState(""); // Store new role for editing
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogout = () => {
    logout();
  };

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = () => {
    navigate("/add-user");
  };

  const handleEditUser = (user) => {
    setSelectedUser(user); // Open the modal and set the selected user
    setNewRole(user.role); // Set the current role for editing
  };

  const handleDeleteUser = (userId) => {
    console.log(`Deleting user with ID: ${userId}`);
  };

  const handleViewActivities = (userId) => {
    console.log(`Viewing activities of user with ID: ${userId}`);
  };

  const handleUpdateRole = async () => {
    if (!selectedUser || !newRole) return;

    try {
      const response = await axios.put("http://localhost:5000/api/auth/update-role", {
        userId: selectedUser._id,
        role: newRole,
      });

      if (response.data.success) {
        // Update the users state with the new role
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === selectedUser._id ? { ...user, role: newRole } : user
          )
        );

        // Close the modal first
        closeModal();

        // Show success message after modal is closed
        setSuccessMessage("User role updated successfully!");

        // Clear success message after 2 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-600 text-transparent bg-clip-text">
        Manage Users
      </h2>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-500 text-white rounded-lg text-center">
          {successMessage}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Search Users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/3 p-2 border border-gray-700 rounded-lg bg-gray-800 text-white"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddUser}
          className="py-2 px-4 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-blue-700"
        >
          Add New User
        </motion.button>
      </div>

      <table className="w-full table-auto bg-gray-800 border border-gray-700 text-white">
        <thead>
          <tr className="bg-gray-700">
            <th className="py-3 px-4">UserID</th>
            <th className="py-3 px-4">Name</th>
            <th className="py-3 px-4">Email</th>
            <th className="py-3 px-4">Role</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user, index) => (
              <tr key={user.id} className="border-b border-gray-700">
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4">{user.role}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEditUser(user)}
                    className="py-1 px-2 bg-yellow-500 text-white rounded-lg"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteUser(user.id)}
                    className="py-1 px-2 bg-red-500 text-white rounded-lg"
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleViewActivities(user.id)}
                    className="py-1 px-2 bg-blue-500 text-white rounded-lg"
                  >
                    View Activities
                  </motion.button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="mt-6 py-3 px-4 w-full bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700"
      >
        Logout
      </motion.button>

      {/* Modal for editing user */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-96">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={closeModal}
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4 text-white">Edit User</h2>

            <div className="mb-4">
              <label className="text-white">Name:</label>
              <p className="text-gray-400">{selectedUser.name}</p>
            </div>
            <div className="mb-4">
              <label className="text-white">Email:</label>
              <p className="text-gray-400">{selectedUser.email}</p>
            </div>
            <div className="mb-4">
              <label className="text-white">Role:</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button
              onClick={handleUpdateRole}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
            >
              Edit
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboardPage;
