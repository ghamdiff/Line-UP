import { createContext, useContext, useState, ReactNode } from "react";

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  ar: {
    // Navigation
    home: "الرئيسية",
    search: "البحث", 
    discover: "استكشف",
    myQueues: "طوابيري",
    profile: "الملف الشخصي",
    
    // Home page
    welcomeBack: "مرحباً بك مرة أخرى",
    nearbyEvents: "فعاليات قريبة",
    showMap: "أظهر لي الخريطة",
    currentQueue: "الطابور الحالي",
    estimatedTime: "الوقت المتوقع",
    yourPosition: "موقعك",
    viewQueue: "عرض الطابور",
    joinQueue: "انضم للطابور",
    
    // Profile page
    settings: "الإعدادات",
    darkMode: "الوضع الليلي",
    language: "اللغة",
    arabic: "العربية",
    english: "الإنجليزية",
    logout: "تسجيل الخروج",
    
    // Login page
    welcomeToQueue: "مرحباً بك في طابور",
    loginToContinue: "سجل دخولك للمتابعة",
    emailOrPhone: "البريد الإلكتروني أو رقم الهاتف",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    
    // Common
    minutes: "دقيقة",
    people: "شخص"
  },
  en: {
    // Navigation
    home: "Home",
    search: "Search",
    discover: "Discover", 
    myQueues: "My Queues",
    profile: "Profile",
    
    // Home page
    welcomeBack: "Welcome Back",
    nearbyEvents: "Nearby Events",
    showMap: "Show me the map",
    currentQueue: "Current Queue",
    estimatedTime: "Estimated Time",
    yourPosition: "Your Position",
    viewQueue: "View Queue",
    joinQueue: "Join Queue",
    
    // Profile page
    settings: "Settings",
    darkMode: "Dark Mode",
    language: "Language",
    arabic: "Arabic",
    english: "English", 
    logout: "Logout",
    
    // Login page
    welcomeToQueue: "Welcome to Queue",
    loginToContinue: "Login to continue",
    emailOrPhone: "Email or Phone Number",
    password: "Password",
    login: "Login",
    
    // Common
    minutes: "minutes",
    people: "people"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language') as Language;
    return saved || 'ar';
  });

  const toggleLanguage = () => {
    const newLang: Language = language === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
    
    // Update document direction
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['ar']] || key;
  };

  // Set initial direction
  useState(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  });

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}