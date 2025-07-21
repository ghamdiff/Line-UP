# Overview

This is a modern full-stack web application built for queue management at various venues (restaurants, entertainment centers, museums, etc.). The application allows users to view nearby venues, join virtual queues, and track their position in real-time. It's designed as a mobile-first Progressive Web App (PWA) with Arabic language support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a monorepo structure with clear separation between client and server code:

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight routing library)
- **State Management**: TanStack React Query for server state management
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API endpoints
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store

### Mobile-First Design
- Responsive design optimized for mobile devices
- Touch-friendly interface with bottom navigation
- Arabic language support with proper RTL text handling
- PWA capabilities for app-like experience

## Key Components

### Database Schema (PostgreSQL)
- **Users**: User authentication and profile management
- **Venues**: Business locations with geospatial data
- **Queues**: Queue management for each venue
- **Reservations**: User queue positions and status tracking
- **Reviews**: User feedback and ratings system

### API Endpoints
- Venue management (CRUD operations, geospatial queries)
- Queue operations (join, update position, status changes)
- Reservation system (create, update status, track position)
- User management and authentication

### Frontend Pages
- **Home**: Dashboard with nearby venues and active queue status
- **Search**: Venue discovery with category filtering
- **My Queues**: Active and historical queue participation
- **Profile**: User account management and statistics
- **Venue Detail**: Queue information and joining interface

### Real-time Features
- Live queue position updates
- Estimated wait time calculations
- Push notifications for queue status changes
- QR code generation for quick venue entry

## Data Flow

1. **Venue Discovery**: Users search for nearby venues using geolocation
2. **Queue Joining**: Users select a venue and join available queues
3. **Position Tracking**: Real-time updates on queue position and wait times
4. **Notification System**: Alerts when user's turn approaches
5. **Entry Process**: QR code scanning for venue entry

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **@radix-ui/***: Accessible UI component primitives
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe database ORM
- **wouter**: Lightweight React router

### Development Tools
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast JavaScript bundler for production

### Database
- **PostgreSQL**: Primary database (configured for Neon serverless)
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Development Environment
- Vite dev server with HMR for frontend
- Express server with TypeScript compilation via tsx
- Shared type definitions between frontend and backend

### Production Build
- Frontend: Vite build generating optimized static assets
- Backend: ESBuild bundling server code for Node.js deployment
- Database: Drizzle migrations for schema deployment

### Environment Configuration
- Database connection via `DATABASE_URL` environment variable
- Separate build processes for client and server code
- Static file serving in production mode

### Scaling Considerations
- Stateless server design for horizontal scaling
- PostgreSQL connection pooling for database efficiency
- CDN-ready static asset structure
- Session storage in database for multi-instance support

The application is designed to handle high-traffic scenarios typical of popular venues while maintaining real-time responsiveness for queue management operations.