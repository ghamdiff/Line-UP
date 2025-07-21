import { Button } from "@/components/ui/button";
import type { Venue } from "@shared/schema";

interface MapSectionProps {
  venues: Venue[];
}

export default function MapSection({ venues }: MapSectionProps) {
  const getMapPinCount = (venue: Venue) => {
    // Mock queue count based on rating
    const ratingNum = parseFloat(venue.rating || "0");
    if (ratingNum >= 4.8) return Math.floor(Math.random() * 20) + 40;
    if (ratingNum >= 4.5) return Math.floor(Math.random() * 20) + 15;
    return Math.floor(Math.random() * 10) + 5;
  };

  const getPinColor = (count: number) => {
    if (count >= 40) return "bg-red-500";
    if (count >= 15) return "bg-primary";
    return "bg-secondary";
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">الأماكن القريبة</h2>
        <Button variant="ghost" className="text-primary font-medium text-sm">
          عرض الخريطة
        </Button>
      </div>
      
      {/* Mock Map with Location Pins */}
      <div className="bg-gray-200 rounded-xl h-48 relative overflow-hidden">
        {/* Map background image */}
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200"
          alt="خريطة المدينة"
          className="w-full h-full object-cover"
        />
        
        {/* Location Pins */}
        <div className="absolute inset-0">
          {venues.slice(0, 3).map((venue, index) => {
            const count = getMapPinCount(venue);
            const positions = [
              { top: "25%", right: "33%" },
              { top: "75%", right: "66%" },
              { top: "50%", right: "25%" }
            ];
            const position = positions[index];
            
            return (
              <div
                key={venue.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ top: position.top, right: position.right }}
              >
                <div className={`${getPinColor(count)} text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg map-pin`}>
                  {count}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Current Location */}
        <div className="absolute top-1/2 right-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
