import { useState, useEffect } from "react";
import { SUBJECTS } from "../Constants.js";
import { getAllStudents, deleteStudent } from "../api/studentApi";

function calculateSubjectTotal(mse, ese) {
    const scaledMse = (mse / 50) * 30;
    const scaledEse = (ese / 50) * 70;
    return scaledMse + scaledEse;
}

function ResultTable({ refreshTrigger }) {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await getAllStudents();
            setStudents(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [refreshTrigger]);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this record?")) return;
        try {
            await deleteStudent(id);
            fetchStudents();
        } catch (err) {
            console.error(err);
            alert("Failed to delete.");
        }
    };

    if (loading) return <p>Loading results...</p>;
    if (students.length === 0) return <p>No results yet. Add one above.</p>;

    return (
        <table className="result-table">
            <thead>
                <tr>
                    <th>Roll No</th>
                    <th>Name</th>
                    <th>Sem</th>
                    {SUBJECTS.map((s) => (
                        <th key={s}>{s}</th>
                    ))}
                    <th>Overall %</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {students.map((s) => {
                    const totals = [
                        calculateSubjectTotal(s.subject1Mse, s.subject1Ese),
                        calculateSubjectTotal(s.subject2Mse, s.subject2Ese),
                        calculateSubjectTotal(s.subject3Mse, s.subject3Ese),
                        calculateSubjectTotal(s.subject4Mse, s.subject4Ese),
                    ];
                    const overall = totals.reduce((a, b) => a + b, 0) / totals.length;

                    return (
                        <tr key={s.id}>
                            <td>{s.rollNo}</td>
                            <td>{s.name}</td>
                            <td>{s.semester}</td>
                            {totals.map((t, i) => (
                                <td key={i}>{t.toFixed(2)}</td>
                            ))}
                            <td>
                                <span
                                    style={{
                                        display: "inline-block",
                                        padding: "3px 10px",
                                        borderRadius: "12px",
                                        fontWeight: 600,
                                        fontSize: "12px",
                                        background: overall >= 40 ? "rgba(58,125,92,0.12)" : "rgba(181,69,58,0.12)",
                                        color: overall >= 40 ? "#3A7D5C" : "#B5453A",
                                    }}
                                >
                                    {overall.toFixed(2)}%
                                </span>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(s.id)}>Delete</button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default ResultTable;
