import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { addCorsHeaders } from "@/lib/middleware"; // Import the middleware function
export async function GET(req) {
  const connection = await connectToDatabase();

  try {
    const db = await connectToDatabase();
    const sql = `SELECT s.subject_id as id, s.subject_name as name, s.semester_id as semesterId  FROM subject s`;
    const [subjects] = await db.query(sql);
    if (subjects.length > 0) {
      const response = NextResponse.json(subjects, { status: 200 });
      return addCorsHeaders(response);
    } else {
      const response = NextResponse.json([], { status: 200 });
      return addCorsHeaders(response);
    }
  } catch (error) {
    console.log("Database error" + error);
    const response = NextResponse.json(
      { message: "Error connecting with database" },
      { status: 500 }
    );
    addCorsHeaders(response);
  }
}
