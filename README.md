# 🎢 Aseer Queue - Arabic Entertainment Venue Queue Management

A modern, bilingual queue management application designed specifically for entertainment venues in the Aseer Region of Saudi Arabia. Built with React, TypeScript, and powered by Google Gemini AI for intelligent local guidance.

![Arabic Queue App](https://img.shields.io/badge/Language-Arabic%20%2F%20English-green)
![React](https://img.shields.io/badge/React-18.0+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.0+-blue)
![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-orange)

## ✨ Features

### 🎯 Core Functionality
- **🎪 Venue Discovery**: Browse curated entertainment venues in Aseer Region
- **📋 Smart Queue Management**: Join virtual queues and track your position in real-time
- **👥 Group Reservations**: Reserve spots for 1-8 people with intelligent position ranges
- **🤖 AI Regional Assistant**: Chat with Gemini-powered assistant for local recommendations
- **🌙 Dark/Light Mode**: Comprehensive theming that adapts to user preferences

### 🌍 Bilingual Experience
- **🇸🇦 Arabic-First Design**: Native Arabic RTL support with cultural localization
- **🇺🇸 English Support**: Full English localization for international visitors
- **📊 Dynamic Pros/Cons Tables**: Venue comparison with authentic review data in both languages
- **🔄 Seamless Language Switching**: Instant content translation throughout the app

### 📱 Mobile-First Design
- **📲 Progressive Web App**: Native app-like experience on mobile devices
- **👆 Touch-Optimized UI**: Intuitive navigation designed for mobile interaction
- **🎨 Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **⚡ Fast Performance**: Optimized with Vite and modern React patterns

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd aseer-queue-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file and add:
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5000`

## 🏗️ Architecture

### Frontend Stack
- **React 18** with TypeScript for type-safe development
- **Wouter** for lightweight client-side routing
- **TanStack Query v5** for server state management
- **shadcn/ui** components built on Radix UI primitives
- **Tailwind CSS** with Arabic RTL support
- **Vite** for fast development and optimized builds

### Backend Stack
- **Node.js + Express** with TypeScript
- **Google Gemini API** for AI chat functionality
- **In-memory storage** with structured venue data
- **RESTful API** design with type-safe endpoints

### Key Features Implementation
- **Bilingual Content**: Dynamic language switching with context-aware translations
- **Queue Management**: Real-time position tracking with group reservation logic
- **AI Integration**: Gemini-powered chat for regional recommendations
- **Responsive Design**: Mobile-first approach with touch-optimized interactions

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages/routes
│   │   ├── contexts/       # React contexts (Language, etc.)
│   │   └── lib/           # Utilities and configurations
├── server/                 # Backend Express application
│   ├── gemini.ts          # AI integration with Google Gemini
│   ├── routes.ts          # API endpoint definitions
│   └── storage.ts         # Data management and mock data
├── shared/                 # Shared types and schemas
│   └── schema.ts          # TypeScript type definitions
└── README.md              # This file
```

## 🎮 Usage Guide

### For Users
1. **Browse Venues**: Explore entertainment options in Aseer Region
2. **Check Pros/Cons**: Review authentic user feedback in your preferred language
3. **Ask the AI**: Chat with the assistant for personalized recommendations
4. **Join Queues**: Reserve spots for your group and track your position
5. **Stay Updated**: Receive real-time updates on queue progress

### For Developers
1. **Add New Venues**: Update the venue data in `server/storage.ts`
2. **Modify UI Components**: Edit components in `client/src/components/`
3. **Extend API**: Add new endpoints in `server/routes.ts`
4. **Update Translations**: Modify language content in venue data and UI strings

## 🔧 Configuration

### Environment Variables
```bash
# Required
GEMINI_API_KEY=your_google_gemini_api_key

# Optional (with defaults)
NODE_ENV=development
PORT=5000
```

### Language Support
The app automatically detects user language preference and provides:
- Arabic (العربية) - Primary language with RTL support
- English - Secondary language for international users

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run type-check   # Run TypeScript type checking
```

### Adding New Features
1. **Frontend Components**: Add to `client/src/components/`
2. **API Endpoints**: Extend `server/routes.ts`
3. **Type Definitions**: Update `shared/schema.ts`
4. **Styling**: Use Tailwind CSS classes with dark mode support

## 🌟 Key Features Deep Dive

### AI-Powered Regional Assistant
- Powered by Google Gemini API
- Specialized knowledge of Aseer Region attractions
- Provides personalized recommendations based on user preferences
- Supports both Arabic and English conversations

### Dynamic Pros/Cons System
- Authentic user review data organized into pros and cons
- Bilingual content that switches based on user language
- Visual highlighting with green (pros) and red (cons) themes
- Responsive table design that adapts to content length

### Group Reservation Intelligence
- Support for groups of 1-8 people
- Smart position range display (e.g., "8-10" instead of single positions)
- Real-time queue position tracking
- Estimated wait time calculations

### Cultural Localization
- Arabic-first design philosophy
- Proper RTL text handling and layout
- Cultural considerations in UI/UX design
- Region-specific content and recommendations

## 🚀 Deployment

### Replit Deployment (Recommended)
This project is optimized for Replit Deployments:
1. Connect your GitHub repository to Replit
2. Set the `GEMINI_API_KEY` environment variable
3. Deploy with automatic scaling and HTTPS

### Manual Deployment
1. Build the project: `npm run build`
2. Set up your server environment
3. Configure environment variables
4. Deploy both frontend and backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain bilingual support for all new features
- Test on mobile devices
- Ensure accessibility compliance
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini** for AI capabilities
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for rapid UI development
- **Replit** for development and deployment platform
- **Aseer Region Tourism** for inspiration and regional focus

## 📞 Support

For questions, issues, or feature requests:
1. Open an issue on GitHub
2. Check the documentation in `replit.md`
3. Review the project structure and examples

---

**Built with ❤️ for the Aseer Region tourism and entertainment industry**