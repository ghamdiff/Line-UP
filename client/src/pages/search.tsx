import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import VenueCard from "@/components/venue-card";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Venue } from "@shared/schema";

export default function SearchPage() {
  const [location] = useLocation();
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
      "entertainment": "ترفيه",
      "museum": "متاحف",
      "theme park": "ملاهي",
      "restaurant": "مطاعم",
      "events": "فعاليات"
    };
    return categoryMap[category.toLowerCase()] || category;
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
          <h1 className="text-lg font-semibold text-gray-900">البحث</h1>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <div className="relative">
          <Input
            type="text"
            placeholder="ابحث عن الأماكن والفعاليات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pr-10 pl-4 py-3 bg-gray-100 rounded-xl border-0 focus:ring-2 focus:ring-primary focus:bg-white text-right"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4 py-4 bg-white border-b border-gray-100">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 bg-gray-100">
            <TabsTrigger value="all" className="text-xs">الكل</TabsTrigger>
            <TabsTrigger value="entertainment" className="text-xs">ترفيه</TabsTrigger>
            <TabsTrigger value="museum" className="text-xs">متاحف</TabsTrigger>
            <TabsTrigger value="theme park" className="text-xs">ملاهي</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Results */}
      <div className="px-4 py-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 shimmer h-24"></div>
            ))}
          </div>
        ) : filteredVenues?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500">حاول البحث بكلمات أخرى أو تغيير التصنيف</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">النتائج</h2>
              <span className="text-sm text-gray-500">{filteredVenues?.length} نتيجة</span>
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
