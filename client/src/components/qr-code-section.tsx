import { QrCode, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QRCodeSectionProps {
  reservation: any;
}

export default function QRCodeSection({ reservation }: QRCodeSectionProps) {
  if (!reservation || reservation.status !== "waiting") {
    return null;
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "رمز الدخول السريع",
        text: `رمز الدخول الخاص بي لـ ${reservation.venue.nameAr}`,
        url: window.location.href,
      });
    }
  };

  return (
    <div className="px-4 py-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">رمز الدخول السريع</h3>
          <QrCode className="w-5 h-5" />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm opacity-90 mb-1">{reservation.venue.nameAr}</p>
            <p className="text-xs opacity-70">صالح لمدة 30 دقيقة</p>
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
              onClick={handleShare}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
            >
              <Share className="w-4 h-4 mr-2" />
              مشاركة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
