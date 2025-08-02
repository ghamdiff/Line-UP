# Overview

This is a modern full-stack Arabic queue reservation application built specifically for entertainment venues in the Aseer Region of Saudi Arabia. The app provides a seamless bilingual (Arabic/English) experience for users to discover venues, join virtual queues, and track their position in real-time. It features an integrated AI assistant powered by Google Gemini for local guidance and venue recommendations.

## User Preferences

Preferred communication style: Simple, everyday language.

## Project Status (January 2025)

### Recently Completed Features
- ✅ AI chat assistant integration using Google Gemini API for Aseer Region guidance
- ✅ Group reservation system (1-8 people) with position range display
- ✅ Fixed button positioning and navigation issues
- ✅ Dark/light mode support with proper Arabic RTL text handling
- ✅ Dynamic queue management with real-time position tracking
- ✅ Simplified venue details by removing pros/cons comparison tables
- ✅ Updated QR code validity to 5 minutes

### Core Features
- **Venue Discovery**: Browse entertainment venues in Aseer Region with detailed information
- **Queue Management**: Join virtual queues and track wait times in real-time
- **Group Reservations**: Reserve spots for groups of 1-8 people with position ranges
- **AI Assistant**: Chat with Gemini-powered assistant for local recommendations
- **Bilingual Support**: Full Arabic and English language support with cultural localization
- **Clean Venue Information**: Streamlined venue details focusing on essential information

## System Architecture

The application follows a monorepo structure optimized for mobile-first Progressive Web App delivery:

### Frontend Architecture
- **Framework**: React 18 with TypeScript and strict type safety
- **Routing**: Wouter (lightweight routing library)
- **State Management**: TanStack React Query v5 for server state management
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom Arabic-friendly design system
- **Build Tool**: Vite with HMR for rapid development
- **Internationalization**: Custom language context for Arabic/English switching

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with type-safe endpoints
- **Storage**: In-memory storage with structured venue data
- **AI Integration**: Google Gemini API for chat assistance
- **Session Management**: Express sessions for user state

### Mobile-First Design Philosophy
- Responsive design optimized for mobile devices
- Touch-friendly interface with bottom navigation
- Arabic RTL text handling with proper typography
- PWA capabilities for native app-like experience
- Consistent dark/light mode theming

## Key Components

### Data Schema
- **Users**: Simple authentication and profile management
- **Venues**: Entertainment locations with bilingual content, geospatial data, and pros/cons reviews
- **Queues**: Real-time queue management for each venue
- **Reservations**: Group reservations with position tracking and estimated wait times
- **Simplified Interface**: Clean, focused venue presentation without distracting comparisons

### API Endpoints
- `/api/venues` - Venue discovery and management
- `/api/queues` - Queue operations and real-time updates
- `/api/reservations` - Group reservation system with position tracking
- `/api/chat` - AI assistant powered by Google Gemini
- `/api/auth` - Simple user authentication

### Frontend Pages
- **Home**: Dashboard with active queue status and venue discovery
- **Discover**: Venue browsing with category filtering and search
- **My Queues**: Active and historical queue participation tracking
- **Profile**: User account and app settings management
- **Venue Detail**: Detailed venue info with pros/cons tables and queue joining
- **AI Chat**: Integrated assistant for Aseer Region guidance

### Unique Features
- **AI Regional Assistant**: Gemini-powered chat for local recommendations
- **Group Position Ranges**: Shows "8-10" instead of single position for groups
- **Cultural Localization**: Proper Arabic RTL support and regional content
- **Dark Mode**: Comprehensive theming for all components
- **Quick Entry**: QR codes with 5-minute validity for fast venue access

## Data Flow

1. **Venue Discovery**: Browse curated entertainment venues in Aseer Region
2. **AI Consultation**: Chat with assistant for personalized recommendations
3. **Group Reservations**: Join queues with 1-8 people and get position ranges
4. **Real-time Tracking**: Monitor queue progress with live position updates
5. **Quick Entry**: Generate QR codes valid for 5 minutes
6. **Language Switching**: Seamless Arabic/English content switching

## External Dependencies

### Core Libraries
- **@google/genai**: Google Gemini AI integration for chat assistant
- **@radix-ui/***: Accessible UI component primitives for shadcn/ui
- **@tanstack/react-query**: Server state management (v5)
- **wouter**: Lightweight React router for SPA navigation
- **lucide-react**: Icon library for consistent UI elements

### Development Tools
- **Vite**: Fast build tool and dev server with HMR
- **Tailwind CSS**: Utility-first CSS with Arabic RTL support
- **TypeScript**: Full type safety across frontend and backend
- **tsx**: TypeScript execution for server-side development

### AI & External Services
- **Google Gemini API**: Powers the regional chat assistant
- **Environment Secrets**: Secure API key management for Gemini integration

### Storage
- **In-Memory Storage**: Structured data storage with TypeScript interfaces
- **Mock Data**: Authentic venue data for Aseer Region entertainment locations

## Deployment Strategy

### Development Environment
- Replit-optimized workflow with automatic server restart
- Vite dev server with HMR for instant frontend updates
- Express server with TypeScript compilation via tsx
- Shared type definitions between frontend and backend

### Production Considerations
- Frontend: Vite build generating optimized static assets
- Backend: Express server deployment with environment variables
- AI Integration: Secure Gemini API key management
- Static file serving for production builds

### Environment Configuration
- `GEMINI_API_KEY`: Required for AI chat functionality
- Replit Deployments ready with automatic scaling
- Session management and API endpoint configuration
- Mobile-optimized PWA deployment

### Regional Focus
- Designed specifically for Aseer Region entertainment venues
- Arabic-first localization with cultural considerations
- Optimized for Saudi Arabian mobile networks and usage patterns
- Scalable architecture for tourism and entertainment industry demands

### Recent Updates (January 2025)
- ✅ Fixed all navigation and button positioning issues
- ✅ Integrated Google Gemini AI for regional assistance
- ✅ Enhanced group reservation system with position ranges
- ✅ Comprehensive dark/light mode theming
- ✅ Simplified venue details by removing comparison tables
- ✅ Set QR code validity to 5 minutes for quick entry