const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [17, "Minimum age is 17"],
      max: [35, "Maximum age is 35"]
    },
    course: {
      type: String,
      required: [true, "Course is required"]
    },
    collegeName: {
      type: String,
      required: true
}

  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
