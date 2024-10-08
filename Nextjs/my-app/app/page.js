"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Page = () => {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoged, setIsLoged] = useState(false);
  const [reload, setReload] = useState(false);

  // Ensure this runs on the client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userValue = JSON.parse(window.localStorage.getItem("user"));
      if (userValue && userValue?.role === "ADMIN") {
        setIsLoged(true);
      }
    }
  }, [reload]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setErrorMessage("Please select a file.");
      return;
    }
    if (!file.name.endsWith(".csv")) {
      setErrorMessage("Please upload a CSV file.");
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const rows = text.split("\n").map((row) => row.split(","));
      setCsvData(rows);
      setErrorMessage("");
      setIsLoading(false);

      // Send data to the API
      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: rows.slice(1) }), // Exclude header row
        });

        const result = await response.json();
        console.log(result.message);
        if (!response.ok) {
          throw new Error(result.message);
        }
      } catch (error) {
        setErrorMessage("Error uploading data: " + error.message);
      }
    };

    reader.readAsText(file);
  };

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/user", user)
      .then((res) => {
        console.log(res.data);
        if (typeof window !== "undefined") {
          window.localStorage.setItem("user", JSON.stringify(res?.data));
          setReload(!reload);
        }
      })
      .catch((err) => console.log(err));
  }

  if (!isLoged) {
    return (
      <div className="w-full h-screen flex-col flex justify-center items-center">
        <h1 className="text-3xl my-10">Log in</h1>
        <form
          className=" flex gap-5 border py-10 px-10 rounded-2xl flex-col justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            className="text-black px-2 py-1 rounded-xl "
            type="text"
            placeholder="enter your username"
            name="username"
            onChange={handleChange}
          />
          <input
            className="text-black px-2 py-1 rounded-xl "
            type="text"
            placeholder="enter your password"
            name="password"
            onChange={handleChange}
          />
          <button className="border px-3 py-2 rounded-3xl" type="submit">
            Log in
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <button
          className="border my-2 px-3 py-2 rounded-3xl"
          onClick={(e) => {
            if (typeof window !== "undefined") {
              window.localStorage.removeItem("user");
              setIsLoged(false);
            }
          }}
        >
          Log out
        </button>
        <h1 style={{ marginBottom: "20px" }}>Loading Data from File</h1>

        <div>
          <h1>Data format in csv file:</h1>
          <ul className="flex justify-between my-2">
            <li>file_id</li>
            <li>file_path</li>
            <li>file_name</li>
            <li>subjectid</li>
          </ul>
        </div>
        <input
          type="file"
          onChange={handleFileUpload}
          accept=".csv"
          style={{ marginBottom: "10px" }}
        />
        {errorMessage && (
          <div style={{ color: "red", marginBottom: "10px" }}>
            {errorMessage}
          </div>
        )}
        {isLoading ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>
        ) : (
          csvData.length > 0 && (
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <tbody>
                {csvData.map((row, index) => (
                  <tr key={index}>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        style={{ border: "1px solid #ccc", padding: "8px" }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    );
  }
};

export default Page;
