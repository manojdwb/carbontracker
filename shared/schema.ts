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
  businessCenter: text("business_center").notNull(),
  operationSite: text("operation_site").notNull(), 
  profitCenter: text("profit_center").notNull(),
  plantName: text("plant_name").notNull(),
  componentName: text("component_name").notNull(),
  dateOfEntry: text("date_of_entry").notNull(),
  scope: text("scope").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  quantity: decimal("quantity", { precision: 12, scale: 4 }).notNull(),
  costInr: decimal("cost_inr", { precision: 12, scale: 2 }),
  vendorName: text("vendor_name").notNull(),
  emissionFactor: decimal("emission_factor", { precision: 12, scale: 6 }).notNull(),
  calorificValue: decimal("calorific_value", { precision: 12, scale: 4 }),
  density: decimal("density", { precision: 12, scale: 4 }),
  co2Emissions: decimal("co2_emissions", { precision: 12, scale: 6 }).notNull(),
  remarks: text("remarks"),
  completionStatus: text("completion_status").notNull().default("Pending"),
  dataOwner: text("data_owner"),
  dataVerifier: text("data_verifier"), 
  dataApprover: text("data_approver"),
  dataAssurer: text("data_assurer"),
  dataAudited: text("data_audited"),
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
  businessCenter: z.string().min(1, "Business Center is required"),
  operationSite: z.string().min(1, "Operation Site is required"),
  profitCenter: z.string().min(1, "Profit Center is required"),
  plantName: z.string().min(1, "Plant Name is required"),
  componentName: z.enum(["coal", "diesel", "natural-gas", "electricity"], {
    errorMap: () => ({ message: "Please select a valid component" })
  }),
  dateOfEntry: z.string().min(1, "Date of Entry is required"),
  scope: z.enum(["scope-1", "scope-2", "scope-3"], {
    errorMap: () => ({ message: "Please select a valid emission scope" })
  }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  quantity: z.coerce.number().positive("Quantity must be positive"),
  costInr: z.coerce.number().positive().optional(),
  vendorName: z.string().min(1, "Vendor Name is required"),
  emissionFactor: z.coerce.number().positive("Emission factor must be positive"),
  calorificValue: z.coerce.number().positive().optional(),
  density: z.coerce.number().positive().optional(),
  remarks: z.string().optional(),
  completionStatus: z.string().optional(),
  dataOwner: z.string().optional(),
  dataVerifier: z.string().optional(),
  dataApprover: z.string().optional(),
  dataAssurer: z.string().optional(),
  dataAudited: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEmissionEntry = z.infer<typeof insertEmissionEntrySchema>;
export type EmissionEntry = typeof emissionEntries.$inferSelect;
