"use client";
import Navbar from "@/components/navbar/Navbar";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [totalFiles, setTotalFiles] = useState(0 || "0");
  const [totalSubjects, setTotalSubjects] = useState(50);
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/files");
      const data = await res.data.message;
      setTotalFiles(data);
    })();
    setTotalFiles();
  }, []);

  return (
    <div className="w-full  min-h-[100vh]">
      <Navbar />
      <div className="w-full  px-5 md:px-10 min-h-[100vh] py-10 ">
        <div className="w-full h-[50%]">
        <div className="w-[20rem] flex flex-col  h-[5rem]">
        <span className="gap-5 px-10 py-10 font-sans font-bold text-black bg-white rounded-2xl ">
            <span>Total Files</span>
            <span> {totalFiles}</span>
          </span>
          <Link
            className="inline px-6 py-2 font-bold text-black bg-white rounded-lg"
            href="/add"
          >
            Add
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
