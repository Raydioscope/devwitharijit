# Arijit Ray Portfolio Project

## Overview

This is a full-stack web application designed as a professional portfolio website for Arijit Ray, a Senior Software Engineer with 10+ years of experience in .NET, Python, Angular, and AI technologies. The project combines a modern React frontend with an Express.js backend, featuring a sophisticated design system and database integration capabilities.

The application serves as both a showcase of technical skills and an interactive platform for potential employers and clients to learn about Arijit's professional background through features like an integrated chatbot and comprehensive project displays.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Components**: Comprehensive component library using shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: React Query (TanStack Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: PostgreSQL session store via connect-pg-simple
- **Development**: Hot module replacement and runtime error handling via Vite plugins

### Design System
- **Component Library**: shadcn/ui providing pre-built, accessible components
- **Theme System**: CSS custom properties with light/dark theme support
- **Typography**: Custom font stack with Montserrat, Inter, and system fonts
- **Icons**: Lucide React for consistent iconography
- **Responsive Design**: Mobile-first approach with Bootstrap 5 integration

### Database Schema
- **ORM**: Drizzle ORM with type-safe database operations
- **Schema Definition**: Shared schema types between client and server
- **Migrations**: Automated database migrations via drizzle-kit
- **Validation**: Zod schemas for runtime type checking and validation

### Progressive Web App Features
- **Service Worker**: Offline capabilities with caching strategies
- **Manifest**: PWA manifest for mobile installation
- **Performance**: Static asset caching and dynamic content strategies
- **Accessibility**: ARIA compliance and keyboard navigation support

### Development Workflow
- **Build System**: Vite for fast development and optimized production builds
- **Type Safety**: Full TypeScript coverage across frontend, backend, and shared code
- **Code Quality**: ESBuild for production bundling with tree shaking
- **Development Server**: Hot reload with error overlay for rapid development

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL via @neondatabase/serverless
- **Connection Pooling**: Built-in connection management for scalable database access

### UI and Design Libraries
- **Radix UI**: Headless component primitives for accessibility and flexibility
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Class Variance Authority**: Type-safe variant APIs for component styling
- **Embla Carousel**: Touch-friendly carousel component library

### Development and Build Tools
- **Vite**: Next-generation frontend tooling with native ES modules
- **TypeScript**: Static type checking and enhanced IDE support
- **Replit Integration**: Development environment plugins and runtime error handling

### Form and Validation
- **React Hook Form**: Performant forms library with minimal re-renders
- **Zod**: TypeScript-first schema validation library
- **Date Handling**: date-fns for reliable date manipulation and formatting

### Additional Integrations
- **Font Loading**: Google Fonts integration with multiple font families
- **External CDNs**: Bootstrap 5 and Font Awesome for additional styling resources
- **PWA Support**: Complete progressive web app implementation with offline capabilities