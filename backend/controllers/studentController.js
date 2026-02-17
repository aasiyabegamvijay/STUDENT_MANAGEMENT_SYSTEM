const Student = require("../models/Student");
const mongoose = require("mongoose"); 

// Create Student
exports.createStudent = async (req, res) => {
  try {
const { name, email, age, course, collegeName ,location } = req.body;

    const student = new Student({
  name,
  email,
  age,
  course,
  collegeName,
  location  
});


    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Student


exports.getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid student ID" });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update Student
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Student
exports.deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
