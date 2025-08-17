
import { db } from "./db.js";
import { users, assessments, assessmentResults, userProgress, assessmentSessions } from "../shared/schema.js";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export async function initializeDatabase() {
  try {
    console.log("Initializing database tables...");
    
    // Create demo user if it doesn't exist
    const demoUserId = "demo-user";
    
    // Check if demo user exists
    const existingUser = await db.select().from(users).where(eq(users.id, demoUserId)).limit(1);
    
    if (existingUser.length === 0) {
      await db.insert(users).values({
        id: demoUserId,
        name: "Demo User",
        email: "demo@tokenpedia.com",
        pesantren: "Pondok Pesantren Demo"
      });
      console.log("Demo user created");
    }
    
    // Initialize user progress for demo user
    const existingProgress = await db.select().from(userProgress).where(eq(userProgress.userId, demoUserId)).limit(1);
    
    if (existingProgress.length === 0) {
      await db.insert(userProgress).values({
        id: randomUUID(),
        userId: demoUserId,
        assessmentsCompleted: 0,
        assessmentsInProgress: 0,
        videosWatched: 0,
        materialsDownloaded: 0,
        streakDays: 0,
        totalTimeSpent: 0
      });
      console.log("Demo user progress initialized");
    }
    
    console.log("Database initialization completed");
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
}
