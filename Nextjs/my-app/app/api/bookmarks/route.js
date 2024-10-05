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
    const sql = ""
  } catch (error) {
    console.log("Database error" + error);
  }
}
