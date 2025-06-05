import { pgTable, text, serial, integer, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const emissionEntries = pgTable("emission_entries", {
  id: serial("id").primaryKey(),
  componentType: text("component_type").notNull(),
  quantity: decimal("quantity", { precision: 12, scale: 4 }).notNull(),
  date: text("date").notNull(),
  calorificValue: decimal("calorific_value", { precision: 12, scale: 4 }),
  emissionFactor: decimal("emission_factor", { precision: 12, scale: 6 }).notNull(),
  density: decimal("density", { precision: 12, scale: 4 }),
  costInr: decimal("cost_inr", { precision: 12, scale: 2 }),
  notes: text("notes"),
  co2Emissions: decimal("co2_emissions", { precision: 12, scale: 6 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEmissionEntrySchema = createInsertSchema(emissionEntries).omit({
  id: true,
  co2Emissions: true,
  createdAt: true,
}).extend({
  quantity: z.coerce.number().positive("Quantity must be positive"),
  calorificValue: z.coerce.number().positive().optional(),
  emissionFactor: z.coerce.number().positive("Emission factor must be positive"),
  density: z.coerce.number().positive().optional(),
  costInr: z.coerce.number().positive().optional(),
  date: z.string().min(1, "Date is required"),
  componentType: z.enum(["coal", "diesel", "natural-gas", "electricity"], {
    errorMap: () => ({ message: "Please select a valid component type" })
  }),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEmissionEntry = z.infer<typeof insertEmissionEntrySchema>;
export type EmissionEntry = typeof emissionEntries.$inferSelect;
