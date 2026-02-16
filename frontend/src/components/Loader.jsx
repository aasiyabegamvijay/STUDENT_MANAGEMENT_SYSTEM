import { useState, useEffect } from "react";
import API from "../services/api";

function EditModal({ student, onClose, refresh }) {
  const [form, setForm] = useState({
    name: "",
    course: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name,
        course: student.course
      });
    }
  }, [student]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.course.trim()) newErrors.course = "Course is required";
    return newErrors;
  };

  const handleUpdate = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await API.put(`/students/${student._id}`, form);
      refresh();
      onClose();
    } catch (error) {
      setErrors({ api: error.response?.data?.message });
    } finally {
      setLoading(false);
    }
  };

  if (!student) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Edit Student</h2>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        <p style={errorStyle}>{errors.name}</p>

        <input
          placeholder="Course"
          value={form.course}
          onChange={(e) =>
            setForm({ ...form, course: e.target.value })
          }
        />
        <p style={errorStyle}>{errors.course}</p>

        {errors.api && <p style={errorStyle}>{errors.api}</p>}

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Save"}
          </button>
          <button onClick={onClose} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalStyle = {
  background: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "300px"
};

const errorStyle = {
  color: "red",
  fontSize: "12px",
  margin: "4px 0"
};

export default EditModal;
