import React from "react";
import FileUpload from "./components/FileUpload";
import StudentList from "./components/StudentList";


const App: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Student Voter Upload</h1>
      <FileUpload />
      <StudentList />
    </div>
  );
};

export default App;
