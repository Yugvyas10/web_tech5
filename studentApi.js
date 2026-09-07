import axios from "axios";

const BASE_URL = "http://localhost:8080/api/students";

export const getAllStudents = () => axios.get(BASE_URL);

export const addStudent = (student) => axios.post(BASE_URL, student);

export const getStudentResult = (rollNo) =>
    axios.get(`${BASE_URL}/${rollNo}/result`);

export const deleteStudent = (id) => axios.delete(`${BASE_URL}/${id}`);