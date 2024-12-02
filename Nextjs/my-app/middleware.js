import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

const protectedRoutes = ["/","/add","/show","/edit","/show-subject-content"]; //if validate can go inside this route
const publicRoutes = ["/login"];        //if not valid then go here

export default async function middleware(req) {
  const path = req.nextUrl.pathname;  //route name
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);  //sending to decrypt function that is in side session & returns object   that has session:{ userId: string;expiresAt: Date;} from session.ts

//trying to go inside protected route but doesnot have session id then go to login
  if (isProtectedRoute && !session?.username) { 
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

//trying to go inside public route but does exist session, then to dashboard as if you are already in dash board then with out logout you should not see login page
  if (isPublicRoute && session?.username) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}