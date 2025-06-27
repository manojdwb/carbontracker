import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertEmissionEntrySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all emission entries
  app.get("/api/emissions", async (req, res) => {
    try {
      const entries = await storage.getEmissionEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch emission entries" });
    }
  });

  // Create new emission entry
  app.post("/api/emissions", async (req, res) => {
    try {
      const validatedData = insertEmissionEntrySchema.parse(req.body);
      const entry = await storage.createEmissionEntry(validatedData);
      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to create emission entry" });
      }
    }
  });

  // Get emissions summary (must come before :id route)
  app.get("/api/emissions/summary", async (req, res) => {
    try {
      const summary = await storage.getEmissionsSummary();
      res.json(summary);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch emissions summary" });
    }
  });

  // Get emission entry by ID
  app.get("/api/emissions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const entry = await storage.getEmissionEntry(id);
      if (!entry) {
        return res.status(404).json({ message: "Emission entry not found" });
      }
      res.json(entry);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch emission entry" });
    }
  });

  // Update emission entry
  app.put("/api/emissions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertEmissionEntrySchema.partial().parse(req.body);
      const entry = await storage.updateEmissionEntry(id, validatedData);
      if (!entry) {
        return res.status(404).json({ message: "Emission entry not found" });
      }
      res.json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Failed to update emission entry" });
      }
    }
  });

  // Delete emission entry
  app.delete("/api/emissions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteEmissionEntry(id);
      if (!deleted) {
        return res.status(404).json({ message: "Emission entry not found" });
      }
      res.json({ message: "Emission entry deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete emission entry" });
    }
  });

  // Get entries by date range
  app.get("/api/emissions/range/:startDate/:endDate", async (req, res) => {
    try {
      const { startDate, endDate } = req.params;
      const entries = await storage.getEmissionEntriesByDateRange(startDate, endDate);
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch entries by date range" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
