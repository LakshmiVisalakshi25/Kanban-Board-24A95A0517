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

    // ✅ ASSIGNEE AS USER ID
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // ✅ TEAM TASK
    isTeamTask: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    dueDate: {
      type: String,
    },

    comments: [
      {
        user: String,

        text: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    activity: [
      {
        text: String,

        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    status: {
      type: String,

      enum: [
        "todo",
        "progress",
        "review",
        "done",
      ],

      default: "todo",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Task",
  taskSchema
);