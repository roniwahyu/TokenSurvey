import { sql } from "drizzle-orm";
import { pgTable, varchar, text, integer, timestamp, json, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").unique(),
  pesantren: text("pesantren"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  type: varchar("type").notNull(), // 'dass42', 'gse', 'mhkq', 'mscs', 'pdd'
  title: text("title").notNull(),
  questions: json("questions").$type<{ question: string; answer?: number | boolean; options: string[] }[]>(),
  currentQuestion: integer("current_question").default(0),
  isCompleted: boolean("is_completed").default(false),
  results: json("results").$type<{ [key: string]: any }>(),
  progress: integer("progress").default(0), // percentage
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const assessmentResults = pgTable("assessment_results", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assessmentId: varchar("assessment_id").references(() => assessments.id),
  userId: varchar("user_id").references(() => users.id),
  type: varchar("type").notNull(),
  scores: json("scores").$type<{ [key: string]: number }>(),
  categories: json("categories").$type<{ [key: string]: string }>(),
  interpretation: text("interpretation"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  assessmentsCompleted: integer("assessments_completed").default(0),
  assessmentsInProgress: integer("assessments_in_progress").default(0),
  videosWatched: integer("videos_watched").default(0),
  streakDays: integer("streak_days").default(0),
  lastActiveDate: timestamp("last_active_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  name: true,
  email: true,
  pesantren: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).pick({
  userId: true,
  type: true,
  title: true,
  questions: true,
});

export const insertAssessmentResultSchema = createInsertSchema(assessmentResults).pick({
  assessmentId: true,
  userId: true,
  type: true,
  scores: true,
  categories: true,
  interpretation: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;

export type InsertAssessmentResult = z.infer<typeof insertAssessmentResultSchema>;
export type AssessmentResult = typeof assessmentResults.$inferSelect;

export type UserProgress = typeof userProgress.$inferSelect;
