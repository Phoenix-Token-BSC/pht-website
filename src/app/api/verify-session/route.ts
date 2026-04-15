import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebase/admin";

/**
 * GET /api/verify-session
 *
 * Lightweight endpoint the login page calls before redirecting to the
 * dashboard.  It performs the exact same checks as the admin layout
 * (valid token + Firestore whitelist) but returns a simple 200 / 401
 * instead of triggering a server-side redirect – which is what was
 * causing the redirect loop.
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;

    if (!session) {
      console.error("verify-session: No session cookie found");
      return NextResponse.json({ ok: false, reason: "no_session" }, { status: 401 });
    }

    console.log("verify-session: Session cookie found, length:", session.length);

    const decodedToken = await adminAuth.verifyIdToken(session);
    const email = decodedToken.email;
    console.log("verify-session: Token verified, email:", email);

    if (!email) {
      console.error("verify-session: No email in decoded token");
      return NextResponse.json({ ok: false, reason: "no_email" }, { status: 401 });
    }

    // Check Firestore admin whitelist
    const adminDoc = await adminDb.collection("admins").doc(email).get();

    if (!adminDoc.exists) {
      console.warn("verify-session: Email not in admin whitelist:", email);
      return NextResponse.json({ ok: false, reason: "unauthorized" }, { status: 403 });
    }

    console.log("verify-session: Access granted for", email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("verify-session: Verification failed:", error);
    return NextResponse.json({ ok: false, reason: "verification_error" }, { status: 401 });
  }
}
