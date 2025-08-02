# 🎢 Aseer Queue - Arabic Entertainment Venue Queue Management

A modern, bilingual queue management application for entertainment venues in Saudi Arabia's Aseer Region. Features real-time queue tracking, group reservations, and AI-powered local guidance.

![Arabic Queue App](https://img.shields.io/badge/Language-Arabic%20%2F%20English-green)
![React](https://img.shields.io/badge/React-18.0+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![AI Powered](https://img.shields.io/badge/AI-Google%20Gemini-orange)

## ✨ Key Features

- **🎪 Venue Discovery**: Browse entertainment venues in Aseer Region
- **📋 Smart Queue Management**: Real-time position tracking for groups of 1-8 people
- **🤖 AI Assistant**: Gemini-powered local recommendations and guidance
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

## 🎮 Usage

1. **Browse Venues**: Explore entertainment options in Aseer Region
2. **Ask the AI**: Chat with the assistant for personalized recommendations  
3. **Join Queues**: Reserve spots for your group and track your position
4. **Quick Entry**: Use QR codes for fast venue access

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

## 🌟 Highlights

- **AI Regional Assistant**: Gemini-powered chat specialized in Aseer Region attractions
- **Group Reservations**: Smart position ranges (e.g., "8-10") for groups of 1-8 people
- **Cultural Design**: Arabic-first with proper RTL text handling and regional focus
- **Real-time Updates**: Live queue position tracking with estimated wait times

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

**Guidelines**: Follow TypeScript best practices, maintain bilingual support, test on mobile devices

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