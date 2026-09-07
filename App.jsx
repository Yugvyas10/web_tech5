import { useState } from "react";
import ResultForm from "./components/ResultForm";
import ResultTable from "./components/ResultTable";
import "./App.css";

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleStudentAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="app-container">
      <div className="app-header">
        <div className="app-eyebrow">Vishwakarma Institute of Technology</div>
        <h1>Semester Result Portal</h1>
        <p>Department result management — enter and review student marks</p>
      </div>
      <ResultForm onStudentAdded={handleStudentAdded} />
      <h2>All Results</h2>
      <ResultTable refreshTrigger={refreshTrigger} />
    </div>
  );
}

export default App;





