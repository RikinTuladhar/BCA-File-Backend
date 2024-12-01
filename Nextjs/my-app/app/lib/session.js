'use server'
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const secretKey = "Secret";
const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(username) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // for 7 days
  const session = await encrypt({ username, expiresAt });

  (await cookies()).set("session", session, {
    secure: true,
    expires: expiresAt,
  });
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
  //returns jwt string
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}