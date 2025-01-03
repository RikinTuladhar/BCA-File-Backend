import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { addCorsHeaders } from "@/lib/middleware"; // Import the middleware function
export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    const response = NextResponse.json(
      {
        error: "ID is required",
      },
      {
        status: 400,
      }
    );
    return addCorsHeaders(response);
  }

  const connection = await connectToDatabase();
  try {
    const db = await connectToDatabase();
    const sql = `SELECT s.subject_id as id, s.subject_name as name   FROM subject s  where s.semester_id = ?`;
    const [subjects] = await db.query(sql, [id]);
    if (subjects.length > 0) {
      const response = NextResponse.json(
        subjects,

        { status: 200 }
      );
      return addCorsHeaders(response);
    } else {
      const response = NextResponse.json([], { status: 200 });
      return addCorsHeaders(response);
    }
  } catch (error) {
    console.log("Database error" + error);
  }
}
