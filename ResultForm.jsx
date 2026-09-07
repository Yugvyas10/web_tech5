import { useState } from "react";
import { SUBJECTS } from "../Constants.js";
import { addStudent } from "../api/studentApi";

function ResultForm({ onStudentAdded }) {
    const [rollNo, setRollNo] = useState("");
    const [name, setName] = useState("");
    const [semester, setSemester] = useState("");
    const [marks, setMarks] = useState(
        SUBJECTS.map(() => ({ mse: "", ese: "" }))
    );

    const handleMarkChange = (index, field, value) => {
        const updated = [...marks];
        updated[index][field] = value;
        setMarks(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const student = {
            rollNo,
            name,
            semester,
            subject1Name: SUBJECTS[0],
            subject1Mse: parseFloat(marks[0].mse),
            subject1Ese: parseFloat(marks[0].ese),
            subject2Name: SUBJECTS[1],
            subject2Mse: parseFloat(marks[1].mse),
            subject2Ese: parseFloat(marks[1].ese),
            subject3Name: SUBJECTS[2],
            subject3Mse: parseFloat(marks[2].mse),
            subject3Ese: parseFloat(marks[2].ese),
            subject4Name: SUBJECTS[3],
            subject4Mse: parseFloat(marks[3].mse),
            subject4Ese: parseFloat(marks[3].ese),
        };

        try {
            await addStudent(student);
            alert("Result added successfully!");
            // reset form
            setRollNo("");
            setName("");
            setSemester("");
            setMarks(SUBJECTS.map(() => ({ mse: "", ese: "" })));
            if (onStudentAdded) onStudentAdded();
        } catch (err) {
            console.error(err);
            alert("Failed to add result. Check console.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="result-form">
            <h2>Enter Semester Result</h2>

            <div className="form-row">
                <label>Roll No</label>
                <input value={rollNo} onChange={(e) => setRollNo(e.target.value)} required />
            </div>

            <div className="form-row">
                <label>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="form-row">
                <label>Semester</label>
                <input value={semester} onChange={(e) => setSemester(e.target.value)} required />
            </div>

            <h3>Subject Marks</h3>
            {SUBJECTS.map((subject, index) => (
                <div className="subject-row" key={subject}>
                    <span className="subject-label">{subject}</span>
                    <input
                        type="number"
                        placeholder="MSE (out of 50)"
                        min="0"
                        max="50"
                        value={marks[index].mse}
                        onChange={(e) => handleMarkChange(index, "mse", e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="ESE (out of 50)"
                        min="0"
                        max="50"
                        value={marks[index].ese}
                        onChange={(e) => handleMarkChange(index, "ese", e.target.value)}
                        required
                    />
                </div>
            ))}

            <button type="submit">Submit Result</button>
        </form>
    );
}

export default ResultForm;