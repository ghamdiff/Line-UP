import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface QueueTimerProps {
  estimatedWaitTime: number; // in minutes
  createdAt: string | Date;
}

export default function QueueTimer({ estimatedWaitTime, createdAt }: QueueTimerProps) {
  const { language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [finishTime, setFinishTime] = useState<string>("");

  useEffect(() => {
    const calculateTimes = () => {
      const now = new Date();
      const startTime = new Date(createdAt);
      const finishDateTime = new Date(startTime.getTime() + estimatedWaitTime * 60 * 1000);
      
      // Set finish time (only calculate once)
      if (!finishTime) {
        setFinishTime(finishDateTime.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }));
      }
      
      // Calculate time left
      const timeDiff = finishDateTime.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setTimeLeft(language === 'ar' ? "حان دورك!" : "Your turn!");
        return;
      }
      
      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      if (hoursLeft > 0) {
        setTimeLeft(`${hoursLeft}:${minutesLeft.toString().padStart(2, '0')}`);
      } else {
        setTimeLeft(language === 'ar' ? `${minutesLeft} دقيقة` : `${minutesLeft} min`);
      }
    };

    calculateTimes();
    const interval = setInterval(calculateTimes, 30000); // Update every 30 seconds for better responsiveness

    return () => clearInterval(interval);
  }, [estimatedWaitTime, createdAt, finishTime, language]);

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          {language === 'ar' ? 'الوقت المتوقع للانتهاء' : 'Estimated finish time'}
        </span>
        <span className="font-semibold text-gray-900 dark:text-white arabic-numerals">
          {finishTime}
        </span>
      </div>
      <div className="flex items-center justify-center">
        <Clock className="w-4 h-4 text-primary ml-2" />
        <span className="text-lg font-bold text-primary arabic-numerals">
          {timeLeft}
        </span>
      </div>
    </div>
  );
}