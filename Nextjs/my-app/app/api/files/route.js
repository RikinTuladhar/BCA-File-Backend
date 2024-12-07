import { decrypt } from "@/app/lib/session";
import { connectToDatabase } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const db = await connectToDatabase();
    const sql = "SELECT COUNT(*) as total_file FROM file_model";
    const [file] = await db.query(sql);
    const [total_file] = await file;
    const totalFiles = total_file.total_file;
    return NextResponse.json({ message: totalFiles });
  } catch (error) {
    return NextResponse.json({ message: "Error when fetching files count" });
  }
}

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const subjectid = searchParams.get("subjectid");
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header missing or invalid" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  const session = await decrypt(token);
  if (!session?.username) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!subjectid) {
    return NextResponse.json(
      { message: "No Subject Id Passed" },
      { status: 404 }
    );
  }

  try {
    const db = await connectToDatabase();
    const selectQuery = "SELECT * FROM subject WHERE subject_id = ?";
    const [count] = await db.query(selectQuery, [subjectid]);
    if (count.length == 0) {
      return NextResponse.json(
        { message: "Subject Id doesnot exist" },
        { status: 404 }
      );
    }

    const data = await req.json();
    const { file_name, file_path } = data;
    if (!file_name && !file_path) {
      return NextResponse.json(
        { message: "File name and File path does not exist" },
        { status: 404 }
      );
    }

    const sql =
      "INSERT INTO file_model(file_name,file_path,subjectid)value(?,?,?)";
    await db.query(sql, [file_name, file_path, subjectid]);
    return NextResponse.json({ message: "Inserted" });
  } catch (error) {
    console.log("Error", error);
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const file_id = searchParams.get("file_id");
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return NextResponse.json(
      { message: "No Authentication token" },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  const session = await decrypt(token);
  if (!session?.username) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  if (!file_id) {
    return NextResponse.json({ message: "No File Id Passed" }, { status: 404 });
  }

  try {
    const db = await connectToDatabase();
    const sql = "Delete from file_model where file_id = ?";
    await db.query(sql, [file_id]);
    return NextResponse.json({
      message: "Deleted File Successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error when deleting file", error });
  }
}
