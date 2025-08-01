import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface QueueTimerProps {
  estimatedWaitTime: number; // in minutes
  createdAt: string | Date;
}

export default function QueueTimer({ estimatedWaitTime, createdAt }: QueueTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [finishTime, setFinishTime] = useState<string>("");

  useEffect(() => {
    const calculateTimes = () => {
      const now = new Date();
      const startTime = new Date(createdAt);
      const finishDateTime = new Date(startTime.getTime() + estimatedWaitTime * 60 * 1000);

      // Set finish time (only calculate once)
      if (!finishTime) {
        setFinishTime(finishDateTime.toLocaleTimeString('ar-SA', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }));
      }

      // Calculate time left
      const timeDiff = finishDateTime.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setTimeLeft("حان دورك!");
        return;
      }

      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      if (hoursLeft > 0) {
        setTimeLeft(`${hoursLeft}:${minutesLeft.toString().padStart(2, '0')}`);
      } else {
        setTimeLeft(`${minutesLeft} دقيقة`);
      }
    };

    calculateTimes();
    const interval = setInterval(calculateTimes, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [estimatedWaitTime, createdAt, finishTime]);

  return (
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-600">الوقت المتوقع للانتهاء</span>
        <span className="font-semibold text-gray-900 arabic-numerals">
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