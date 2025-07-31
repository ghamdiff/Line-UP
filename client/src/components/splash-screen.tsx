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
      <div className="fixed inset-0 bg-gradient-to-br from-primary to-white-600 flex items-center justify-center z-50 transition-opacity duration-300 opacity-0" />
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-primary to-white-600 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="text-center text-white">
        
       {/* Logo */}
        <div className="mb-8 animate-pulse">
          <div className="w-80 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-7 shadow-s">
            <img src="https://i.ibb.co/8LzMSYhg/IMG-20250731-WA0016.jpg" alt="Logo" className="w-80 h-16 rounded-xl" />
          </div>

          {/* App Name */}
          <h1
            className="text-3xl font-bold mb-2"
            style={{ fontFamily: "Cairo, Arial, sans-serif" }}
          >
            
          </h1>
          <p className="text-lg opacity-90"></p>
        </div>

        {/* Loading Animation */}
        <div className="flex items-center justify-center space-x-2 space-x-reverse">
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-white rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
