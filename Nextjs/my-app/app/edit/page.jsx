"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  useEffect(() => {
    async function fetchAllSubjects() {
      try {
        const res = await axios.get("/api/subject");
        const data = res.data;
        const sortedData = data.sort((a, b) => a.semesterId - b.semesterId);
        setTableData(sortedData);
        setFilteredData(sortedData); // Initialize filteredData
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }
    fetchAllSubjects();
  }, []);

  const semesters = [...new Set(tableData.map((data) => data.semesterId))];
  const subjects = [
    ...new Set(
      tableData
        .filter((data) =>
          selectedSemester ? data.semesterId === Number(selectedSemester) : true
        )
        .map((data) => data.name)
    ),
  ];

  const handleSemesterChange = (semester) => {
    setSelectedSemester(semester);
    const filtered = tableData.filter(
      (data) => data.semesterId === Number(semester)
    );
    setFilteredData(filtered);
    setSelectedSubject(""); // Reset subject when semester changes
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    const filtered = tableData.filter(
      (data) =>
        (selectedSemester
          ? data.semesterId === Number(selectedSemester)
          : true) && (subject ? data.name === subject : true)
    );
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSelectedSemester("");
    setSelectedSubject("");
    setFilteredData(tableData);
  };
  return (
    <div className="w-full min-h-[100vh]">
      <Navbar />
      <div className="flex justify-end w-full p-4 border-b border-gray-200">
        <Link href={"/add"} className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          Add Subject File
        </Link>
      </div>
      <div className="container p-4 bg-[#0F0F0F] border mx-auto mt-5">
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <label className="mr-2">Semester:</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={selectedSemester}
              onChange={(e) => handleSemesterChange(e.target.value)}
            >
              <option value="">All Semesters</option>
              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="mr-2">Subject:</label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={selectedSubject}
              onChange={(e) => handleSubjectChange(e.target.value)}
            >
              <option value="">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <button
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-black">
              <tr className="font-bold text-white">
                {/* <th className="px-6 py-3">ID</th> */}
                <th className="px-6 py-3">Semester</th>
                <th className="px-6 py-3">Subject</th>

                <th className="px-6 py-3">View</th>
                <th className="px-6 py-3">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((data) => (
                <tr key={data.id} className="bg-black border-b">
                  {/* <td className="px-4 py-3">{data.id}</td> */}
                  <td className="px-4 py-3">{data.semesterId}</td>
                  <td className="px-4 py-3 font-bold">{data.name}</td>

                  <td className="px-4 py-3">
                    <Link
                      href={`/show-subjects-content/${data.subjectId}/${data.name}`}
                      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    >
                      View
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      href={`/show-subjects-content/${data.subjectId}/${data.name}`}
                      className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
