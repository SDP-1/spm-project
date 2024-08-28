const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },
  description: { type: String, required: true },
  selectedTools: [{ type: String }],
  toolMetrics: { type: Map, of: Map },
  recurring: { type: Boolean, default: false },
  frequencyType: {
    type: String,
    enum: ["Daily", "Hourly", "SpecificDate"],
    default: "Daily",
  },
  frequencyValue: { type: Number, default: 0 },
  specificDate: { type: Date },
  selectionMethod: {
    type: String,
    enum: ["For Now", "Recurring"],
    default: "For Now",
  },
  createdAt: { type: Date, default: Date.now }, // Add createdAt field
  updatedAt: { type: Date, default: Date.now }, // Add updatedAt field
});

// Update the `updatedAt` field before saving the document
taskSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
