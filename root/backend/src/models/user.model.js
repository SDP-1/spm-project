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

    activities: [{
        action: { type: String, required: true }, // Description of the action
        timestamp: { type: Date, default: Date.now }, // When the action occurred
        metadata: { type: Object, default: {} }, // Optional metadata (like IP, device info)
    }]

}, { timestamps: true });
//timestamps: true will automatically create a createdAt and updatedAt field for each document that is saved to the database.

export const User = mongoose.model("User", userSchema);