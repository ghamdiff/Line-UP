import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Clock, ArrowRight, QrCode, X } from "lucide-react";
import { Link } from "wouter";
import BottomNavigation from "@/components/bottom-navigation";
import QueueTimer from "@/components/queue-timer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MyQueues() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const { data: reservations, isLoading } = useQuery<any[]>({
    queryKey: ["/api/reservations/user/1"],
    refetchInterval: 5000, // Auto-refresh every 5 seconds for real-time updates
    refetchOnWindowFocus: true, // Refresh when user returns to tab
  });

  // Separate current and history queues
  const currentQueues = reservations?.filter(r => r.status === 'waiting' || r.status === 'called') || [];
  const historyQueues = reservations?.filter(r => r.status === 'completed' || r.status === 'cancelled') || [];

  const leaveMutation = useMutation({
    mutationFn: async (reservationId: number) => {
      const response = await apiRequest("PATCH", `/api/reservations/${reservationId}/status`, {
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

  const getStatusBadge = (status: string) => {
    const statusTexts = {
      waiting: language === 'ar' ? 'في الانتظار' : 'Waiting',
      called: language === 'ar' ? 'حان دورك' : 'Your Turn',
      completed: language === 'ar' ? 'مكتمل' : 'Completed',
      cancelled: language === 'ar' ? 'ملغي' : 'Cancelled'
    };
    
    return statusTexts[status as keyof typeof statusTexts] || status;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "waiting":
        return "status-green";
      case "called":
        return "status-amber";
      case "completed":
        return "status-red";
      default:
        return "status-green";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/">
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{t('myQueues')}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shimmer h-32"></div>
            ))}
          </div>
        ) : reservations?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'لا توجد طوابير' : 'No Queues'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              {language === 'ar' ? 'لم تنضم إلى أي طابور بعد' : 'You haven\'t joined any queues yet'}
            </p>
            <Link href="/search">
              <Button className="bg-primary text-white">
                {language === 'ar' ? 'استكشف الأماكن' : 'Explore Places'}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Current Queues Section */}
            {currentQueues.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'طوابيري الحالية' : 'Current Queues'}
                </h2>
                <div className="space-y-3">
                  {currentQueues.map((reservation) => (
              <Card key={reservation.id} className="bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-blue-700 text-white overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        {language === 'ar' ? reservation.venue.nameAr : reservation.venue.name}
                      </h3>
                      <p className="text-sm text-white opacity-90 mb-2">
                        {language === 'ar' ? reservation.queue.nameAr : reservation.queue.name}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                        <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                          {getStatusBadge(reservation.status)}
                        </span>
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-white queue-pulse">
                        {reservation.position}
                      </p>
                      <p className="text-xs text-white opacity-90">
                        {language === 'ar' ? 'مكانك في الطابور' : 'Your position'}
                      </p>
                    </div>
                  </div>

                  {reservation.status === "waiting" && (
                    <div className="mb-3">
                      <QueueTimer 
                        estimatedWaitTime={reservation.estimatedWaitTime || 25}
                        createdAt={reservation.createdAt}
                      />
                      <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mt-3">
                        <div 
                          className="bg-white h-2 rounded-full transition-all duration-500" 
                          style={{ 
                            width: `${Math.min(95, Math.max(5, ((10 - Math.min(reservation.position, 10)) / 10) * 100))}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-white opacity-70">
                      {language === 'ar' ? 'انضممت في:' : 'Joined:'} {new Date(reservation.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                    </p>
                    <div className="flex items-center gap-2">
                      {reservation.status === "waiting" && reservation.position > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => leaveMutation.mutate(reservation.id)}
                          disabled={leaveMutation.isPending}
                          className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-1.5 rounded-full"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                      <Link to="/">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                        >
                          <QrCode className="w-4 h-4" />
                          <span className="text-xs">{language === 'ar' ? 'رمز الدخول' : 'QR Code'}</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* History Section */}
            {historyQueues.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  {language === 'ar' ? 'سجل الطوابير' : 'Queue History'}
                </h2>
                <div className="space-y-3">
                  {historyQueues.map((reservation) => (
                    <Card key={reservation.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 opacity-75">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {language === 'ar' ? reservation.venue.nameAr : reservation.venue.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {language === 'ar' ? reservation.queue.nameAr : reservation.queue.name}
                            </p>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(reservation.status)}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                          {language === 'ar' ? 'انضممت في:' : 'Joined:'} {new Date(reservation.createdAt).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
