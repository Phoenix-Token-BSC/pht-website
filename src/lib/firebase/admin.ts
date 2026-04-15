import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
// import serviceAccount from "../../../service-account.json";

// Try the full JSON key first, fall back to base64, then individual vars
const serviceAccount = (() => {
  // Option 1: Full JSON string
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      return JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    } catch {
      console.warn("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY");
    }
  }

  // Option 2: Base64-encoded JSON
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64) {
    try {
      const jsonStr = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64, 'base64').toString('utf-8');
      return JSON.parse(jsonStr);
    } catch {
      console.warn("Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON_BASE64");
    }
  }

  // Option 3: Individual env vars
  return {
    project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')?.trim(),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  };
})();

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const adminAuth = getAuth();
const adminDb = getFirestore();

export { adminAuth, adminDb };
