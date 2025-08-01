import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import VenueCard from "@/components/venue-card";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Venue } from "@shared/schema";

export default function SearchPage() {
  const [location] = useLocation();
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: venues, isLoading } = useQuery<Venue[]>({
    queryKey: ["/api/venues"],
  });

  const filteredVenues = venues?.filter(venue => {
    const matchesSearch = !searchQuery ||
      venue.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      venue.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "all" ||
      venue.categoryAr === getCategoryArabic(selectedCategory) ||
      venue.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  function getCategoryArabic(category: string): string {
    const categoryMap: Record<string, string> = {
      "Entertainment": "ترفيه",
      "Museum": "متاحف",
      "Theme Park": "ملاهي",
      "Restaurant": "مطاعم",
      "Events": "فعاليات"
    };
    return categoryMap[category.toLowerCase()] || category;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/">
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{t('search')}</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="relative">
          <Input
            type="text"
            placeholder={language === 'ar' ? 'ابحث عن الأماكن والفعاليات...' : 'Search for places and events...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl border-0 focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 text-right dark:text-white"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-4 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-700">
            <TabsTrigger value="all" className="text-xs dark:text-gray-300">{language === 'ar' ? 'الكل' : 'All'}</TabsTrigger>
            <TabsTrigger value="Entertainment" className="text-xs dark:text-gray-300">{language === 'ar' ? 'ترفيه' : 'Entertainment'}</TabsTrigger>
            <TabsTrigger value="museum" className="text-xs dark:text-gray-300">{language === 'ar' ? 'متاحف' : 'Museums'}</TabsTrigger>
            <TabsTrigger value="theme park" className="text-xs dark:text-gray-300">{language === 'ar' ? 'ملاهي' : 'Theme Parks'}</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shimmer h-24"></div>
            ))}
          </div>
        ) : filteredVenues?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'ar' ? 'لا توجد نتائج' : 'No Results Found'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'ar' ? 'حاول البحث بكلمات أخرى أو تغيير التصنيف' : 'Try different search terms or change category'}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {language === 'ar' ? 'النتائج' : 'Results'}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {filteredVenues?.length} {language === 'ar' ? 'نتيجة' : 'results'}
              </span>
            </div>
            {filteredVenues?.map((venue) => (
              <VenueCard key={venue.id} venue={venue} />
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
