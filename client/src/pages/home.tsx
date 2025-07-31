import { useQuery } from "@tanstack/react-query";
import { Search, MapPin, Bell, Calendar, Utensils, Ticket, Map } from "lucide-react";
import { Link } from "wouter";
import VenueCard from "@/components/venue-card";
import MapSection from "@/components/map-section";
import QRCodeSection from "@/components/qr-code-section";
import CurrentQueueStatus from "@/components/current-queue-status";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Venue } from "@shared/schema";

export default function Home() {
  const { data: venues, isLoading } = useQuery<Venue[]>({
    queryKey: ["/api/venues"],
  });

  const { data: activeReservation } = useQuery<any>({
    queryKey: ["/api/reservations/active/1"],
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Header with Location */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MapPin className="text-primary w-5 h-5" />
            <div>
              <p className="font-semibold text-gray-900">الموقع الحالالبحثي</p>
              <p className="text-sm text-gray-500">أبها، المملكة العربية السعودية</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="p-2 bg-gray-100 rounded-full relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white border-b border-gray-100">
        <div className="relative">
          <Input
            type="text"
            placeholder="ابحث عن الأماكن والفعاليات..."
            className="w-full pr-10 pl-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-primary focus:bg-white text-right"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <div className="grid grid-cols-4 gap-3">
          <Link href="/search?category=events">
            <Button variant="ghost" className="flex flex-col items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 h-auto">
              <Calendar className="text-primary w-6 h-6 mb-2" />
              <span className="text-xs font-medium text-gray-700">الفعاليات</span>
            </Button>
          </Link>
          <Link href="/search?category=restaurants">
            <Button variant="ghost" className="flex flex-col items-center p-3 bg-green-50 rounded-xl hover:bg-green-100 h-auto">
              <Utensils className="text-secondary w-6 h-6 mb-2" />
              <span className="text-xs font-medium text-gray-700">المطاعم</span>
            </Button>
          </Link>
          <Link href="/search?category=tickets">
            <Button variant="ghost" className="flex flex-col items-center p-3 bg-amber-50 rounded-xl hover:bg-amber-100 h-auto">
              <Ticket className="text-accent w-6 h-6 mb-2" />
              <span className="text-xs font-medium text-gray-700">التذاكر</span>
            </Button>
          </Link>
          <Link href="/search?map=true">
            <Button variant="ghost" className="flex flex-col items-center p-3 bg-purple-50 rounded-xl hover:bg-purple-100 h-auto">
              <Map className="text-purple-500 w-6 h-6 mb-2" />
              <span className="text-xs font-medium text-gray-700">الخريطة</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Current Queue Status */}
      {activeReservation && <CurrentQueueStatus reservation={activeReservation} />}

      {/* Popular Venues */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">الأماكن المشهورة</h2>
          <Link href="/search">
            <Button variant="ghost" className="text-primary font-medium text-sm">
              عرض الكل
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shimmer h-20"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {venues?.slice(0, 3).map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </div>

      {/* Map Section */}
      <MapSection venues={venues || []} />

      {/* QR Code Section */}
      {activeReservation && <QRCodeSection reservation={activeReservation} />}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
