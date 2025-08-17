import type { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "@/server/db";
import {
  users,
  assessments,
  assessmentResults,
  insertUserSchema,
  insertAssessmentSchema,
  insertAssessmentResultSchema
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

// Database connection helper with error handling
async function safeDbQuery<T>(operation: () => Promise<T>): Promise<T | null> {
  try {
    return await operation();
  } catch (error) {
    console.error('Database operation failed:', error);
    return null;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await safeDbQuery(() => storage.createUser(userData));
      if (!user) {
        return res.status(500).json({ message: "Failed to create user" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  // Get user by ID
  app.get("/api/users/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await safeDbQuery(() =>
        db.select().from(users).where(eq(users.id, parseInt(id)))
      );

      if (!user || user.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user[0]);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Get user progress
  app.get("/api/users/:id/progress", async (req, res) => {
    try {
      const { id } = req.params;

      // Get completed assessments count
      const completedAssessments = await safeDbQuery(() =>
        db.select()
          .from(assessmentResults)
          .where(and(
            eq(assessmentResults.userId, parseInt(id)),
            eq(assessmentResults.isCompleted, true)
          ))
      );

      // Get in-progress assessments count
      const progressAssessments = await safeDbQuery(() =>
        db.select()
          .from(assessments)
          .where(and(
            eq(assessments.userId, parseInt(id)),
            eq(assessments.isCompleted, false)
          ))
      );

      res.json({
        assessmentsCompleted: completedAssessments?.length || 0,
        assessmentsInProgress: progressAssessments?.length || 0,
        videosWatched: 0 // This would come from a videos watched table
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Get user assessments
  app.get("/api/users/:id/assessments", async (req, res) => {
    try {
      const { id } = req.params;
      const userAssessments = await safeDbQuery(() =>
        db.select()
          .from(assessments)
          .where(eq(assessments.userId, parseInt(id)))
          .orderBy(desc(assessments.createdAt))
      );

      res.json(userAssessments || []);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  // Assessment routes
  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const assessment = await safeDbQuery(() =>
        db.select().from(assessments).where(eq(assessments.id, parseInt(id)))
      );

      if (!assessment || assessment.length === 0) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      res.json(assessment[0]);
    } catch (error) {
      console.error("Error fetching assessment:", error);
      res.status(500).json({ message: "Failed to fetch assessment" });
    }
  });

  app.post("/api/assessments", async (req, res) => {
    try {
      const assessmentData = insertAssessmentSchema.parse(req.body);
      const assessment = await safeDbQuery(() => storage.createAssessment(assessmentData));
      if (!assessment) {
        return res.status(500).json({ message: "Failed to create assessment" });
      }
      res.json(assessment);
    } catch (error) {
      console.error("Error creating assessment:", error);
      res.status(400).json({ message: "Invalid assessment data" });
    }
  });

  app.put("/api/assessments/:id", async (req, res) => {
    try {
      const { questions, currentQuestion, progress, isCompleted, results } = req.body;
      const assessment = await safeDbQuery(() => storage.updateAssessment(req.params.id, {
        questions,
        currentQuestion,
        progress,
        isCompleted,
        results,
      }));
      if (!assessment) {
        return res.status(500).json({ message: "Failed to update assessment" });
      }
      res.json(assessment);
    } catch (error) {
      console.error("Error updating assessment:", error);
      res.status(500).json({ message: "Failed to update assessment" });
    }
  });

  // Assessment results routes
  app.post("/api/assessment-results", async (req, res) => {
    try {
      const resultData = insertAssessmentResultSchema.parse(req.body);
      const result = await safeDbQuery(() => storage.createAssessmentResult(resultData));
      if (!result) {
        return res.status(500).json({ message: "Failed to create assessment result" });
      }

      // Update user progress
      if (resultData.userId) {
        const currentProgress = await safeDbQuery(() => storage.getUserProgress(resultData.userId));
        if (currentProgress) {
          await safeDbQuery(() => storage.updateUserProgress(resultData.userId, {
            assessmentsCompleted: (currentProgress.assessmentsCompleted || 0) + 1,
            assessmentsInProgress: Math.max(0, (currentProgress.assessmentsInProgress || 0) - 1),
          }));
        }
      }

      res.json(result);
    } catch (error) {
      console.error("Error creating assessment result:", error);
      res.status(400).json({ message: "Invalid result data" });
    }
  });

  app.get("/api/users/:userId/results", async (req, res) => {
    try {
      const { userId } = req.params;
      const results = await safeDbQuery(() => storage.getUserAssessmentResults(userId));
      res.json(results || []);
    } catch (error) {
      console.error("Error fetching user results:", error);
      res.status(500).json({ message: "Failed to fetch results" });
    }
  });

  // Complete assessment with scoring and interpretation
  app.post("/api/users/:userId/assessments/:assessmentId/complete", async (req, res) => {
    try {
      const { userId, assessmentId } = req.params;
      const { answers, type } = req.body;

      // Calculate scores and interpretation using dynamic import
      const { calculateAssessmentScore } = await import("../client/src/lib/assessmentLogic.js");
      const result = calculateAssessmentScore(type, answers);

      // Save assessment result
      const assessmentResult = await safeDbQuery(() => storage.createAssessmentResult({
        assessmentId,
        userId,
        type,
        scores: result.subscales || { total: result.totalScore },
        categories: { severity: result.severity },
        interpretation: result.interpretation
      }));
      if (!assessmentResult) {
        return res.status(500).json({ message: "Failed to save assessment result" });
      }

      // Update assessment as completed
      await safeDbQuery(() => storage.updateAssessment(assessmentId, {
        isCompleted: true,
        results: result,
        progress: 100
      }));

      // Complete assessment session
      await safeDbQuery(() => storage.completeAssessmentSession(userId, type));

      // Update user progress
      const currentProgress = await safeDbQuery(() => storage.getUserProgress(userId));
      await safeDbQuery(() => storage.updateUserProgress(userId, {
        assessmentsCompleted: (currentProgress?.assessmentsCompleted || 0) + 1,
        assessmentsInProgress: Math.max((currentProgress?.assessmentsInProgress || 1) - 1, 0)
      }));

      res.json({
        success: true,
        result: assessmentResult,
        scores: result
      });
    } catch (error) {
      console.error("Error completing assessment:", error);
      res.status(500).json({ message: "Failed to complete assessment" });
    }
  });

  app.get("/api/assessment-results/:assessmentId", async (req, res) => {
    try {
      const { assessmentId } = req.params;
      const result = await safeDbQuery(() => storage.getAssessmentResult(assessmentId));
      if (!result) {
        return res.status(404).json({ message: "Assessment result not found" });
      }
      res.json(result);
    } catch (error) {
      console.error("Error fetching assessment result:", error);
      res.status(500).json({ message: "Failed to fetch result" });
    }
  });

  // Progress tracking
  app.put("/api/users/:userId/progress", async (req, res) => {
    try {
      const { userId } = req.params;
      const { assessmentsInProgress, videosWatched, streakDays } = req.body;
      const progress = await safeDbQuery(() => storage.updateUserProgress(userId, {
        assessmentsInProgress,
        videosWatched,
        streakDays,
        lastActiveDate: new Date(),
      }));
      if (!progress) {
        return res.status(500).json({ message: "Failed to update user progress" });
      }
      res.json(progress);
    } catch (error) {
      console.error("Error updating user progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Assessment session management routes
  app.post("/api/users/:userId/assessment-sessions", async (req, res) => {
    try {
      const { userId } = req.params;
      const sessionData = req.body;
      const session = await safeDbQuery(() => storage.saveAssessmentSession(userId, sessionData));
      if (!session) {
        return res.status(500).json({ message: "Failed to save assessment session" });
      }
      res.json(session);
    } catch (error) {
      console.error("Error saving assessment session:", error);
      res.status(500).json({ message: "Failed to save assessment session" });
    }
  });

  app.get("/api/users/:userId/assessment-sessions/:assessmentType", async (req, res) => {
    try {
      const { userId, assessmentType } = req.params;
      const session = await safeDbQuery(() => storage.getAssessmentSession(userId, assessmentType));
      res.json(session || null);
    } catch (error) {
      console.error("Error fetching assessment session:", error);
      res.status(500).json({ message: "Failed to fetch assessment session" });
    }
  });

  app.post("/api/users/:userId/assessment-sessions/:assessmentType/exit", async (req, res) => {
    try {
      const { userId, assessmentType } = req.params;
      const updatedSession = await safeDbQuery(() => storage.incrementSessionExit(userId, assessmentType));
      if (!updatedSession) {
        return res.status(500).json({ message: "Failed to update exit count" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error incrementing exit count:", error);
      res.status(500).json({ message: "Failed to update exit count" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}