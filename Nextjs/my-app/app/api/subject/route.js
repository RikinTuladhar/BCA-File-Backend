import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req) {
  const connection = await connectToDatabase();
  try {
    const db = await connectToDatabase();
    const sql = `SELECT s.subject_id as id, s.subject_name as name, s.semester_id as semesterId  FROM subject s`;
    const [subjects] = await db.query(sql);
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
    return NextResponse.json(
      { message: "Error connecting with database" },
      { status: 500 }
    );
  }
}
