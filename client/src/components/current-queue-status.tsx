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
    <div className="px-4 py-4 bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-700 text-white">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-lg mb-1">
                {language === 'ar' ? 'في الطابور الآن' : 'In Queue Now'}
              </p>
              <p className="text-sm opacity-90 truncate">
                {language === 'ar' ? reservation.venue.nameAr : reservation.venue.name}
              </p>
            </div>
            {!isUserTurn && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => leaveMutation.mutate()}
                disabled={leaveMutation.isPending}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full ml-3 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <p className="text-xs opacity-80 mb-1">
                {language === 'ar' ? 'مكانك في الطابور' : 'Your Position'}
              </p>
              <p className="text-2xl font-bold queue-pulse arabic-numerals">
                {reservation.groupSize > 1 
                  ? `${reservation.position}-${reservation.position + reservation.groupSize - 1}`
                  : reservation.position
                }
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-xs opacity-80 mb-1">
                {language === 'ar' ? 'حجم المجموعة' : 'Group Size'}
              </p>
              <p className="text-2xl font-bold arabic-numerals">
                {reservation.groupSize}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <QueueTimer
              estimatedWaitTime={reservation.estimatedWaitTime || 25}
              createdAt={reservation.createdAt}
            />
            <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-500" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
