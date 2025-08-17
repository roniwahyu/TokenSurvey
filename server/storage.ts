
import {
  users,
  assessments,
  assessmentResults,
  userProgress,
  assessmentSessions,
  type User,
  type InsertUser,
  type Assessment,
  type InsertAssessment,
  type AssessmentResult,
  type InsertAssessmentResult,
  type UserProgress,
} from "../shared/schema.js";
import { db } from "./db.js";
import { eq, and, desc, sql } from "drizzle-orm";
import { randomUUID } from "crypto";

class DatabaseStorage {
  // User operations
  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({
      ...insertUser,
      id: insertUser.id || randomUUID()
    }).returning();
    return user;
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Assessment operations
  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const [assessment] = await db.insert(assessments).values({
      ...insertAssessment,
      id: randomUUID()
    }).returning();
    return assessment;
  }

  async getAssessment(id: string): Promise<Assessment | undefined> {
    const [assessment] = await db
      .select()
      .from(assessments)
      .where(eq(assessments.id, id));
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
    const [result] = await db.insert(assessmentResults).values({
      ...insertResult,
      id: randomUUID()
    }).returning();
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
    // First try to update existing record
    const existing = await this.getUserProgress(userId);
    
    if (existing) {
      const [progress] = await db
        .update(userProgress)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(userProgress.userId, userId))
        .returning();
      return progress;
    } else {
      // Create new progress record if it doesn't exist
      const [progress] = await db
        .insert(userProgress)
        .values({ 
          id: randomUUID(),
          userId, 
          ...data 
        })
        .returning();
      return progress;
    }
  }

  // Assessment session management for auto-save functionality
  async saveAssessmentSession(userId: string, sessionData: {
    assessmentType: string;
    currentQuestion: number;
    totalQuestions: number;
    answers: { [key: string]: number | boolean };
    sessionData?: { [key: string]: any };
  }): Promise<any> {
    // Check if session exists
    const existing = await this.getAssessmentSession(userId, sessionData.assessmentType);
    
    if (existing) {
      // Update existing session
      const [session] = await db
        .update(assessmentSessions)
        .set({
          currentQuestion: sessionData.currentQuestion,
          totalQuestions: sessionData.totalQuestions,
          answers: sessionData.answers,
          sessionData: sessionData.sessionData || {},
          lastSavedAt: new Date(),
        })
        .where(and(
          eq(assessmentSessions.userId, userId),
          eq(assessmentSessions.assessmentType, sessionData.assessmentType)
        ))
        .returning();
      return session;
    } else {
      // Create new session
      const [session] = await db
        .insert(assessmentSessions)
        .values({
          id: randomUUID(),
          userId,
          ...sessionData,
          lastSavedAt: new Date(),
        })
        .returning();
      return session;
    }
  }

  async getAssessmentSession(userId: string, assessmentType: string): Promise<any> {
    const [session] = await db
      .select()
      .from(assessmentSessions)
      .where(
        and(
          eq(assessmentSessions.userId, userId),
          eq(assessmentSessions.assessmentType, assessmentType),
          eq(assessmentSessions.isCompleted, false)
        )
      );
    return session;
  }

  async completeAssessmentSession(userId: string, assessmentType: string): Promise<void> {
    await db
      .update(assessmentSessions)
      .set({
        isCompleted: true,
        completedAt: new Date(),
      })
      .where(
        and(
          eq(assessmentSessions.userId, userId),
          eq(assessmentSessions.assessmentType, assessmentType)
        )
      );
  }

  async incrementSessionExit(userId: string, assessmentType: string): Promise<any> {
    const [session] = await db
      .update(assessmentSessions)
      .set({
        exitCount: sql`${assessmentSessions.exitCount} + 1`,
        lastSavedAt: new Date(),
      })
      .where(
        and(
          eq(assessmentSessions.userId, userId),
          eq(assessmentSessions.assessmentType, assessmentType)
        )
      )
      .returning();
    return session;
  }
}

export const storage = new DatabaseStorage();
