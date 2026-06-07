const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    assignee: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      required: true,
    },

    // ✅ NEW DUE DATE FIELD
    dueDate: {
      type: String,
    },

    status: {
      type: String,
      enum: ["todo", "progress", "review", "done"],
      default: "todo",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);