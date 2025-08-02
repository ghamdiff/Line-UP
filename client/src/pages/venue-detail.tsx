import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ArrowRight,
  Bot, 
  Star,
  MapPin,
  Clock,
  Users,
  QrCode,
  ChevronDown,
} from "lucide-react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLanguage } from "@/contexts/LanguageContext";
import { ReservationToast } from "@/components/ui/reservation-toast";
import type { Venue, Queue } from "@shared/schema";

export default function VenueDetail() {
  const params = useParams();
  const venueId = parseInt(params.id as string);
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedQueue, setSelectedQueue] = useState<number | null>(null);
  const [groupSize, setGroupSize] = useState<number>(1);
  const [showReservationToast, setShowReservationToast] = useState(false);

  const { data: venue, isLoading: venueLoading } = useQuery<Venue>({
    queryKey: ["/api/venues", venueId],
  });

  const { data: queues, isLoading: queuesLoading } = useQuery<Queue[]>({
    queryKey: ["/api/venues", venueId, "queues"],
  });

  const reservationMutation = useMutation({
    mutationFn: async (data: {
      queueId: number;
      estimatedWaitTime: number;
      groupSize: number;
    }) => {
      const response = await apiRequest("POST", "/api/reservations", {
        queueId: data.queueId,
        estimatedWaitTime: data.estimatedWaitTime,
        groupSize: data.groupSize,
      });
      return response.json();
    },
    onSuccess: () => {
      setShowReservationToast(true);
      queryClient.invalidateQueries({ queryKey: ["/api/reservations"] });
    },
    onError: () => {
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description:
          language === "ar"
            ? "حدث خطأ أثناء الانضمام للطابور. حاول مرة أخرى."
            : "An error occurred while joining the queue. Please try again.",
        variant: "destructive",
      });
    },
  });

  const getQueueStatusColor = (
    currentCount: number | null,
    maxCapacity: number | null,
  ) => {
    const count = currentCount || 0;
    const capacity = maxCapacity || 100;
    const percentage = (count / capacity) * 100;
    if (percentage < 10) return "status-green";
    if (percentage < 30) return "status-amber";
    return "status-red";
  };

  const getQueueStatusText = (
    currentCount: number | null,
    maxCapacity: number | null,
  ) => {
    const count = currentCount || 0;
    const capacity = maxCapacity || 100;
    const percentage = (count / capacity) * 100;
    if (language === "ar") {
      if (percentage < 10) return "طابور قصير";
      if (percentage < 30) return "طابور متوسط";
      return "طابور طويل";
    } else {
      if (percentage < 10) return "Short queue";
      if (percentage < 30) return "Medium queue";
      return "Long queue";
    }
  };

  const handleJoinQueue = (queueId: number, groupSizeOverride?: number) => {
    const queue = queues?.find((q) => q.id === queueId);
    const estimatedWaitTime = queue?.averageWaitTime || 25;
    const finalGroupSize = groupSizeOverride || groupSize;
    setSelectedQueue(queueId);
    reservationMutation.mutate({
      queueId,
      estimatedWaitTime,
      groupSize: finalGroupSize,
    });
  };

  if (venueLoading || !venue) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </Button>
            </Link>
            <div className="w-32 h-6 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
          </div>
        </div>
        <div className="px-4 py-4 space-y-4">
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-xl shimmer"></div>
          <div className="space-y-2">
            <div className="w-3/4 h-6 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
            <div className="w-1/2 h-4 bg-gray-200 dark:bg-gray-700 rounded shimmer"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {language === "ar" ? "تفاصيل المكان" : "Venue Details"}
          </h1>
        </div>
      </div>

      {/* Venue Image */}
      <div className="relative">
        <img
          src={venue.imageUrl || "/api/placeholder/400/200"}
          alt={language === "ar" ? venue.nameAr : venue.name}
          className="w-full h-48 object-cover object-center"
        />
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center bg-black bg-opacity-50 text-white px-2 py-1 rounded">
            <Star className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{venue.rating}</span>
          </div>
        </div>
      </div>

      {/* Venue Info */}
      <div className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {language === "ar" ? venue.nameAr : venue.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          {language === "ar" ? venue.categoryAr : venue.category}
        </p>

        <div className="flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {language === "ar" ? venue.addressAr : venue.address}
          </span>
        </div>

        {(language === "ar" ? venue.descriptionAr : venue.description) && (
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {language === "ar" ? venue.descriptionAr : venue.description}
          </p>
        )}
      </div>


        
      {/* Queue Information */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {language === "ar" ? "الطوابير المتاحة" : "Available Queues"}
        </h2>

        {queuesLoading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-4 shimmer h-24"
              ></div>
            ))}
          </div>
        ) : queues?.length === 0 ? (
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {language === "ar"
                  ? "لا توجد طوابير متاحة"
                  : "No queues available"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === "ar"
                  ? "هذا المكان لا يحتوي على طوابير في الوقت الحالي"
                  : "This venue has no queues at the moment"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {queues?.map((queue) => (
              <Card
                key={queue.id}
                className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {language === "ar" ? queue.nameAr : queue.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`status-dot ${getQueueStatusColor(queue.currentCount, queue.maxCapacity)}`}
                        ></div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {getQueueStatusText(
                            queue.currentCount,
                            queue.maxCapacity,
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>
                            {queue.currentCount || 0}/{queue.maxCapacity || 100}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            ~{queue.averageWaitTime || 0}{" "}
                            {language === "ar" ? "دقيقة" : "min"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="flex items-center">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              disabled={
                                reservationMutation.isPending &&
                                selectedQueue === queue.id
                              }
                              className="bg-primary text-white hover:bg-primary/90 px-2 rounded-r-md rounded-l-none border-l border-primary-foreground/20"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-56 p-3">
                            <div className="space-y-3">
                              <h4 className="font-medium text-sm">
                                {language === "ar"
                                  ? "عدد الأشخاص"
                                  : "Group Size"}
                              </h4>
                              <Select
                                value={groupSize.toString()}
                                onValueChange={(value) =>
                                  setGroupSize(parseInt(value))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                                    <SelectItem
                                      key={size}
                                      value={size.toString()}
                                    >
                                      {size}{" "}
                                      {language === "ar"
                                        ? size === 1
                                          ? "شخص"
                                          : "أشخاص"
                                        : size === 1
                                          ? "person"
                                          : "people"}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <Button
                                onClick={() =>
                                  handleJoinQueue(queue.id, groupSize)
                                }
                                disabled={
                                  reservationMutation.isPending &&
                                  selectedQueue === queue.id
                                }
                                className="w-full bg-primary text-white hover:bg-primary/90"
                              >
                                {language === "ar"
                                  ? `انضم بـ ${groupSize} أشخاص`
                                  : `Join with ${groupSize} people`}
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>

                        <Button
                          onClick={() => handleJoinQueue(queue.id, 1)}
                          disabled={
                            reservationMutation.isPending &&
                            selectedQueue === queue.id
                          }
                          className="bg-primary text-white hover:bg-primary/90 rounded-r-md rounded-r-none"
                        >
                          {reservationMutation.isPending &&
                          selectedQueue === queue.id
                            ? language === "ar"
                              ? "جاري الانضمام..."
                              : "Joining..."
                            : language === "ar"
                              ? "انضم للطابور"
                              : "Join Queue"}
                        </Button>
                      </div>
                    </div>
                  </div>


                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((queue.currentCount || 0) / (queue.maxCapacity || 100)) * 100}%`,
                      }}
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
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {language === "ar" ? "معلومات الاتصال" : "Contact Information"}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 dark:text-gray-400">
                  {language === "ar" ? "الهاتف:" : "Phone:"}
                </span>
                <a
                  href={`tel:${venue.phone}`}
                  className="text-primary font-medium"
                >
                  {venue.phone}
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      <ReservationToast 
        isVisible={showReservationToast}
        onClose={() => setShowReservationToast(false)}
      />
    </div>
  );
}
