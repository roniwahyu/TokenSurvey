import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAssessmentSchema, insertAssessmentResultSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/users", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  app.get("/api/users/:id/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.id);
      if (!progress) {
        return res.status(404).json({ message: "User progress not found" });
      }
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Assessment routes
  app.get("/api/assessments/:id", async (req, res) => {
    try {
      const assessment = await storage.getAssessment(req.params.id);
      if (!assessment) {
        return res.status(404).json({ message: "Assessment not found" });
      }
      res.json(assessment);
    } catch (error) {
      console.error("Error fetching assessment:", error);
      res.status(500).json({ message: "Failed to fetch assessment" });
    }
  });

  app.post("/api/assessments", async (req, res) => {
    try {
      const assessmentData = insertAssessmentSchema.parse(req.body);
      const assessment = await storage.createAssessment(assessmentData);
      res.json(assessment);
    } catch (error) {
      console.error("Error creating assessment:", error);
      res.status(400).json({ message: "Invalid assessment data" });
    }
  });

  app.put("/api/assessments/:id", async (req, res) => {
    try {
      const { questions, currentQuestion, progress, isCompleted, results } = req.body;
      const assessment = await storage.updateAssessment(req.params.id, {
        questions,
        currentQuestion,
        progress,
        isCompleted,
        results,
      });
      res.json(assessment);
    } catch (error) {
      console.error("Error updating assessment:", error);
      res.status(500).json({ message: "Failed to update assessment" });
    }
  });

  app.get("/api/users/:userId/assessments", async (req, res) => {
    try {
      const { type } = req.query;
      let assessments;
      
      if (type) {
        assessments = await storage.getAssessmentsByType(req.params.userId, type as string);
      } else {
        assessments = await storage.getUserAssessments(req.params.userId);
      }
      
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching user assessments:", error);
      res.status(500).json({ message: "Failed to fetch assessments" });
    }
  });

  // Assessment results routes
  app.post("/api/assessment-results", async (req, res) => {
    try {
      const resultData = insertAssessmentResultSchema.parse(req.body);
      const result = await storage.createAssessmentResult(resultData);
      
      // Update user progress
      if (resultData.userId) {
        const progress = await storage.getUserProgress(resultData.userId);
        if (progress) {
          await storage.updateUserProgress(resultData.userId, {
            assessmentsCompleted: (progress.assessmentsCompleted || 0) + 1,
            assessmentsInProgress: Math.max(0, (progress.assessmentsInProgress || 0) - 1),
          });
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
      const results = await storage.getUserAssessmentResults(req.params.userId);
      res.json(results);
    } catch (error) {
      console.error("Error fetching user results:", error);
      res.status(500).json({ message: "Failed to fetch results" });
    }
  });

  app.get("/api/assessment-results/:assessmentId", async (req, res) => {
    try {
      const result = await storage.getAssessmentResult(req.params.assessmentId);
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
      const { assessmentsInProgress, videosWatched, streakDays } = req.body;
      const progress = await storage.updateUserProgress(req.params.userId, {
        assessmentsInProgress,
        videosWatched,
        streakDays,
        lastActiveDate: new Date(),
      });
      res.json(progress);
    } catch (error) {
      console.error("Error updating user progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
