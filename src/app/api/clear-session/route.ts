import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Clear the session cookie
  (await cookies()).delete("session");

  // Return a simple JSON response instead of redirecting.
  // The AuthContext calls this via fetch() and handles navigation
  // client-side — a server-side redirect here was contributing to
  // the 304 redirect loop.
  return NextResponse.json({ ok: true });
}
