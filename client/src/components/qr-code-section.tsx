import { QrCode, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface QRCodeSectionProps {
  reservation: any;
}

export default function QRCodeSection({ reservation }: QRCodeSectionProps) {
  const { language } = useLanguage();
  
  if (!reservation || reservation.status !== "waiting") {
    return null;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: language === 'ar' ? "رمز الدخول السريع" : "Quick Entry Code",
        text: language === 'ar' 
          ? `رمز الدخول الخاص بي لـ ${reservation.venue.nameAr}`
          : `My entry code for ${reservation.venue.name}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="px-4 py-0 pb-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-700 dark:to-gray-600 rounded-xl p-4 text-white cursor-pointer hover:from-gray-800 hover:to-gray-700 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200"
           onClick={() => {
             // Make the whole QR section clickable
             handleShare();
           }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">
            {language === 'ar' ? 'رمز الدخول السريع' : 'Quick Entry Code'}
          </h3>
          <QrCode className="w-5 h-5" />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm opacity-90 mb-1">
              {language === 'ar' ? reservation.venue.nameAr : reservation.venue.name}
            </p>
            <p className="text-xs opacity-70">
              {language === 'ar' ? 'صالح لمدة 30 دقيقة' : 'Valid for 30 minutes'}
            </p>
            <div className="mt-2">
              <div className="w-16 h-16 bg-white rounded-lg p-1">
                {/* Simple QR code representation */}
                <div className="w-full h-full bg-gray-900 rounded grid grid-cols-8 gap-px p-1">
                  {[...Array(64)].map((_, i) => (
                    <div
                      key={i}
                      className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-gray-900'} rounded-sm`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-left">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation(); // Prevent double triggering
                handleShare();
              }}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
            >
              <Share className="w-4 h-4 mr-2" />
              {language === 'ar' ? 'مشاركة' : 'Share'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
