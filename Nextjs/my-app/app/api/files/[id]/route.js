// SELECT f.file_id as id, f.file_name as name,f.file_path as filePath,s.subject_name as subjectName FROM defaultdb.file_model f inner join defaultdb.subject s on f.subjectid = s.subject_id  where f.subjectid = 32;

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
    const sql = `SELECT f.file_id as id, f.file_name as name,f.file_path as filePath,s.subject_name as subjectName FROM file_model f inner join subject s on f.subjectid = s.subject_id  where f.subjectid = ?`;
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
