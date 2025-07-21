import { Clock } from "lucide-react";

interface CurrentQueueStatusProps {
  reservation: any;
}

export default function CurrentQueueStatus({ reservation }: CurrentQueueStatusProps) {
  if (!reservation || reservation.status !== "waiting") {
    return null;
  }

  const progressPercentage = Math.max(20, 100 - (reservation.position * 5));

  return (
    <div className="px-4 py-4 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold">في الطابور الآن</p>
          <p className="text-sm opacity-90">{reservation.venue.nameAr}</p>
        </div>
        <div className="text-left">
          <p className="text-2xl font-bold queue-pulse arabic-numerals">{reservation.position}</p>
          <p className="text-xs opacity-90">مكانك في الطابور</p>
        </div>
      </div>
      
      <div className="mt-3 bg-white bg-opacity-20 rounded-lg p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm">الوقت المتوقع</span>
          <span className="font-semibold arabic-numerals">
            {reservation.estimatedWaitTime} دقيقة
          </span>
        </div>
        <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
