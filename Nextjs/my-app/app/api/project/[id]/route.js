import { connectToDatabase } from "@/lib/db";
import { addCorsHeaders } from "@/lib/middleware"; // Import the middleware function
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    const response = NextResponse.json({ error: "ID is required" }, { status: 400 });
    return addCorsHeaders(response);
  }

  try {
    const db = await connectToDatabase();
    const sql = `SELECT * FROM projects WHERE id = ?`;
    const [projects] = await db.query(sql, [id]);

    if (projects.length === 0) {
      const response = NextResponse.json({ error: "Project not found" }, { status: 404 });
      return addCorsHeaders(response);
    }

    // ✅ Return the first project object
    const response = NextResponse.json(projects[0], { status: 200 });
    return addCorsHeaders(response);
  } catch (error) {
    console.error("Database error:", error);
    const response = NextResponse.json({ error: "Database error" }, { status: 500 });
    return addCorsHeaders(response);
  }
}
