import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import PasswordStrengthMeter from "../components/User/PasswordStrengthMeter";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, updateUser, changePassword, deleteUser, login, isAuthenticated } = useAuthStore();
  const [name, setName] = useState(user ? user.name : "");
const [email, setEmail] = useState(user ? user.email : "");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // Update user profile
  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      await updateUser({ name, email });
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Error updating profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Change password and re-login user
  const handleChangePassword = async () => {
    setLoading(true);
    try {
      // Step 1: Change the password via the backend
      await changePassword(currentPassword, newPassword);

      // Step 2: Re-authenticate the user
      await login(user.email, newPassword);

      // Step 3: Close the modal and show success message
      setShowPasswordModal(false);
      alert("Password successfully changed. You have been re-logged in.");
    } catch (error) {
      alert("Error changing password: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete user account
  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      await deleteUser();
      navigate("/login");
    } else {
      console.log("Account deletion cancelled");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
    >
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-600 text-transparent bg-clip-text'>
        Profile
      </h2>

      <div className='space-y-6'>
        <div className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'>
          <label className='block text-gray-300'>Full Name</label>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full p-2 mt-1 bg-gray-700 text-white rounded'
          />

          <label className='block mt-4 text-gray-300'>Email</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full p-2 mt-1 bg-gray-700 text-white rounded'
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveChanges}
          disabled={loading}
          className={`w-full py-3 px-4 mb-4 ${
            loading ? "bg-gray-500" : "bg-gradient-to-r from-purple-500 to-pink-600"
          } text-white font-bold rounded-lg shadow-lg`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </motion.button>

        <div className='text-gray-300'>Do you want to change your password?</div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowPasswordModal(true)}
          className='w-full py-3 px-4 mb-4 bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none'
        >
          Change Password
        </motion.button>

        <div className='text-gray-300'>Do you want to delete your account?</div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDeleteAccount}
          className='w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 focus:outline-none'
        >
          Delete Account
        </motion.button>
      </div>

      {showPasswordModal && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative bg-gray-900 p-8 rounded-lg w-full max-w-sm'>
            <button
              onClick={() => setShowPasswordModal(false)}
              className='absolute top-2 right-2 text-gray-400 hover:text-gray-300 focus:outline-none'
            >
              &times;
            </button>

            <h3 className='text-xl font-semibold text-white mb-4'>Change Password</h3>
            <input
              type='password'
              placeholder='Current Password'
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className='w-full p-2 mb-4 bg-gray-700 text-white rounded'
            />
            <input
              type='password'
              placeholder='New Password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className='w-full p-2 mb-4 bg-gray-700 text-white rounded'
            />
            <PasswordStrengthMeter password={newPassword} />

            <div className='flex justify-center mt-4'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleChangePassword}
                className='py-2 px-4 bg-blue-500 text-white rounded-lg'
              >
                Change Password
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProfilePage;
