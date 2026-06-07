const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    // ✅ ROLE FIELD
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
    },
    otp: {
  type: String,
},

otpExpiry: {
  type: Date,
},
    bio: {
  type: String,
  default: "",
},

college: {
  type: String,
  default: "",
},

github: {
  type: String,
  default: "",
},

linkedin: {
  type: String,
  default: "",
},

skills: {
  type: [String],
  default: [],
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);