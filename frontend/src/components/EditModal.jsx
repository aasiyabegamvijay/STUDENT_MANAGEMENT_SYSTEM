import { useState, useEffect } from "react";

const EditModal = ({ student, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    collegeName: ""
  });

  useEffect(() => {
    if (student) {
      setFormData({
        name: student.name || "",
        email: student.email || "",
        age: student.age || "",
        course: student.course || "",
        collegeName: student.collegeName || ""
      });
    }
  }, [student]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(student._id, formData);
  };

  if (!student) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Student</h2>

        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>

          <div>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age"
              required
            />
          </div>

          <div>
            <input
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="Course"
              required
            />
          </div>

          {/* ✅ Added College Name Field */}
          <div>
            <input
              name="collegeName"
              value={formData.collegeName}
              onChange={handleChange}
              placeholder="College Name"
              required
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <button type="submit" className="edit-btn">
              Update
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
              style={{ marginLeft: "10px" }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
