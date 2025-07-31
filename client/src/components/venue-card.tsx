import { Star, Clock, Users } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Venue } from "@shared/schema";

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  const { language } = useLanguage();

  const getStatusColor = (rating: string) => {
    const ratingNum = parseFloat(rating);
    if (ratingNum >= 4.8) return "status-red";
    if (ratingNum >= 4.5) return "status-amber";
    return "status-green";
  };

  const getWaitTimeRange = () => {
    // Mock wait time based on venue popularity
    const ratingNum = parseFloat(venue.rating || "0");
    if (language === 'ar') {
      if (ratingNum >= 4.8) return "45-60 دقيقة";
      if (ratingNum >= 4.5) return "15-20 دقيقة";
      return "5-10 دقائق";
    } else {
      if (ratingNum >= 4.8) return "45-60 min";
      if (ratingNum >= 4.5) return "15-20 min";
      return "5-10 min";
    }
  };

  const getQueueStatus = () => {
    const ratingNum = parseFloat(venue.rating || "0");
    if (language === 'ar') {
      if (ratingNum >= 4.8) return "طابور طويل";
      if (ratingNum >= 4.5) return "طابور متوسط";
      return "طابور قصير";
    } else {
      if (ratingNum >= 4.8) return "Long queue";
      if (ratingNum >= 4.5) return "Medium queue";
      return "Short queue";
    }
  };

  return (
    <Link href={`/venue/${venue.id}`}>
      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="flex">
            <img
              src={venue.imageUrl || "/api/placeholder/80/80"}
              alt={language === 'ar' ? venue.nameAr : venue.name}
              className="w-20 h-20 object-cover"
            />
            <div className="flex-1 p-3">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {language === 'ar' ? venue.nameAr : venue.name}
                </h3>
                <div className="flex items-center ml-2">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-600 dark:text-gray-300 mr-1">{venue.rating}</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {language === 'ar' ? venue.categoryAr : venue.category}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`status-dot ${getStatusColor(venue.rating || "0")} mr-2`}></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">{getQueueStatus()}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">{getWaitTimeRange()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
