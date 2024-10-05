import { User } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';
import { Parser } from 'json2csv';
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js';
import { sendPasswordResetEmail, sendResetSuccessEmail } from '../mailtrap/emails.js';

export const signup = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        if (!email || !password || !name) {
            throw new Error('All fields are required');
        }

        // Check if the user already exists
        const userAlreadyExists = await User.findOne({
            email,
        });
        if(userAlreadyExists) {
            return res.status(400).json({success: false, message: 'User already exists'});
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Create the user
        const user = new User({
            email,
            password: hashedPassword,
            name,
            role: role || 'user',
            isVerified: true
        });

        await user.save();

        // Generate JWT and set it as a cookie
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true, 
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: undefined
            },
        });

    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({success: false, message: 'Invalid credentials'});
        }

        generateTokenAndSetCookie(res, user._id);

        user.lastLogin = new Date();
        await user.save();

        res.status(200).json({
            success: true, 
            message: 'Logged in successfully',
            user: {
                ...user._doc,
                password: undefined
            },
            role: user.role,
        });
    } catch (error) {
        console.log("Error in login", error);
        res.status(400).json({success: false, message: error.message});
    }
};

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({success: true, message: 'Logged out successfully'});
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({success: false, message: 'User not found'});
        }

        //Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; //1 hours

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        //send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({success: true, message: 'Password reset email sent successfully'});
    } catch (error) {
        res.status(400).json({success: false, message: error.message});
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now() },
        });

    if(!user){
        return res.status(400).json({success: false, message: "Invalid or expired reset token"});
    }

    //update password
    const hashedPassword = await bcryptjs.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();
    
    await sendResetSuccessEmail(user.email);

    res.status(200).json({success: true, message: "Password reset successful"});
    } catch (error) {
        console.log("Error in resetPassword ", error);
        res.status(400).json({success: false, message: error.message});
    }
};

export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if(!user) {
            return res.status(400).json({success: false, message: "User not found"});
        }

        res.status(200).json({success: true, user});
    } catch (error) {
        console.log("Error in checkAuth ", error);
        res.status(400).json({success: false, message: error.message});
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;  // Get the user ID from the route parameter
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        
        const user = await User.findByIdAndDelete(userId);  // Use userId from params
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.clearCookie('token');

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.log("Error in deleteUser", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const userId = req.userId; // Assuming userId is set in the request
        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            user: {
                ...updatedUser._doc,
                password: undefined // Exclude password from response
            },
        });
    } catch (error) {
        console.log("Error in updateUser", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

export const updateUserRole = async (req, res) => {
    const { userId, role } = req.body; // Expecting userId and role from the request
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      user.role = role; // Update the role
      await user.save(); // Save the changes
  
      res.status(200).json({ success: true, message: 'User role updated successfully', user });
    } catch (error) {
      console.error('Error updating user role:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
  

  export const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const userId = req.userId; // Assuming userId is set in the request

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if the current password is correct
        const isPasswordValid = await bcryptjs.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }

        // Hash the new password
        const hashedNewPassword = await bcryptjs.hash(newPassword, 12);

        // Update the user's password
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        console.log("Error in changePassword", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const register = async (req, res) => {
    const { email, password, name, role } = req.body; // role added for admin usage

    try {
        if (!email || !password || !name) {
            throw new Error('All fields are required');
        }

        // Check if the user already exists
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 12);

        // Create the user
        const user = new User({
            email,
            password: hashedPassword,
            name,
            role: role || 'user',
            isVerified: true
        });

        await user.save();

        // Generate JWT and set it as a cookie
        generateTokenAndSetCookie(res, user._id);

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: { ...user._doc, password: undefined },
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const downloadUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password').lean(); // Fetch users without passwords and return plain JS objects

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }

        const json2csvParser = new Parser();
        let csv;
        try {
            csv = json2csvParser.parse(users); // Convert user data to CSV format
        } catch (error) {
            console.error("Error parsing CSV", error);
            return res.status(500).json({ success: false, message: 'Error generating CSV file' });
        }

        // Set the headers for the download
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=users.csv');

        res.status(200).send(csv); // Send the CSV file as a response
    } catch (error) {
        console.error("Error in downloadUsers", error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
