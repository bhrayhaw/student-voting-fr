import React, { useEffect, useState } from "react";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL;

interface Student {
  first_name: string;
  last_name: string;
  student_id: string;
  department: string;
  email: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${base_url}/students/`);
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Student ID</th>
            <th className="py-2 px-4">Department</th>
            <th className="py-2 px-4">Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id} className="hover:bg-gray-100">
              <td className="py-2 px-4">
                {student.first_name} {student.last_name}
              </td>
              <td className="py-2 px-4">{student.student_id}</td>
              <td className="py-2 px-4">{student.department}</td>
              <td className="py-2 px-4">{student.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
