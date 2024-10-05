import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from 'date-fns';

const AdminDashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user for editing
  const [newRole, setNewRole] = useState(""); // Store new role for editing
  // const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "user" });

  // New states for activities
  const [activities, setActivities] = useState([]);
  const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);

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
    setIsAddUserModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", newUser); // Change the endpoint to match your backend
      if (response.data.success) {
        setUsers((prevUsers) => [...prevUsers, response.data.user]); // Add the new user to the state
        setSuccessMessage("User added successfully!");
        setTimeout(() => setSuccessMessage(""), 2000); // Clear success message after 2 seconds
        setIsAddUserModalOpen(false); // Close modal
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user); // Open the modal and set the selected user
    setNewRole(user.role); // Set the current role for editing
  };

  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm("Are you sure you want to delete this user?");
    if (!confirmation) return;
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/auth/delete/${userId}`);
  
      if (response.data.success) {
        // Remove user from state after successful deletion
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  
        // Show success message
        setSuccessMessage("User deleted successfully!");
  
        // Clear success message after 2 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleViewActivities = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/auth/activities/${userId}`);
      if (response.data.success) {
        setActivities(response.data.activities);
        setIsActivitiesModalOpen(true); // Open activities modal
      }
    } catch (error) {
      console.error("Error fetching user activities:", error);
    }
  };

  // Close activities modal
  const closeActivitiesModal = () => {
    setIsActivitiesModalOpen(false);
    setActivities([]);
  };

  const filteredUsers = Array.isArray(users)
    ? users.filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

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

  // const filteredUsers = Array.isArray(users)
  //   ? users.filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()))
  //   : [];

  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 min-h-screen p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full mx-auto p-8 bg-white shadow-lg rounded-2xl border border-gray-300"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Manage Users</h2>

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
            className="w-1/3 px-4 py-2 border border-neutral-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={handleAddUser}
            className="py-2 px-4 bg-[#4F46E5] text-white font-semibold rounded-2xl hover:bg-[#357a8d]"
          >
            Add New User
          </button>
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
                    <button
                      onClick={() => handleEditUser(user)}
                      className="py-1 px-2 bg-yellow-500 text-white rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="py-1 px-2 bg-red-500 text-white rounded-lg"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewActivities(user._id)}
                      className="py-1 px-2 bg-blue-500 text-white rounded-lg"
                    >
                      View Activities
                    </button>
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

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-96">
            <button
              className="absolute top-2 right-2 text-white"
              onClick={() => setIsAddUserModalOpen(false)}
            >
              &times;
            </button>
            <h2 className="text-2xl mb-4 text-white">Add New User</h2>

            <form onSubmit={handleAddUserSubmit}>
              <div className="mb-4">
                <label className="text-white">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={newUser.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="text-white">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="text-white">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={newUser.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="text-white">Role:</label>
                <select
                  name="role"
                  value={newUser.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg"
              >
                Add User
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Activities Modal */}
      {isActivitiesModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-96">
      <button
        className="absolute top-2 right-2 text-white"
        onClick={closeActivitiesModal}
      >
        &times;
      </button>
      <h2 className="text-2xl mb-4 text-white">User Activities</h2>

      {activities.length > 0 ? (
        <ul className="text-white">
          {activities.map((activity, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
            <span className="text-gray-300">{activity.description}</span>
            <span className="text-sm text-gray-500">
              {activity.date ? format(new Date(activity.date), 'Pp') : 'Date not available'}
            </span>
          </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No activities found for this user.</p>
      )}
              <button
                onClick={closeActivitiesModal}
                className="py-2 px-4 bg-red-500 text-white rounded-lg"
              >
                Close
              </button>
            
    </div>
  </div>
)}
</motion.div>
</div>
);
};

export default AdminDashboardPage;
