import * as admin from "firebase-admin";
import { sampleServices } from "../lib/data/sample-services";
import { samplePortfolio } from "../lib/data/sample-portfolio";
import { sampleBlogPosts } from "../lib/data/sample-blog";
import { sampleTestimonials } from "../lib/data/sample-testimonials";
import { samplePricingPlans } from "../lib/data/sample-pricing";
import { siteSettings } from "../lib/data/site-settings";

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

async function seedFirestore() {
  console.log("🌱 Starting RankZee database seeding...");

  // 1. Seed Services
  console.log("Seeding services...");
  for (const svc of sampleServices) {
    await db.collection("services").doc(svc.slug).set({
      ...svc,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // 2. Seed Portfolio
  console.log("Seeding portfolio case studies...");
  for (const item of samplePortfolio) {
    await db.collection("portfolio").doc(item.slug).set({
      ...item,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // 3. Seed Blog Posts
  console.log("Seeding blog posts...");
  for (const post of sampleBlogPosts) {
    await db.collection("blogPosts").doc(post.slug).set({
      ...post,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // 4. Seed Testimonials
  console.log("Seeding testimonials...");
  for (const t of sampleTestimonials) {
    await db.collection("testimonials").add({
      ...t,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // 5. Seed Pricing Plans
  console.log("Seeding pricing plans...");
  for (const p of samplePricingPlans) {
    await db.collection("pricingPlans").doc(p.id).set({
      ...p,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  // 6. Seed Site Settings
  console.log("Seeding site settings...");
  await db.collection("settings").doc("general").set({
    ...siteSettings,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  console.log("✅ Seed completed successfully!");
  process.exit(0);
}

seedFirestore().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

