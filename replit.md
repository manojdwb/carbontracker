# Replit.md

## Overview

This is a full-stack web application for tracking and managing enterprise carbon emissions. It's built as a modern ESG (Environmental, Social, and Governance) platform called "Invalumetrics" that allows organizations to record, analyze, and report their CO2 emissions across different scopes and categories.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Validation**: Zod schemas shared between client and server
- **Development**: Hot module replacement with Vite integration

### Data Storage Solutions
- **Primary Database**: PostgreSQL hosted on Neon Database
- **ORM**: Drizzle ORM with type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Development Storage**: In-memory storage fallback for development

## Key Components

### Database Schema
The application uses two main tables:

1. **Users Table**: Basic user authentication
   - ID, username, password fields
   - Unique username constraint

2. **Emission Entries Table**: Core emissions data
   - Component types: coal, diesel, natural-gas, electricity
   - Emission scopes: scope-1, scope-2, scope-3
   - Quantity, emission factors, calorific values
   - Calculated CO2 emissions in tCO2e
   - Cost tracking in INR
   - Timestamps and notes

### API Endpoints
- `GET /api/emissions` - Retrieve all emission entries
- `POST /api/emissions` - Create new emission entry
- `GET /api/emissions/:id` - Get specific emission entry
- `PUT /api/emissions/:id` - Update emission entry
- `DELETE /api/emissions/:id` - Delete emission entry
- Additional endpoints for analytics and reporting

### Frontend Pages
1. **Dashboard**: Overview with key metrics and recent entries
2. **Data**: Emission data entry form and management table
3. **Analytics**: Charts and visualizations by category and scope
4. **Reporting**: ESG report generation
5. **Supplier Assessment**: Multi-step assessment forms
6. **Improvement Plan**: Carbon reduction strategies

## Data Flow

1. **Data Entry**: Users input emission data through validated forms
2. **Calculation**: CO2 emissions calculated using quantity × emission factor
3. **Storage**: Data persisted to PostgreSQL via Drizzle ORM
4. **Retrieval**: Real-time data fetching with TanStack Query
5. **Visualization**: Charts and tables displaying emission trends
6. **Export**: Data export functionality for reporting

## External Dependencies

### Production Dependencies
- **Database**: `@neondatabase/serverless` for Neon Database connection
- **ORM**: `drizzle-orm` and `drizzle-zod` for database operations
- **UI Components**: Complete Radix UI component suite
- **Validation**: `zod` for schema validation
- **HTTP Client**: Built-in fetch with custom API wrapper
- **Date Handling**: `date-fns` for date manipulation

### Development Dependencies
- **Build Tools**: Vite with React plugin
- **TypeScript**: Full TypeScript support
- **Database Tools**: `drizzle-kit` for schema management
- **Dev Server**: Custom Express + Vite integration

## Deployment Strategy

### Replit Configuration
- **Modules**: Node.js 20, Web, PostgreSQL 16
- **Build Command**: `npm run build` (Vite + esbuild)
- **Run Command**: `npm run start` (production) / `npm run dev` (development)
- **Port**: Application runs on port 5000, exposed as port 80

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Database**: Drizzle migrations applied via `npm run db:push`

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Set to "production" for deployment

### Auto-scaling Deployment
- Configured for Replit's autoscale deployment target
- Optimized for serverless PostgreSQL (Neon Database)
- Health checks on port 5000

## Changelog

```
Changelog:
- June 24, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```