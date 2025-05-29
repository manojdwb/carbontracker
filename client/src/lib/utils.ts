import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, decimals = 2): string {
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCO2(value: number): string {
  return `${formatNumber(value)} tCO2e`;
}

export function getComponentIcon(componentType: string): string {
  switch (componentType) {
    case "coal":
      return "fas fa-fire";
    case "diesel":
      return "fas fa-gas-pump";
    case "natural-gas":
      return "fas fa-fire";
    case "electricity":
      return "fas fa-bolt";
    default:
      return "fas fa-circle";
  }
}

export function getComponentColor(componentType: string): string {
  switch (componentType) {
    case "coal":
      return "bg-red-100 text-red-600";
    case "diesel":
      return "bg-blue-100 text-blue-600";
    case "natural-gas":
      return "bg-orange-100 text-orange-600";
    case "electricity":
      return "bg-yellow-100 text-yellow-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export function calculateCO2(quantity: number, emissionFactor: number): number {
  return (quantity * emissionFactor) / 1000;
}

export function getDateRange(filter: string): { startDate: string; endDate: string } {
  const today = new Date();
  const endDate = today.toISOString().split('T')[0];
  
  let startDate: string;
  
  switch (filter) {
    case "last-7-days":
      startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      break;
    case "last-30-days":
      startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      break;
    case "last-90-days":
      startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      break;
    default:
      startDate = "1900-01-01";
  }
  
  return { startDate, endDate };
}
