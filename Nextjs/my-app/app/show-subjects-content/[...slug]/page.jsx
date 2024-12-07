"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useInsertionEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Page = ({ params }) => {
  const [id, setId] = useState(0);
  const [subjectName, setSubjectName] = useState("" || "Unknown");
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");
  const [reload, setReload] = useState(false);
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

    setToken(Cookies.get("session"));
  }, [reload]);

  async function handleDeleteFile(fileId) {
    const toDelete = confirm("Are you sure you want to delete?");
    if (!toDelete) {
      return;
    }
    const header = {
      headers: {
        Authorization: `Bearer ${token} `,
      },
    };

    if (!fileId) {
      toast.error("File id doesnot exist");
      return;
    }

    try {
      const res = await axios.delete(`/api/files?file_id=${fileId}`, header);
      const data = await res.data.message;
      toast.success(data);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

    setReload(!reload);
  }

  return (
    <div className="w-full min-h-[100vh]">
      <Navbar />
      <div className="relative p-4 overflow-x-auto shadow-md sm:rounded-lg">
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
              <th scope="col" className="px-6 py-3">
                Delete
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
                  <td className="px-4 py-2 font-bold text-white">
                    <span
                      onClick={() => handleDeleteFile(data.id)}
                      className="px-4 py-2 font-bold text-white bg-red-500 rounded cursor-pointer hover:bg-red-700"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan={4} className="px-6 py-4 font-bold text-center ">
                  No files found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
