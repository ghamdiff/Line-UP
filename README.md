# 🎢 Aseer Queue - Arabic Entertainment Venue Queue Management

A modern, bilingual queue management application for entertainment venues in Saudi Arabia's Aseer Region. Features real-time queue tracking, group reservations, and AI-powered local guidance.

![Arabic Queue App](https://img.shields.io/badge/Language-Arabic%20%2F%20English-green)
![React](https://img.shields.io/badge/React-18.0+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-orange)

## ⭐ Key Features

- **🎪 Venue Discovery**: Browse entertainment venues in Aseer Region
- **📋 Smart Queue Management**: Real-time position tracking for groups of 1-8 people
- **🤖 **Ask the AI**: Chat with the assistant for personalized recommendations
- **🇸🇦 Bilingual Support**: Arabic-first design with English localization
- **📱 Mobile-First PWA**: Touch-optimized interface with dark/light mode
- **⚡ Quick Entry**: QR codes valid for 5 minutes for fast venue access

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

## 🏗️ Tech Stack

**Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui, Wouter routing, TanStack Query
**Backend**: Node.js, Express, Google Gemini API, In-memory storage
**Features**: Real-time updates, Arabic RTL support, PWA capabilities

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

## 🔧 Configuration

### Environment Variables
```bash
# Required
GEMINI_API_KEY=your_google_gemini_api_key

# Optional (with defaults)
NODE_ENV=development
PORT=5000
```


---

**Built with ❤️ for the Aseer Development Authority**