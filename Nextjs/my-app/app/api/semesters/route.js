import { connectToDatabase } from "@/lib/db";
import { addCorsHeaders } from "@/lib/middleware"; // Import the middleware function
import { NextResponse } from "next/server";
export async function GET(req) {
  const connection = await connectToDatabase();

  try {
    const db = await connectToDatabase();
    const sql = `SELECT s.id as id, s.name as name, s.slug as slug  FROM semesters s`;
    const [semesters] = await db.query(sql);
    if (semesters.length > 0) {
      const response = NextResponse.json(semesters, { status: 200 });
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
