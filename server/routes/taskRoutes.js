const express = require("express");

const router = express.Router();

const Task = require("../models/Task");

const User = require("../models/User");

const authMiddleware = require(
  "../middleware/authMiddleware"
);

const socket = require("../socket");


// ========================================
// GET TASKS
// ========================================
router.get(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      // CURRENT USER
      const user = await User.findById(
        req.user
      );

      // ADMIN → SEE ALL TASKS
      if (user.role === "admin") {
        const tasks =
          await Task.find().populate(
            "assignee",
            "name email role"
          );

        return res.json(tasks);
      }

      // MEMBER → OWN + TEAM TASKS
      const tasks =
        await Task.find({
          $or: [
            {
              assignee: user._id,
            },

            {
              isTeamTask: true,
            },
          ],
        }).populate(
          "assignee",
          "name email role"
        );

      res.json(tasks);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ========================================
// CREATE TASK
// ========================================
router.post(
  "/",
  authMiddleware,
  async (req, res) => {
    try {
      const task = await Task.create({
        ...req.body,

        user: req.user,
      });

      socket
        .getIO()
        .emit("taskUpdated");

      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ========================================
// UPDATE TASK
// ========================================
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const task =
        await Task.findByIdAndUpdate(
          req.params.id,

          req.body,

          {
            new: true,
          }
        );

      socket
        .getIO()
        .emit("taskUpdated");

      res.json(task);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ========================================
// DELETE TASK
// ========================================
router.delete(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      // CURRENT USER
      const user = await User.findById(
        req.user
      );

      // ADMIN ONLY
      if (user.role !== "admin") {
        return res.status(403).json({
          message:
            "Access denied",
        });
      }

      await Task.findByIdAndDelete(
        req.params.id
      );

      socket
        .getIO()
        .emit("taskUpdated");

      res.json({
        message:
          "Task deleted",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ========================================
// ADD COMMENT
// ========================================
router.post(
  "/:id/comment",
  authMiddleware,
  async (req, res) => {
    try {
      const task = await Task.findById(
        req.params.id
      );

      const user = await User.findById(
        req.user
      );

      const comment = {
        user: user.name,

        text: req.body.text,
      };

      // ADD COMMENT
      task.comments.push(comment);

      // ACTIVITY
      task.activity.push({
        text: `${user.name} added a comment`,
      });

      await task.save();

      socket
        .getIO()
        .emit("taskUpdated");

      res.json(task);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


// ========================================
// SEED DEMO TASKS
// ========================================
router.post(
  "/seed",
  async (req, res) => {
    try {
      // CHECK EXISTING TASKS
      const existingTasks =
        await Task.find();

      if (
        existingTasks.length > 0
      ) {
        return res.json({
          message:
            "Tasks already exist",
        });
      }

      // FIND USERS
      const users = await User.find();

      // ADMIN
      const admin = users.find(
        (u) => u.role === "admin"
      );

      // MEMBER
      const member = users.find(
        (u) =>
          u.role === "member" ||
          u.role === "user"
      );

      const demoTasks = [
        {
          title: "Build React UI",

          description:
            "Create responsive frontend",

          assignee: member?._id,

          priority: "High",

          status: "todo",

          isTeamTask: false,
        },

        {
          title: "Setup Backend",

          description:
            "Configure Express server",

          assignee: admin?._id,

          priority: "Medium",

          status: "progress",

          isTeamTask: false,
        },

        {
          title:
            "MongoDB Integration",

          description:
            "Connect database",

          assignee: member?._id,

          priority: "High",

          status: "review",

          isTeamTask: false,
        },

        {
          title:
            "Deploy Application",

          description:
            "Deploy frontend and backend",

          assignee: null,

          priority: "Low",

          status: "done",

          isTeamTask: true,
        },
      ];

      await Task.insertMany(
        demoTasks
      );

      res.json({
        message:
          "Demo tasks added",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);


module.exports = router;