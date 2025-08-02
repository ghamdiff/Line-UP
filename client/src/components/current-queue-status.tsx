import { Clock, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import QueueTimer from "./queue-timer";

interface CurrentQueueStatusProps {
  reservation: any;
}

export default function CurrentQueueStatus({ reservation }: CurrentQueueStatusProps) {
  const { toast } = useToast();
  const { t, language } = useLanguage();
  const queryClient = useQueryClient();

  const leaveMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("PATCH", `/api/reservations/${reservation.id}/status`, {
        status: "cancelled"
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: language === 'ar' ? "تم الخروج من الطابور" : "Left the queue",
        description: language === 'ar' ? "لقد خرجت من الطابور بنجاح." : "You have successfully left the queue.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
    },
    onError: () => {
      toast({
        title: language === 'ar' ? "خطأ" : "Error", 
        description: language === 'ar' ? "حدث خطأ أثناء الخروج من الطابور. حاول مرة أخرى." : "An error occurred while leaving the queue. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (!reservation || reservation.status !== "waiting") {
    return null;
  }
  
  // Check if user's turn has arrived (position 1 or less - in queue systems position 1 means it's your turn)
  const isUserTurn = reservation.position <= 1;

  // Calculate progress based on initial position vs current position
  // Assume initial position was around estimatedWaitTime / 1.5 (since each person takes 1.5 min)
  const initialPosition = Math.ceil((reservation.estimatedWaitTime || 25) / 1.5);
  const currentPosition = reservation.position;
  const progressPercentage = Math.min(100, Math.max(5, ((initialPosition - currentPosition) / (initialPosition - 1)) * 100));

  return (
    <div className="px-4 py-3 bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-700 text-white">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white mb-1 truncate">
            {language === "ar"
              ? reservation.venue.nameAr
              : reservation.venue.name}
          </h3>
          <p className="text-sm text-white opacity-90 mb-2 truncate">
            {language === "ar"
              ? reservation.queue.nameAr
              : reservation.queue.name}
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
              {language === "ar" ? "في الانتظار" : "Waiting"}
            </span>
          </div>
        </div>
        <div className="text-right ml-4">
          <p className="text-xs font-semibold text-white opacity-90">
            {language === "ar"
              ? "مكانك في الطابور"
              : "Your Position"}
          </p>
          <p className="text-2xl font-bold text-white queue-pulse arabic-numerals">
            {reservation.groupSize > 1 
              ? `${reservation.position}-${reservation.position + reservation.groupSize - 1}`
              : reservation.position
            }
          </p>
        </div>
      </div>
      
      <div className="mb-3">
        <QueueTimer
          estimatedWaitTime={reservation.estimatedWaitTime || 25}
          createdAt={reservation.createdAt}
        />
        <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
          <div
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {!isUserTurn && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => leaveMutation.mutate()}
            disabled={leaveMutation.isPending}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-3 py-1 rounded-md text-xs"
          >
            <X className="w-3 h-3 mr-1" />
            {language === 'ar' ? 'مغادرة' : 'Leave'}
          </Button>
        </div>
      )}
    </div>
  );
}
