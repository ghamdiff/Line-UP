import { useEffect, useState } from "react";
import { Clock, Users } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 300); // Wait for fade out animation
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center z-50 transition-opacity duration-300 opacity-0" />
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="text-center text-white">
        {/* Logo */}
        <div className="mb-8 animate-pulse">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
            <svg width="48" height="48" viewBox="0 0 48 48" className="text-primary">
              <circle cx="24" cy="24" r="20" fill="currentColor" opacity="0.1"/>
              <circle cx="24" cy="16" r="3" fill="currentColor"/>
              <circle cx="24" cy="24" r="3" fill="currentColor"/>
              <circle cx="24" cy="32" r="3" fill="currentColor"/>
              <path d="M14 16h6M14 24h6M14 32h6M28 16h6M28 24h6M28 32h6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"/>
            </svg>
          </div>
          
          {/* App Name */}
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Cairo, Arial, sans-serif' }}>
            طابور
          </h1>
          <p className="text-lg opacity-90">
            تطبيق إدارة الطوابير
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}