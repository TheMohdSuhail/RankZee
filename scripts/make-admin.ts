import * as admin from "firebase-admin";

const targetEmail = process.argv[2];

if (!targetEmail) {
  console.error("Usage: npx ts-node scripts/make-admin.ts <user-email>");
  process.exit(1);
}

// Initialize Admin SDK with default credentials
if (!admin.apps.length) {
  admin.initializeApp();
}

async function promoteToAdmin(email: string) {
  try {
    console.log(`Locating user with email: ${email}...`);
    const user = await admin.auth().getUserByEmail(email);

    console.log(`Setting custom claim 'admin: true' for UID: ${user.uid}...`);
    await admin.auth().setCustomUserClaims(user.uid, {
      admin: true,
      role: "admin",
    });

    console.log(`Updating Firestore document in 'users/${user.uid}'...`);
    await admin.firestore().collection("users").doc(user.uid).set(
      {
        role: "admin",
        isAdmin: true,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    console.log(`✅ Success! ${email} has been promoted to Admin.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error promoting user:", error);
    process.exit(1);
  }
}

promoteToAdmin(targetEmail);

