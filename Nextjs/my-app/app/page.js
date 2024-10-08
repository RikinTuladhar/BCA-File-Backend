"use client";
import React, { useState } from 'react';

const Page = () => {
  const [csvData, setCsvData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setErrorMessage('Please select a file.');
      return;
    }
    if (!file.name.endsWith('.csv')) {
      setErrorMessage('Please upload a CSV file.');
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = async (e) => {
      const text = e.target.result;
      const rows = text.split('\n').map((row) => row.split(','));

      setCsvData(rows);
      setErrorMessage('');
      setIsLoading(false);

      // Send data to the API
      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: rows.slice(1) }), // Exclude header row
        });

        const result = await response.json();
        console.log(result.message);
        if (!response.ok) {
          throw new Error(result.message);
        }
      } catch (error) {
        setErrorMessage('Error uploading data: ' + error.message);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '20px' }}>
        Loading Data from File
      </h1>
      <input
        type="file"
        onChange={handleFileUpload}
        accept=".csv"
        style={{ marginBottom: '10px' }}
      />
      {errorMessage && (
        <div style={{ color: 'red', marginBottom: '10px' }}>
          {errorMessage}
        </div>
      )}
      {isLoading ? (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          Loading...
        </div>
      ) : (
        csvData.length > 0 && (
          <table
            style={{
              borderCollapse: 'collapse',
              width: '100%',
              marginTop: '20px',
            }}
          >
            <tbody>
              {csvData.map((row, index) => (
                <tr key={index}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      style={{ border: '1px solid #ccc', padding: '8px' }}
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
};

export default Page;
