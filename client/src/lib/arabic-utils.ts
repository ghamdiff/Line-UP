export const formatArabicNumber = (num: number): string => {
  return num.toLocaleString('ar-SA');
};

export const formatArabicTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${formatArabicNumber(minutes)} دقيقة`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${formatArabicNumber(hours)} ساعة`;
  }
  
  return `${formatArabicNumber(hours)} ساعة و ${formatArabicNumber(remainingMinutes)} دقيقة`;
};

export const formatArabicDate = (date: Date): string => {
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatArabicDateTime = (date: Date): string => {
  return date.toLocaleString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getArabicDayOfWeek = (date: Date): string => {
  const days = [
    'الأحد',
    'الاثنين',
    'الثلاثاء',
    'الأربعاء',
    'الخميس',
    'الجمعة',
    'السبت'
  ];
  return days[date.getDay()];
};

export const getQueueStatusInArabic = (status: string): string => {
  const statusMap: Record<string, string> = {
    'waiting': 'في الانتظار',
    'called': 'حان دورك',
    'completed': 'مكتمل',
    'cancelled': 'ملغي',
  };
  return statusMap[status] || status;
};

export const getCategoryInArabic = (category: string): string => {
  const categoryMap: Record<string, string> = {
    'Entertainment': 'ترفيه',
    'museum': 'متاحف',
    'theme park': 'ملاهي',
    'restaurant': 'مطاعم',
    'events': 'فعاليات',
    'shopping': 'تسوق',
    'sports': 'رياضة',
  };
  return categoryMap[category.toLowerCase()] || category;
};
