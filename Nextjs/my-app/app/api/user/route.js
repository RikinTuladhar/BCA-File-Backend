import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(req) {
  const data = await req.json();
  const { username, password } = data;
  // console.log(username, password)
  // console.log(data);

  try {
    const db = await connectToDatabase();
    const sql = "SELECT * FROM user where username = ? and password = ?";
    const [user] = await db.query(sql, [username, password]);
    const found = user.find((i) => i.username == username);
    if (found) {
      const object = {
        id: found?.id,
        role: found?.role,
        username: found?.username,
      };
      return NextResponse.json(object, { status: 200 });
    } else {
      return NextResponse.json({ message: "not found" }, { status: 401 });
    }
  } catch (error) {
    console.log(error);
  }
}
