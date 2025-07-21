import type { Venue, Queue, Reservation } from "@shared/schema";

export const mockVenues: Venue[] = [
  {
    id: 1,
    name: "Riyadh Music Festival",
    nameAr: "مهرجان الرياض للموسيقى",
    category: "Entertainment",
    categoryAr: "ترفيه",
    description: "Annual music festival with international artists",
    descriptionAr: "مهرجان موسيقي سنوي مع فنانين عالميين",
    latitude: "24.7136",
    longitude: "46.6753",
    address: "King Fahd Cultural Centre, Riyadh",
    addressAr: "مركز الملك فهد الثقافي، الرياض",
    phone: "+966112345678",
    rating: "4.8",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "National Heritage Museum",
    nameAr: "متحف التراث الوطني",
    category: "Museum",
    categoryAr: "متاحف",
    description: "Explore Saudi Arabia's rich cultural heritage",
    descriptionAr: "استكشف التراث الثقافي الغني للمملكة العربية السعودية",
    latitude: "24.6478",
    longitude: "46.7219",
    address: "King Abdulaziz Historical Center, Riyadh",
    addressAr: "مركز الملك عبدالعزيز التاريخي، الرياض",
    phone: "+966112345679",
    rating: "4.6",
    imageUrl: "https://pixabay.com/get/g14a3832ac7902b2313db8c0cac78171d01340726c3e63102b9a0df16922586a20d3c2556626acfbf7049757c931d3ea9d3e9b2bbe19297011a5357d4fbfecc70_1280.jpg",
    isActive: true,
    createdAt: new Date(),
  },
];

export const mockQueues: Queue[] = [
  {
    id: 1,
    venueId: 1,
    name: "Main Entry",
    nameAr: "الدخول الرئيسي",
    maxCapacity: 100,
    currentCount: 25,
    averageWaitTime: 15,
    isActive: true,
    createdAt: new Date(),
  },
];

export const getQueueStatusText = (currentCount: number, maxCapacity: number): string => {
  const percentage = (currentCount / maxCapacity) * 100;
  if (percentage < 30) return "طابور قصير";
  if (percentage < 70) return "طابور متوسط";
  return "طابور طويل";
};

export const getEstimatedWaitTime = (position: number, averageWaitTime: number): number => {
  return Math.round(position * (averageWaitTime / 10));
};
