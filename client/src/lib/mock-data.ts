import type { Venue, Queue, Reservation } from "@shared/schema";

export const mockVenues: Venue[] = [
  {
    id: 1,
    name: "Soudah Cable Car",
    nameAr: "تلفريك السودة",
    category: "entertainment",
    categoryAr: "ترفيه",
    description: "A scenic cable car experience offering breathtaking views of the Asir mountains and valleys.",
    descriptionAr: "تجربة تلفريك خلابة تقدم إطلالات رائعة على جبال ووديان عسير.",
    latitude: "18.2383",
    longitude: "42.3691",
    address: "Soudah, Asir Region, Saudi Arabia",
    addressAr: "السودة، منطقة عسير، المملكة العربية السعودية",
    phone: "+966920000089",
    rating: "4.7",
    imageUrl: "https://i.ibb.co/ZRxptFPz/IMG-20250723-WA0069.jpg",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: "High City",
    nameAr: "المدينة العالية",
    category: "entertainment",
    categoryAr: "ترفيه",
    description: "A modern mountaintop destination in Abha offering dining, entertainment, and stunning mountain views.",
    descriptionAr: "وجهة جبلية عصرية في أبها تقدم المأكولات والترفيه والإطلالات الجبلية الخلابة.",
    latitude: "18.2165",
    longitude: "42.5053",
    address: "High City, King Abdulaziz Road, Abha 62521, Saudi Arabia",
    addressAr: "المدينة العالية، طريق الملك عبدالعزيز، أبها 62521، المملكة العربية السعودية",
    phone: "+966172289090",
    rating: "4.8",
    imageUrl: "https://i.ibb.co/RTSmmLd6/IMG-20250723-WA0072.jpg",
    isActive: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: "Abha Entertainment Carnival",
    nameAr: "كرنفال أبها الترفيهي",
    category: "Theme Park",
    categoryAr: "ملاهي",
    description: "A family-friendly carnival in Abha featuring cultural shows, games, local markets, food trucks, and scenic seating areas.",
    descriptionAr: "كرنفال ترفيهي عائلي في أبها يشمل فعاليات ثقافية، ألعاب، أسواق شعبية، عربات طعام، وجلسات جبلية.",
    latitude: "18.2165",
    longitude: "42.5053",
    address: "Sama Abha Park & Art Street, Abha, Asir Region, Saudi Arabia",
    addressAr: "حديقة سما أبها وشارع الفن، أبها، منطقة عسير، المملكة العربية السعودية",
    phone: "+966920000089",
    rating: "4.4",
    imageUrl: "https://i.ibb.co/1GFPWQ6v/SAVE-20250723-201047.jpg",
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
  if (percentage < 10) return "طابور قصير";
  if (percentage < 30) return "طابور متوسط";
  return "طابور طويل";
};

export const getEstimatedWaitTime = (position: number, averageWaitTime: number): number => {
  return Math.round(position * (averageWaitTime / 10));
};
