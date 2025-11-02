import { connectToDatabase } from "@/lib/db";
import { addCorsHeaders } from "@/lib/middleware"; // Import the middleware function
import { NextResponse } from "next/server";
export async function GET(req) {

  try {
    const db = await connectToDatabase();
    const sql = `SELECT s.id as id, s.name as name, s.semester_id as semester_id,s.slug as slug  FROM subjects s`;
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
    const response = NextResponse.json({ message: "Error connecting with database" }, { status: 500 });
    addCorsHeaders(response);
  }
}
