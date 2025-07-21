import { useQuery } from "@tanstack/react-query";
import { Clock, ArrowRight, QrCode } from "lucide-react";
import { Link } from "wouter";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MyQueues() {
  const { data: reservations, isLoading } = useQuery<any[]>({
    queryKey: ["/api/reservations/user/1"],
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "waiting":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">في الانتظار</Badge>;
      case "called":
        return <Badge className="bg-green-100 text-green-800 border-green-200">حان دورك</Badge>;
      case "completed":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">مكتمل</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 border-red-200">ملغي</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900">طوابيري</h1>
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
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد طوابير</h3>
            <p className="text-gray-500 mb-4">لم تنضم إلى أي طابور بعد</p>
            <Link href="/search">
              <Button className="bg-primary text-white">
                استكشف الأماكن
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">طوابيري الحالية</h2>
            
            {reservations?.map((reservation) => (
              <Card key={reservation.id} className="bg-white border border-gray-200 overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {reservation.venue.nameAr}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {reservation.queue.nameAr}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className={`status-dot ${getStatusColor(reservation.status)}`}></div>
                        {getStatusBadge(reservation.status)}
                      </div>
                    </div>
                    <div className="text-left">
                      <p className="text-2xl font-bold text-primary queue-pulse">
                        {reservation.position}
                      </p>
                      <p className="text-xs text-gray-500">مكانك في الطابور</p>
                    </div>
                  </div>

                  {reservation.status === "waiting" && (
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">الوقت المتوقع</span>
                        <span className="font-semibold text-gray-900">
                          {reservation.estimatedWaitTime} دقيقة
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${Math.max(20, 100 - (reservation.position * 5))}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      انضممت في: {new Date(reservation.createdAt).toLocaleDateString('ar-SA')}
                    </p>
                    {reservation.qrCode && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <QrCode className="w-4 h-4" />
                        <span className="text-xs">رمز الدخول</span>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
