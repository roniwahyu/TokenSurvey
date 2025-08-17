# Overview

TOKEN PEDIA is a comprehensive mental health assessment application designed specifically for santri (Islamic boarding school students). The application provides a mobile-first interface for conducting standardized mental health assessments including DASS-42 (Depression, Anxiety, Stress Scales), GSE (General Self-Efficacy Scale), MHKQ (Mental Health Knowledge Questionnaire), and MSCS (Multidimensional Scale of Perceived Social Support). The platform features educational resources through videos and downloadable materials, progress tracking, and assessment history management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: ShadCN UI component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for mental health branding
- **State Management**: TanStack Query for server state and React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Mobile-First Design**: Responsive design optimized for mobile devices with bottom navigation

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints for user management, assessments, and progress tracking
- **File Structure**: Modular approach with separate routing, storage, and database layers
- **Development**: Hot reload with Vite integration for seamless development experience

## Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Connection**: Neon serverless PostgreSQL with connection pooling
- **Schema**: Structured tables for users, assessments, assessment results, and user progress
- **Migrations**: Drizzle Kit for database schema management and migrations

## Assessment System
- **Question Types**: Support for Likert scale (0-3) and boolean question formats
- **Progress Tracking**: Real-time progress saving with ability to resume incomplete assessments
- **Scoring Logic**: Automated calculation of assessment scores with categorized results
- **Result Interpretation**: Structured scoring system with severity levels (Normal, Mild, Moderate, Severe, Extremely Severe)

## User Interface Design
- **Theme System**: Light/dark mode support with system preference detection
- **Component Library**: Comprehensive UI components including forms, modals, cards, and navigation
- **Accessibility**: Focus on mobile accessibility with touch-friendly interfaces
- **Visual Design**: Clean, modern interface with mental health-appropriate color schemes

# External Dependencies

## Database Services
- **Neon**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: TypeScript ORM for database operations and schema management

## UI and Styling
- **Radix UI**: Accessible component primitives for complex UI components
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **ShadCN UI**: Pre-built component library for consistent design system
- **Lucide React**: Icon library for consistent iconography

## Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Autoprefixer

## Frontend Libraries
- **TanStack Query**: Data fetching and caching for API interactions
- **React Hook Form**: Form handling with validation
- **Wouter**: Lightweight routing solution
- **Date-fns**: Date manipulation and formatting utilities

## Video Integration
- **YouTube**: Educational video content delivery through embedded players and external links
- **Custom Video Modal**: In-app video viewing experience with external link options