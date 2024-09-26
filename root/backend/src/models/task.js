const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
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
    project: { type: String },
    projectId:{type:String},
    star: { type: Boolean, default: false },
    createdUser: { type: String },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
