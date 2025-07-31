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
    return "hidden";
  };

  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">فعاليات قريبة</h2>
        <Button variant="ghost" className="text-primary font-medium text-sm" onClick={() => {
           const mapImage = document.querySelector('img[alt="الخريطة منطقة عسير "]') as HTMLImageElement | null;
           if (mapImage) {
             mapImage.scrollIntoView({ behavior: 'smooth', block: 'center' });
           }
        }}>
          أظهر لي الخريطة
        </Button>
      </div>
      
      {/* Live Map with Location Pins */}
      <div className="rounded-xl h-48 relative overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d236577.8757149288!2d42.68158845393613!3d18.21738731741536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15e8ee378100c19f%3A0x41075240e0e42666!2z2YXYttmF2KjYudmE2Kkg2KfZhNmC2KfZh9mI2LHYqQ!5e0!3m2!1sar!2ssa!4v1709234756918!5m2!1sar!2ssa"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Live Map of Aseer Region"
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
