import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    profilePicture: {
        type: String,
        default: 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
    },

    lastLogin: {
        type: Date,
        default: Date.now,
    },

    isVerified: {
        type: Boolean,
        default: true,
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },

    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,

}, { timestamps: true });
//timestamps: true will automatically create a createdAt and updatedAt field for each document that is saved to the database.

export const User = mongoose.model("User", userSchema);