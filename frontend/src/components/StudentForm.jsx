import { useState } from "react";
import API from "../services/api";

function StudentForm({ refresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    course: "",
    collegeName: "",
    location: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Valid email required";
    if (!form.age || form.age < 17 || form.age > 35)
      newErrors.age = "Age must be 17-35";
    if (!form.course.trim())
      newErrors.course = "Course required";
    if (!form.collegeName.trim())
      newErrors.collegeName = "College name is required";
     if (!form.location.trim())
      newErrors.location = "Location is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await API.post("/students", form);
      refresh();

      setForm({
        name: "",
        email: "",
        age: "",
        course: "",
        collegeName: ""
      });

      setErrors({});
    } catch (error) {
      setErrors({ api: error.response?.data?.message || "Server error" });
    } finally {
      setLoading(false);
    }
  };   // ✅ VERY IMPORTANT — close function here

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />
        {errors.name && (
          <div className="error-message">{errors.name}</div>
        )}
      </div>

      <div>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
        {errors.email && (
          <div className="error-message">{errors.email}</div>
        )}
      </div>

      <div>
        <input
          type="number"
          placeholder="Age"
          value={form.age}
          onChange={(e) =>
            setForm({ ...form, age: e.target.value })
          }
        />
        {errors.age && (
          <div className="error-message">{errors.age}</div>
        )}
      </div>

      <div>
        <input
          placeholder="Course"
          value={form.course}
          onChange={(e) =>
            setForm({ ...form, course: e.target.value })
          }
        />
        {errors.course && (
          <div className="error-message">{errors.course}</div>
        )}
      </div>

      <div>
        <input
          placeholder="College Name"
          value={form.collegeName}
          onChange={(e) =>
            setForm({ ...form, collegeName: e.target.value })
          }
        />
        {errors.collegeName && (
          <div className="error-message">
            {errors.collegeName}
          </div>
        )}
      </div>

      <div>
        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />
        {errors.location && (
          <div className="error-message">
            {errors.location}
          </div>
        )}
      </div>

      {errors.api && (
        <div className="error-message">{errors.api}</div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Student"}
      </button>
    </form>
  );
}

export default StudentForm;
