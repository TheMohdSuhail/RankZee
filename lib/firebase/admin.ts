import * as admin from "firebase-admin";

function formatPrivateKey(key?: string): string | undefined {
  if (!key) return undefined;
  // Handle literal "\n" strings in env variable
  return key.replace(/\\n/g, "\n");
}

let adminApp: admin.app.App;

export function getAdminApp(): admin.app.App {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_PRIVATE_KEY;
  const privateKey = formatPrivateKey(rawKey);

  if (projectId && clientEmail && privateKey) {
    adminApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });
  } else {
    // Fallback for build time or development without credentials
    adminApp = admin.initializeApp({
      projectId: projectId || "rankzee-marketing",
    });
  }

  return adminApp;
}

export const adminDb = () => getAdminApp().firestore();
export const adminAuth = () => getAdminApp().auth();
export const adminStorage = () => getAdminApp().storage();

