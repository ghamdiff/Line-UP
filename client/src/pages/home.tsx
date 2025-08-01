import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Building2,
  Bell,
  Calendar,
  Utensils,
  Ticket,
  BotMessageSquare,
} from "lucide-react";
import { Link } from "wouter";
import VenueCard from "@/components/venue-card";
import MapSection from "@/components/map-section";
import QRCodeSection from "@/components/qr-code-section";
import CurrentQueueStatus from "@/components/current-queue-status";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Venue } from "@shared/schema";

export default function Home() {
  const { user } = useAuth();
  const { t, language } = useLanguage();
  
  const { data: venues, isLoading } = useQuery<Venue[]>({
    queryKey: ["/api/venues"],
  });

  const { data: activeReservation } = useQuery<any>({
    queryKey: ["/api/reservations/active/1"],
    refetchInterval: 3000, // Auto-refresh every 3 seconds for real-time updates
    refetchOnWindowFocus: true, // Refresh when user returns to tab
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="text-primary w-5 h-5" />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                {language === 'ar' 
                  ? `مرحبًا ${user?.name || 'بك'} في أبها!` 
                  : `Welcome ${user?.name || ''} to Abha!`}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === 'ar' ? 'اكتشف ما هو متاح بالقرب منك' : 'Discover what\'s available near you'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full relative"
          >
            <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-3 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="relative">
          <Input
            type="text"
            placeholder={language === 'ar' ? 'ابحث عن الأماكن والفعاليات...' : 'Search for places and events...'}
            className="w-full pr-10 pl-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-0 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 text-right dark:text-white"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-4 gap-3">
          <Link href="/search?category=events">
            <Button
              variant="ghost"
              className="w-full flex flex-col items-center p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/50 h-auto"
            >
              <Calendar className="text-blue-500 w-6 h-6 mb-2" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'الفعاليات' : 'Events'}
              </span>
            </Button>
          </Link>
          <Link href="/search?category=restaurants">
            <Button
              variant="ghost"
              className="w-full flex flex-col items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-xl hover:bg-green-100 dark:hover:bg-green-900/50 h-auto"
            >
              <Utensils className="text-green-500 w-6 h-6 mb-2" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'المطاعم' : 'Restaurants'}
              </span>
            </Button>
          </Link>
          <Link href="/search?category=tickets">
            <Button
              variant="ghost"
              className="w-full flex flex-col items-center p-3 bg-amber-50 dark:bg-amber-900/30 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/50 h-auto"
            >
              <Ticket className="text-yellow-500 w-6 h-6 mb-2" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'التذاكر' : 'Tickets'}
              </span>
            </Button>
          </Link>
          <Link href="/discover">
            <Button
              variant="ghost"
              className="w-full flex flex-col items-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/50 h-auto"
            >
              <BotMessageSquare className="text-purple-500 w-6 h-6 mb-2" />
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {language === 'ar' ? 'اكتشف' : 'Discover'}
              </span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Current Queue Status */}
      {activeReservation && (
        <>
          <CurrentQueueStatus reservation={activeReservation} />
          <QRCodeSection reservation={activeReservation} />
        </>
      )}

      {/* Popular Venues */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {language === 'ar' ? 'الأماكن المشهورة' : 'Popular Places'}
          </h2>
          <Link href="/search">
            <Button
              variant="ghost"
              className="text-primary font-medium text-sm"
            >
              {language === 'ar' ? 'عرض الكل' : 'View All'}
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-4 shimmer h-24"
              ></div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {venues
              ?.slice(0, 3)
              .map((venue) => <VenueCard key={venue.id} venue={venue} />)}
          </div>
        )}
      </div>

      {/* Map Section */}
      <MapSection venues={venues || []} />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
