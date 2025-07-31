import { Home, Search, Clock, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function BottomNavigation() {
  const [location] = useLocation();
  
  const { data: activeReservation } = useQuery<any>({
    queryKey: ["/api/reservations/active/1"],
  });

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const getIconColor = (path: string) => 
    isActive(path) ? "text-primary" : "text-gray-400";

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 py-2">
        <Link href="/">
          <Button variant="ghost" className={`flex flex-col items-center py-2 h-auto ${getIconColor("/")}`}>
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">الرئيسية</span>
          </Button>
        </Link>
        
        <Link href="/search">
          <Button variant="ghost" className={`flex flex-col items-center py-2 h-auto ${getIconColor("/search")}`}>
            <Search className="w-5 h-5 mb-1" />
            <span className="text-xs">البحث</span>
          </Button>
        </Link>
        
        <Link href="/ai-tool">
          <Button variant="ghost" className={`flex flex-col items-center py-2 h-auto ${getIconColor("/ai-tool")}`}>
            <span className="text-lg">استكشف</span>
          </Button>
        </Link>
        
        <Link href="/my-queues">
          <Button variant="ghost" className={`flex flex-col items-center py-2 h-auto relative ${getIconColor("/my-queues")}`}>
            <Clock className="w-5 h-5 mb-1" />
            <span className="text-xs">طوابيري</span>
            {activeReservation && (
              <div className="absolute -top-1 right-1/4 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </Button>
        </Link>
        
        <Link href="/profile">
          <Button variant="ghost" className={`flex flex-col items-center py-2 h-auto ${getIconColor("/profile")}`}>
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">الملف الشخصي</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}