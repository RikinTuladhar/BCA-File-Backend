// app/api/upload/route.js
import { connectToDatabase } from "@/lib/db";

export async function POST(req) {
  const { data } = await req.json(); // assuming your data is sent as { data: [...] }
  console.log(data)
  if (!data || !Array.isArray(data)) {
    return new Response(JSON.stringify({ message: "Invalid data" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const connection = await connectToDatabase();

  const insertPromises = data.map(async (row) => {
    console.log("row " + row);

    // Skip empty rows
    if (!row || row.length === 0 || row.every((cell) => cell.trim() === "")) {
      console.error("Skipping empty row:", row);
      return; // Skip this row if it's empty
    }

    // Ensure row has enough columns
    if (row.length < 4) {
      // Change this to 4
      console.error("Row does not have enough columns:", row);
      return; // Skip this row if it doesn't have at least 4 elements
    }

    // Destructure to get the appropriate values
    const file_id = row[0]; // Now we get the file_id
    const file_path = row[1];
    const file_name = row[2];
    const subjectid = row[3].trim(); // Trim the subjectid to remove unwanted characters

    // Check for undefined values and handle them appropriately
    if (!file_id || !file_path || !file_name || !subjectid) {
      console.error("One or more values are undefined in row:", row);
      return; // Skip this row if any value is undefined
    }

    // Define the SQL query
    const query =
      "INSERT INTO file_model(file_path, file_name, subjectid) VALUES (?, ?, ?)";

    // Trim the values to avoid errors with newline characters
    await connection.execute(query, [file_path, file_name.trim(), subjectid]);
  });

  try {
    await Promise.all(insertPromises);
    return new Response(
      JSON.stringify({ message: "Data inserted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error inserting data:", error);
    return new Response(JSON.stringify({ message: "Error inserting data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
