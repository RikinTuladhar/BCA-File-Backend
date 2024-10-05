import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      {
        error: "ID is required",
      },
      {
        status: 400,
      }
    );
  }

  const connection = await connectToDatabase();
  try {
    const db = await connectToDatabase();
    const sql = `SELECT s.subject_id as id, s.subject_name as name   FROM subject s  where s.semester_id = ?`;
    const [subjects] = await db.query(sql, [id]);
    if (subjects.length > 0) {
      return NextResponse.json(
        subjects,

        { status: 200 }
      );
    } else {
      return NextResponse.json([], { status: 200 });
    }
  } catch (error) {
    console.log("Database error" + error);
  }
}
