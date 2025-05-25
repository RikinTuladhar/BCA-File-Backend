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
    const sql = `SELECT s.id as id, s.name as name, s.slug as slug, s.semester_id as semester_id FROM subjects s WHERE s.semester_id = ?`;
    const [subjects] = await db.query(sql, [id]);

    // For each subject, fetch its files and attach them
    const subjectsWithFiles = await Promise.all(
      subjects.map(async (subject) => {
        const filesSql = `SELECT f.id as file_id, f.name as file_name, f.subject_id as subject_id, f.url as file_url FROM files f WHERE f.subject_id = ?`;
        const [files] = await db.query(filesSql, [subject.id]);
        return { ...subject, files }; // Attach files array to subject
      })
    );

    const response = NextResponse.json(subjectsWithFiles, { status: 200 });
    return addCorsHeaders(response);
  } catch (error) {
    console.log("Database error: " + error);
    const response = NextResponse.json({ error: "Database error" }, { status: 500 });
    return addCorsHeaders(response);
  }
}
