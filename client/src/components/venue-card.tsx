import { Star, Clock, Users } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import type { Venue } from "@shared/schema";

interface VenueCardProps {
  venue: Venue;
}

export default function VenueCard({ venue }: VenueCardProps) {
  const getStatusColor = (rating: string) => {
    const ratingNum = parseFloat(rating);
    if (ratingNum >= 4.5) return "status-green";
    if (ratingNum >= 4.0) return "status-amber";
    return "status-red";
  };

  const getWaitTimeRange = () => {
    // Mock wait time based on venue popularity
    const ratingNum = parseFloat(venue.rating || "0");
    if (ratingNum >= 4.8) return "45-60 دقيقة";
    if (ratingNum >= 4.5) return "15-20 دقيقة";
    return "5-10 دقائق";
  };

  const getQueueStatus = () => {
    const ratingNum = parseFloat(venue.rating || "0");
    if (ratingNum >= 4.8) return "طابور طويل";
    if (ratingNum >= 4.5) return "طابور متوسط";
    return "طابور قصير";
  };

  return (
    <Link href={`/venue/${venue.id}`}>
      <Card className="bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="flex">
            <img
              src={venue.imageUrl || "/api/placeholder/80/80"}
              alt={venue.nameAr}
              className="w-20 h-20 object-cover"
            />
            <div className="flex-1 p-3">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{venue.nameAr}</h3>
                <div className="flex items-center ml-2">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-gray-600 mr-1">{venue.rating}</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mb-2">{venue.categoryAr}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`status-dot ${getStatusColor(venue.rating || "0")} mr-2`}></div>
                  <span className="text-xs text-gray-600 font-medium">{getQueueStatus()}</span>
                </div>
                <span className="text-xs text-gray-500">{getWaitTimeRange()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
