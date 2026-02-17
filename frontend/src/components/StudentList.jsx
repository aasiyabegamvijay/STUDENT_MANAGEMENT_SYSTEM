import { useEffect, useState } from "react";
import API from "../services/api";
import Loader from "./Loader";
import EditModal from "./EditModal";

function StudentList({ refreshKey }) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Fetch students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [refreshKey]);

  // Delete student
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await API.delete(`/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Update student
  const handleUpdate = async (id, updatedData) => {
    try {
      await API.put(`/students/${id}`, updatedData);
      fetchStudents();
      setSelectedStudent(null); // close modal
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Course</th>
            <th>College</th> 
            <th>location</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.course}</td>
                <td>{student.collegeName}</td>
                <td>{student.location}</td>
                <td>
                  {student.createdAt
                    ? new Date(student.createdAt).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => setSelectedStudent(student)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selectedStudent && (
        <EditModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}

export default StudentList;
