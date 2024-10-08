// SELECT f.file_id as id, f.file_name as name,f.file_path as filePath,s.subject_name as subjectName FROM defaultdb.file_model f inner join defaultdb.subject s on f.subjectid = s.subject_id  where f.subjectid = 32;

import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import { addCorsHeaders } from "@/lib/middleware";

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
    const sql = `SELECT f.file_id as id, f.file_name as name,f.file_path as filePath,s.subject_name as subjectName FROM file_model f inner join subject s on f.subjectid = s.subject_id  where f.subjectid = ?`;
    const [subjects] = await db.query(sql, [id]);
    if (subjects.length > 0) {
      const response = NextResponse.json(subjects.length > 0 ? subjects : [], {
        status: 200,
      });
      return addCorsHeaders(response); // Add CORS headers to the response
    } else {
      const response = NextResponse.json([], { status: 200 });
      return addCorsHeaders(response);
    }
  } catch (error) {
    console.log("Database error" + error);
  }
}


