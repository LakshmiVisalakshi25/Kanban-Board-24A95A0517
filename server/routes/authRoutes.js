const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require(
  "../middleware/authMiddleware"
);

const {
  sendOTP,
} = require("../utils/emailService");

// ================= TEST ROUTE =================
router.get("/test", (req, res) => {
  res.json({
    message: "Auth routes working",
  });
});

// ================= FORGOT PASSWORD =================
router.post(
  "/forgot-password",
  async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          message: "Email is required",
        });
      }

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      // Generate 6-digit OTP
      const otp = Math.floor(
        100000 +
          Math.random() * 900000
      ).toString();

      // Save OTP
      user.otp = otp;

      user.otpExpiry =
        Date.now() +
        10 * 60 * 1000; // 10 minutes

      await user.save();

      // Send Email
      await sendOTP(
        email,
        otp
      );

      res.status(200).json({
        message:
          "OTP sent successfully",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to send OTP",
      });
    }
  }
);

// ================= RESET PASSWORD =================
router.post(
  "/reset-password",
  async (req, res) => {
    try {
      const {
        email,
        otp,
        newPassword,
      } = req.body;

      if (
        !email ||
        !otp ||
        !newPassword
      ) {
        return res.status(400).json({
          message:
            "All fields are required",
        });
      }

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      if (
        user.otp !== otp
      ) {
        return res.status(400).json({
          message:
            "Invalid OTP",
        });
      }

      if (
        !user.otpExpiry ||
        user.otpExpiry <
          Date.now()
      ) {
        return res.status(400).json({
          message:
            "OTP expired",
        });
      }

      // Hash new password
      user.password =
        await bcrypt.hash(
          newPassword,
          10
        );

      // Clear OTP
      user.otp = null;
      user.otpExpiry = null;

      await user.save();

      res.status(200).json({
        message:
          "Password reset successful",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Failed to reset password",
      });
    }
  }
);

// ================= REGISTER =================
router.post(
  "/register",
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        role,
      } = req.body;

      if (
        !name ||
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "All fields are required",
        });
      }

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      await User.create({
        name,
        email,
        password:
          hashedPassword,
        role:
          role || "user",
      });

      res.status(201).json({
        message:
          "Registration successful",
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server error",
      });
    }
  }
);

// ================= LOGIN =================
router.post(
  "/login",
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      if (
        !email ||
        !password
      ) {
        return res.status(400).json({
          message:
            "Email and password are required",
        });
      }

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(401).json({
          message:
            "User credentials are wrong",
        });
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res.status(401).json({
          message:
            "User credentials are wrong",
        });
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.status(200).json({
        token,

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Server error",
      });
    }
  }
);

// ================= GET USERS =================
router.get(
  "/users",
  async (req, res) => {
    try {
      const users =
        await User.find().select(
          "-password -otp -otpExpiry"
        );

      res.json(users);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch users",
      });
    }
  }
);

// ================= GET PROFILE =================
router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user
        ).select(
          "-password -otp -otpExpiry"
        );

      if (!user) {
        return res.status(404).json({
          message:
            "User not found",
        });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to fetch profile",
      });
    }
  }
);

// ================= UPDATE PROFILE =================
router.put(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const updatedUser =
        await User.findByIdAndUpdate(
          req.user,
          req.body,
          {
            new: true,
          }
        ).select(
          "-password -otp -otpExpiry"
        );

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({
        message:
          "Failed to update profile",
      });
    }
  }
);

module.exports = router;