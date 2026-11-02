const admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");

// Load .env.local if present
try {
  const envPath = path.resolve(__dirname, "../.env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = rest.join("=").replace(/^"(.*)"$/, "$1").replace(/^'(.*)'$/, "$1").trim();
      }
    }
  }
} catch (e) {
  // ignore
}

const targetEmail = process.argv[2];

if (!targetEmail) {
  console.log("Usage: node scripts/make-admin.js <user-email>");
  process.exit(1);
}

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "rankzee-36b30";
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n") : undefined;

  if (clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } else {
    admin.initializeApp({
      projectId,
    });
  }
}

async function promote(email) {
  try {
    console.log(`Locating user with email: ${email}...`);
    const user = await admin.auth().getUserByEmail(email);

    console.log(`Setting custom claim 'admin: true' for UID: ${user.uid}...`);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
      role: "admin",
    });

    console.log(`Updating user document in Firestore...`);
    await admin.firestore().collection("users").doc(user.uid).set(
      {
        role: "admin",
        isAdmin: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    console.log(`✅ Success! ${email} (${user.uid}) is now an Administrator.`);
    process.exit(0);
  } catch (err) {
    console.error("❌ Promotion failed:", err.message);
    process.exit(1);
  }
}

promote(targetEmail);

