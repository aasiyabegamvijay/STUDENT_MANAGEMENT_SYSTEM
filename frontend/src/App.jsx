import { useState } from "react";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management System</h1>
      <StudentForm refresh={refresh} />
      <StudentList refreshKey={refreshKey} />
    </div>
  );
}

export default App;

