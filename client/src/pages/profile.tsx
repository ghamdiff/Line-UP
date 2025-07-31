import { ArrowRight, Star, Clock, MapPin, Settings, Moon, Sun, Globe, LogOut } from "lucide-react";
import { Link } from "wouter";
import BottomNavigation from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();

  const handleLogout = () => {
    logout();
  };

  // Get first letter of user's name for avatar
  const avatarLetter = user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/">
          </Link>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{t('profile')}</h1>
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            <AvatarFallback className="bg-primary text-white text-xl font-semibold">
              {avatarLetter}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'ar' ? 'طابور مكتمل' : 'Completed Queues'}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'ar' ? 'متوسط التقييم' : 'Average Rating'}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-4">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <MapPin className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'ar' ? 'مكان زرته' : 'Places Visited'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Settings Section */}
      <div className="px-4 py-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{t('settings')}</h3>
        <div className="space-y-2">
          {/* Dark Mode Toggle */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    {isDark ? (
                      <Moon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <Sun className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{t('darkMode')}</span>
                </div>
                <Switch checked={isDark} onCheckedChange={toggleTheme} />
              </div>
            </CardContent>
          </Card>

          {/* Language Toggle */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900 dark:text-white">{t('language')}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {language === 'ar' ? t('arabic') : t('english')}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={toggleLanguage}>
                  {language === 'ar' ? 'EN' : 'عر'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Other Menu Items */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <Button variant="ghost" className="w-full justify-between p-4 h-auto text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <Clock className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-medium">
                    {language === 'ar' ? 'تاريخ الطوابير' : 'Queue History'}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 rtl-flip" />
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <Button variant="ghost" className="w-full justify-between p-4 h-auto text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="font-medium">
                    {language === 'ar' ? 'التقييمات والمراجعات' : 'Reviews & Ratings'}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 rtl-flip" />
              </Button>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardContent className="p-0">
              <Button 
                variant="ghost" 
                className="w-full justify-start p-4 h-auto text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                onClick={handleLogout}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                    <LogOut className="w-4 h-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="font-medium">{t('logout')}</span>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}