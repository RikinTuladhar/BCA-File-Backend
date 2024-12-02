"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import React, { useEffect, useInsertionEffect, useState } from "react";

const Page = ({ params }) => {
  const [id, setId] = useState(0);
  const [subjectName, setSubjectName] = useState("" || "Unknown");
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getFiles(id) {
      const res = await axios.get(`/api/files/${id}`);
      const data = await res.data;
      return data;
    }

    (async () => {
      let id = "";
      const { slug } = await params;
      for (const i in slug) {
        if (i == 0) {
          setId(slug[i]);
          id = slug[i];
          console.log("inside loop", id);
        } else {
          const decoded = decodeURIComponent(slug[i]);
          setSubjectName(decoded);
        }
      }
      const data = await getFiles(id);
      setData(data);
    })();
  }, []);

  return (
    <div className="w-full min-h-[100vh]">
      <Navbar />
      <div className="relative p-4 overflow-x-auto shadow-md sm:rounded-lg">
        <h1 className="mb-4 text-3xl font-bold">
          <span className="text-blue-600">Subject Name: </span>
          {subjectName}
        </h1>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                View File
              </th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((data, i) => (
                <tr
                  key={data.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4">{data?.name}</td>
                  <td className="px-6 py-4">
                    <a
                      target="_blank"
                      href={data?.filePath}
                      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan={3} className="px-6 py-4 font-bold text-center ">No files found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
