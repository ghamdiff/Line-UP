import { ArrowRight, User, Settings, HelpCircle, Star, Clock, MapPin } from "lucide-react";
import { Link } from "wouter";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Profile() {
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
          <h1 className="text-lg font-semibold text-gray-900">الملف الشخصي</h1>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-6 bg-white border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-white text-xl font-semibold">
              أ
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">أحمد محمد</h2>
            <p className="text-gray-500">ahmed.hasan@example.com</p>
            <p className="text-sm text-gray-400">+966 50 123 4567</p>
          </div>
          <Button variant="outline" size="sm">
            تعديل
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-gray-500">طابور مكتمل</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-xs text-gray-500">متوسط التقييم</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-4">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-500">مكان زرته</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4 py-4">
        <div className="space-y-2">
          <Card>
            <CardContent className="p-0">
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium">التقييمات والمراجعات</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 rtl-flip" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">تاريخ الطوابير</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 rtl-flip" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <Settings className="w-4 h-4 text-gray-600" />
                  </div>
                  <span className="font-medium">الإعدادات</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 rtl-flip" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Button variant="ghost" className="w-full justify-between p-4 h-auto">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-amber-600" />
                  </div>
                  <span className="font-medium">المساعدة والدعم</span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 rtl-flip" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 py-4">
        <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
          تسجيل الخروج
        </Button>
      </div>

      <BottomNavigation />
    </div>
  );
}
