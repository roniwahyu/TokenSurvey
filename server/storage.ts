import {
  users,
  assessments,
  assessmentResults,
  userProgress,
  type User,
  type InsertUser,
  type Assessment,
  type InsertAssessment,
  type AssessmentResult,
  type InsertAssessmentResult,
  type UserProgress,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  
  // Assessment operations
  getAssessment(id: string): Promise<Assessment | undefined>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  updateAssessment(id: string, data: Partial<Assessment>): Promise<Assessment>;
  getUserAssessments(userId: string): Promise<Assessment[]>;
  getAssessmentsByType(userId: string, type: string): Promise<Assessment[]>;
  
  // Assessment results operations
  createAssessmentResult(result: InsertAssessmentResult): Promise<AssessmentResult>;
  getAssessmentResult(assessmentId: string): Promise<AssessmentResult | undefined>;
  getUserAssessmentResults(userId: string): Promise<AssessmentResult[]>;
  
  // User progress operations
  getUserProgress(userId: string): Promise<UserProgress | undefined>;
  updateUserProgress(userId: string, data: Partial<UserProgress>): Promise<UserProgress>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    
    // Create initial user progress
    await db.insert(userProgress).values({
      userId: user.id,
      assessmentsCompleted: 0,
      assessmentsInProgress: 0,
      videosWatched: 0,
      streakDays: 0,
    });
    
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  // Assessment operations
  async getAssessment(id: string): Promise<Assessment | undefined> {
    const [assessment] = await db.select().from(assessments).where(eq(assessments.id, id));
    return assessment;
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const [assessment] = await db.insert(assessments).values({
      ...insertAssessment,
      currentQuestion: 0,
      progress: 0,
      isCompleted: false,
      results: null
    }).returning();
    return assessment;
  }

  async updateAssessment(id: string, data: Partial<Assessment>): Promise<Assessment> {
    const [assessment] = await db
      .update(assessments)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(assessments.id, id))
      .returning();
    return assessment;
  }

  async getUserAssessments(userId: string): Promise<Assessment[]> {
    return await db
      .select()
      .from(assessments)
      .where(eq(assessments.userId, userId))
      .orderBy(desc(assessments.updatedAt));
  }

  async getAssessmentsByType(userId: string, type: string): Promise<Assessment[]> {
    return await db
      .select()
      .from(assessments)
      .where(and(eq(assessments.userId, userId), eq(assessments.type, type)))
      .orderBy(desc(assessments.updatedAt));
  }

  // Assessment results operations
  async createAssessmentResult(insertResult: InsertAssessmentResult): Promise<AssessmentResult> {
    const [result] = await db.insert(assessmentResults).values(insertResult).returning();
    return result;
  }

  async getAssessmentResult(assessmentId: string): Promise<AssessmentResult | undefined> {
    const [result] = await db
      .select()
      .from(assessmentResults)
      .where(eq(assessmentResults.assessmentId, assessmentId));
    return result;
  }

  async getUserAssessmentResults(userId: string): Promise<AssessmentResult[]> {
    return await db
      .select()
      .from(assessmentResults)
      .where(eq(assessmentResults.userId, userId))
      .orderBy(desc(assessmentResults.createdAt));
  }

  // User progress operations
  async getUserProgress(userId: string): Promise<UserProgress | undefined> {
    const [progress] = await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId));
    return progress;
  }

  async updateUserProgress(userId: string, data: Partial<UserProgress>): Promise<UserProgress> {
    const [progress] = await db
      .update(userProgress)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(userProgress.userId, userId))
      .returning();
    return progress;
  }
}

export const storage = new DatabaseStorage();
