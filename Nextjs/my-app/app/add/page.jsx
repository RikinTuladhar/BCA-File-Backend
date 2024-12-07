"use client";
import React, { useContext, useEffect, useRef, useState } from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar/Navbar";

import Cookies from "js-cookie";
const AddFile = () => {
  const semesters = Array.from({ length: 8 }, (_, i) => ({
    value: `${i + 1}`,
    label: `Semester ${i + 1}`,
  }));

  const [selectedSemester, setSelectedSemester] = useState(semesters[0].value);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [name, setName] = useState("");
  const [semesterId, setsemesterId] = useState(1);
  const [subjectId, setSubjectId] = useState(1);
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Clicked");
    const header = {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    };

    if (!token || !url || !subjectId || !name) {
      toast.error("Fill all the necessary things");
      return;
    }

    const data = {
      file_name: name,
      file_path: url,
    };

    try {
      const res = await axios.post(
        `/api/files?subjectid=${subjectId}`,
        data,
        header
      );
      const res_data = await res.data.message;
      toast.success(res_data);
      setName("");
      setUrl("");
      setSubjectId(1);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    console.log({
      semester: selectedSemester,
      subject: selectedSubject,
      name,
      url,
    });
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/api/subject/${semesterId}`);
      const data = await res.data;
      setSelectedSubject(data);
      setSubjectId(data[0]?.id);
    })();
    setToken(Cookies.get("session"));
  }, [semesterId]);

  return (
    <>
      <Navbar />
      <div className="w-full px-5 space-y-3 md:px-0 py-10 min-h-[100vh] grid place-items-center">
        <h1 className="text-2xl font-bold">Add File</h1>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="flex gap-x-2">
          <span className="font-bold">Selected semester id:</span>
          <span> {selectedSemester}</span>
        </div>
        <div className="flex gap-x-2">
          <span className="font-bold">Selected subject id:</span>{" "}
          <span>{subjectId}</span>
        </div>

        <div className="w-full px-5  md:px-10 py-10 md:w-[50%] p-4 bg-white rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="semester"
              >
                Semester
              </label>
              <select
                id="semester"
                value={selectedSemester}
                onChange={(e) => {
                  setSelectedSemester(e.target.value);
                  setsemesterId(e.target.value);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                {semesters.map((semester) => (
                  <option key={semester.value} value={semester.value}>
                    {semester.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="subject"
              >
                Subject
              </label>
              <select
                id="subject"
                onChange={(e) => setSubjectId(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                {selectedSubject?.map((subject) => (
                  <option key={subject.name} value={subject.id}>
                    {subject.name} 
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="url"
              >
                URL
              </label>
              <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddFile;
