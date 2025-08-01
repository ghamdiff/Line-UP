import { Home, Search, Clock, User, Bot } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BottomNavigation() {
  const [location] = useLocation();
  const { t } = useLanguage();
  
  const { data: activeReservation } = useQuery<any>({
    queryKey: ["/api/reservations/active/1"],
  });

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const getIconColor = (path: string) => 
    isActive(path) ? "text-primary dark:text-primary" : "text-gray-400 dark:text-gray-500";

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50"> 
      <div className="grid grid-cols-4 py-2"> 
        <Link href="/">
          <Button variant="ghost" className={`flex flex-col items-center py-2 h-auto w-full ${getIconColor("/")}`}> 
            <Home className="w-5 h-5 mb-1" />
            <span className="text-xs font-medium">{t('home')}</span>
          </Button>
        </Link>
        
        <Link href="/search">
          <Button variant="ghost" className={`flex flex-col items-center py-2 h-auto w-full ${getIconColor("/search")}`}> 
            <Search className="w-5 h-5 mb-1" />
            <span className="text-xs">{t('search')}</span>
          </Button>
        </Link>
        
        <Link href="/my-queues">
          <Button variant="ghost" className={`flex flex-col items-center py-2 h-auto relative w-full ${getIconColor("/my-queues")}`}> 
            <Clock className="w-5 h-5 mb-1" />
            <span className="text-xs">{t('myQueues')}</span>
            {activeReservation && (
              <div className="absolute -top-1 right-1/4 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
          </Button>
        </Link>
        
        <Link href="/profile">
          <Button variant="ghost" className={`flex flex-col items-center py-2 h-auto w-full ${getIconColor("/profile")}`}> 
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs">{t('profile')}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}