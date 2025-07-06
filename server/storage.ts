import { users, emissionEntries, type User, type InsertUser, type EmissionEntry, type InsertEmissionEntry } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createEmissionEntry(entry: InsertEmissionEntry): Promise<EmissionEntry>;
  getEmissionEntries(): Promise<EmissionEntry[]>;
  getEmissionEntry(id: number): Promise<EmissionEntry | undefined>;
  updateEmissionEntry(id: number, entry: Partial<InsertEmissionEntry>): Promise<EmissionEntry | undefined>;
  deleteEmissionEntry(id: number): Promise<boolean>;
  getEmissionEntriesByDateRange(startDate: string, endDate: string): Promise<EmissionEntry[]>;
  getEmissionsSummary(): Promise<{
    scope1: number;
    scope2: number; 
    scope3: number;
    total: number;
  }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private emissionEntries: Map<number, EmissionEntry>;
  private currentUserId: number;
  private currentEntryId: number;

  constructor() {
    this.users = new Map();
    this.emissionEntries = new Map();
    this.currentUserId = 1;
    this.currentEntryId = 1;
    
    // Add sample data for demonstration
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleEntries = [
      {
        componentType: "electricity",
        scope: "scope-2",
        quantity: 1000,
        emissionFactor: 0.5,
        calorificValue: 1,
        costInr: 10000,
        date: "2024-01-15",
        startDate: "2024-01-01",
        endDate: "2024-01-31",
        notes: "Monthly electricity consumption"
      },
      {
        componentType: "diesel",
        scope: "scope-1", 
        quantity: 500,
        emissionFactor: 2.7,
        calorificValue: 1,
        costInr: 45000,
        date: "2024-01-20",
        startDate: "2024-01-15",
        endDate: "2024-01-25",
        notes: "Generator fuel consumption"
      },
      {
        componentType: "natural-gas",
        scope: "scope-1",
        quantity: 200,
        emissionFactor: 2.0,
        calorificValue: 1,
        costInr: 15000,
        date: "2024-01-25",
        startDate: "2024-01-20",
        endDate: "2024-01-30",
        notes: "Heating and cooking gas"
      },
      {
        componentType: "coal",
        scope: "scope-1",
        quantity: 1000,
        emissionFactor: 2.4,
        calorificValue: 1,
        costInr: 25000,
        date: "2024-02-01",
        startDate: "2024-01-25",
        endDate: "2024-02-05",
        notes: "Boiler fuel consumption"
      }
    ];

    sampleEntries.forEach((entry) => {
      this.createEmissionEntry(entry as any);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  private calculateCO2Emissions(entry: InsertEmissionEntry): number {
    const quantity = Number(entry.quantity);
    const emissionFactor = Number(entry.emissionFactor);
    return (quantity * emissionFactor) / 1000; // Convert to tonnes
  }

  async createEmissionEntry(insertEntry: InsertEmissionEntry): Promise<EmissionEntry> {
    const id = this.currentEntryId++;
    const co2Emissions = this.calculateCO2Emissions(insertEntry);
    const entry: EmissionEntry = {
      ...insertEntry,
      id,
      co2Emissions: co2Emissions.toString(),
      createdAt: new Date(),
    };
    this.emissionEntries.set(id, entry);
    return entry;
  }

  async getEmissionEntries(): Promise<EmissionEntry[]> {
    return Array.from(this.emissionEntries.values()).sort(
      (a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()
    );
  }

  async getEmissionEntry(id: number): Promise<EmissionEntry | undefined> {
    return this.emissionEntries.get(id);
  }

  async updateEmissionEntry(id: number, updateEntry: Partial<InsertEmissionEntry>): Promise<EmissionEntry | undefined> {
    const existing = this.emissionEntries.get(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...updateEntry };
    if (updateEntry.quantity || updateEntry.emissionFactor) {
      updated.co2Emissions = this.calculateCO2Emissions(updated as InsertEmissionEntry).toString();
    }
    
    this.emissionEntries.set(id, updated);
    return updated;
  }

  async deleteEmissionEntry(id: number): Promise<boolean> {
    return this.emissionEntries.delete(id);
  }

  async getEmissionEntriesByDateRange(startDate: string, endDate: string): Promise<EmissionEntry[]> {
    return Array.from(this.emissionEntries.values()).filter(
      entry => entry.date >= startDate && entry.date <= endDate
    );
  }

  async getEmissionsSummary(): Promise<{
    scope1: number;
    scope2: number;
    scope3: number;
    total: number;
  }> {
    const entries = Array.from(this.emissionEntries.values());
    
    const scope1Components = ["coal", "diesel", "natural-gas"];
    const scope2Components = ["electricity"];
    
    const scope1 = entries
      .filter(entry => scope1Components.includes(entry.componentType))
      .reduce((sum, entry) => sum + Number(entry.co2Emissions), 0);
    
    const scope2 = entries
      .filter(entry => scope2Components.includes(entry.componentType))
      .reduce((sum, entry) => sum + Number(entry.co2Emissions), 0);
    
    // For demo purposes, scope 3 is calculated as 2x scope 1 + scope 2
    const scope3 = (scope1 + scope2) * 2;
    
    return {
      scope1: Math.round(scope1 * 100) / 100,
      scope2: Math.round(scope2 * 100) / 100,
      scope3: Math.round(scope3 * 100) / 100,
      total: Math.round((scope1 + scope2 + scope3) * 100) / 100,
    };
  }
}

export const storage = new MemStorage();
