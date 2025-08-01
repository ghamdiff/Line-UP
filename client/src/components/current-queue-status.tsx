import { Clock, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import QueueTimer from "./queue-timer";

interface CurrentQueueStatusProps {
  reservation: any;
}

export default function CurrentQueueStatus({ reservation }: CurrentQueueStatusProps) {
  const { toast } = useToast();
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
        title: "تم الخروج من الطابور",
        description: "لقد خرجت من الطابور بنجاح.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الخروج من الطابور. حاول مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  if (!reservation || reservation.status !== "waiting") {
    return null;
  }

  const progressPercentage = Math.max(20, 100 - (reservation.position * 5));

  return (
    <div className="px-4 py-4 bg-gradient-to-r from-primary to-blue-600 text-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">في الطابور الآن</p>
              <p className="text-sm opacity-90">{reservation.venue.nameAr}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => leaveMutation.mutate()}
              disabled={leaveMutation.isPending}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="text-left ml-4">
          <p className="text-2xl font-bold queue-pulse arabic-numerals">{reservation.position}</p>
          <p className="text-xs opacity-90">مكانك في الطابور</p>
        </div>
      </div>

      <div className="mt-3">
        <QueueTimer
          estimatedWaitTime={reservation.estimatedWaitTime || 25}
          createdAt={reservation.createdAt}
        />
        <div className="mt-3 w-full bg-white bg-opacity-30 rounded-full h-2">
          <div
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
