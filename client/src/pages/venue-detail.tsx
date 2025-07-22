import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowRight, Star, MapPin, Clock, Users, QrCode } from "lucide-react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Venue, Queue } from "@shared/schema";

export default function VenueDetail() {
  const params = useParams();
  const venueId = parseInt(params.id as string);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedQueue, setSelectedQueue] = useState<number | null>(null);

  const { data: venue, isLoading: venueLoading } = useQuery<Venue>({
    queryKey: ["/api/venues", venueId],
  });

  const { data: queues, isLoading: queuesLoading } = useQuery<Queue[]>({
    queryKey: ["/api/venues", venueId, "queues"],
  });

  const reservationMutation = useMutation({
    mutationFn: async (data: { queueId: number; estimatedWaitTime: number }) => {
      const response = await apiRequest("POST", "/api/reservations", {
        queueId: data.queueId,
        estimatedWaitTime: data.estimatedWaitTime
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "تم الانضمام للطابور",
        description: "لقد انضممت للطابور بنجاح. ستصلك إشعارات عند اقتراب دورك.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
    },
    onError: () => {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء الانضمام للطابور. حاول مرة أخرى.",
        variant: "destructive",
      });
    },
  });

  const getQueueStatusColor = (currentCount: number | null, maxCapacity: number | null) => {
    const count = currentCount || 0;
    const capacity = maxCapacity || 100;
    const percentage = (count / capacity) * 100;
    if (percentage < 30) return "status-green";
    if (percentage < 70) return "status-amber";
    return "status-red";
  };

  const getQueueStatusText = (currentCount: number | null, maxCapacity: number | null) => {
    const count = currentCount || 0;
    const capacity = maxCapacity || 100;
    const percentage = (count / capacity) * 100;
    if (percentage < 30) return "طابور قصير";
    if (percentage < 70) return "طابور متوسط";
    return "طابور طويل";
  };

  const handleJoinQueue = (queueId: number) => {
    const queue = queues?.find(q => q.id === queueId);
    const estimatedWaitTime = queue?.averageWaitTime || 25;
    setSelectedQueue(queueId);
    reservationMutation.mutate({ queueId, estimatedWaitTime });
  };

  if (venueLoading || !venue) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <div className="w-32 h-6 bg-gray-200 rounded shimmer"></div>
          </div>
        </div>
        <div className="px-4 py-4 space-y-4">
          <div className="w-full h-48 bg-gray-200 rounded-xl shimmer"></div>
          <div className="space-y-2">
            <div className="w-3/4 h-6 bg-gray-200 rounded shimmer"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-lg font-semibold text-gray-900">تفاصيل المكان</h1>
        </div>
      </div>

      {/* Venue Image */}
      <div className="relative">
        <img
          src={venue.imageUrl || "/api/placeholder/400/200"}
          alt={venue.nameAr}
          className="w-full h-48 object-cover"
        />
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{venue.rating}</span>
          </div>
        </div>
      </div>

      {/* Venue Info */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{venue.nameAr}</h1>
        <p className="text-gray-600 mb-3">{venue.categoryAr}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{venue.addressAr}</span>
        </div>

        {venue.descriptionAr && (
          <p className="text-gray-700 leading-relaxed">{venue.descriptionAr}</p>
        )}
      </div>

      {/* Queue Information */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">الطوابير المتاحة</h2>
        
        {queuesLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shimmer h-24"></div>
            ))}
          </div>
        ) : queues?.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">لا توجد طوابير متاحة</h3>
              <p className="text-sm text-gray-500">هذا المكان لا يحتوي على طوابير في الوقت الحالي</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {queues?.map((queue) => (
              <Card key={queue.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{queue.nameAr}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`status-dot ${getQueueStatusColor(queue.currentCount, queue.maxCapacity)}`}></div>
                        <span className="text-sm text-gray-600">
                          {getQueueStatusText(queue.currentCount, queue.maxCapacity)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{queue.currentCount || 0}/{queue.maxCapacity || 100}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>~{queue.averageWaitTime || 0} دقيقة</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <Button
                        onClick={() => handleJoinQueue(queue.id)}
                        disabled={reservationMutation.isPending && selectedQueue === queue.id}
                        className="bg-primary text-white hover:bg-primary/90"
                      >
                        {reservationMutation.isPending && selectedQueue === queue.id ? "جاري الانضمام..." : "انضم للطابور"}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${((queue.currentCount || 0) / (queue.maxCapacity || 100)) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Contact Info */}
      {venue.phone && (
        <div className="px-4 py-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">معلومات الاتصال</h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">الهاتف:</span>
                <a href={`tel:${venue.phone}`} className="text-primary font-medium">
                  {venue.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
