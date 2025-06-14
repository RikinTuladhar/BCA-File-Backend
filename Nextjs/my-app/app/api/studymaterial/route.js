import { connectToDatabase } from "@/lib/db";
import { addCorsHeaders } from "@/lib/middleware"; // Import the middleware function
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const db = await connectToDatabase();
    const sql = `SELECT * FROM study_materials`;
    const [studymaterial] = await db.query(sql);
    if (studymaterial.length === 0) {
      const response = NextResponse.json([], { status: 200 });
      return addCorsHeaders(response);
    }
    const response = NextResponse.json(studymaterial, { status: 200 });
    return addCorsHeaders(response);
  } catch (error) {
    console.log("Database error: " + error);
    const response = NextResponse.json({ error: "Database error" }, { status: 500 });
    return addCorsHeaders(response);
  }
}
