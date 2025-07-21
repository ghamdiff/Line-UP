import { venues, queues, reservations, reviews, users, type User, type InsertUser, type Venue, type InsertVenue, type Queue, type InsertQueue, type Reservation, type InsertReservation, type Review, type InsertReview } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Venue methods
  getAllVenues(): Promise<Venue[]>;
  getVenue(id: number): Promise<Venue | undefined>;
  getVenuesByCategory(category: string): Promise<Venue[]>;
  getVenuesNearby(lat: number, lng: number, radius: number): Promise<Venue[]>;
  createVenue(venue: InsertVenue): Promise<Venue>;

  // Queue methods
  getQueuesByVenue(venueId: number): Promise<Queue[]>;
  getQueue(id: number): Promise<Queue | undefined>;
  updateQueueCount(id: number, count: number): Promise<Queue | undefined>;
  createQueue(queue: InsertQueue): Promise<Queue>;

  // Reservation methods
  getReservationsByUser(userId: number): Promise<(Reservation & { venue: Venue; queue: Queue })[]>;
  getReservation(id: number): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservationStatus(id: number, status: string): Promise<Reservation | undefined>;
  getActiveReservationByUser(userId: number): Promise<(Reservation & { venue: Venue; queue: Queue }) | undefined>;

  // Review methods
  getReviewsByVenue(venueId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private venues: Map<number, Venue>;
  private queues: Map<number, Queue>;
  private reservations: Map<number, Reservation>;
  private reviews: Map<number, Review>;
  private currentUserId: number;
  private currentVenueId: number;
  private currentQueueId: number;
  private currentReservationId: number;
  private currentReviewId: number;

  constructor() {
    this.users = new Map();
    this.venues = new Map();
    this.queues = new Map();
    this.reservations = new Map();
    this.reviews = new Map();
    this.currentUserId = 1;
    this.currentVenueId = 1;
    this.currentQueueId = 1;
    this.currentReservationId = 1;
    this.currentReviewId = 1;
    this.initializeMockData();
  }

  private initializeMockData() {
    // Add mock venues
    const mockVenues = [
      {
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
      },
      {
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
      },
      {
        name: "Adventure World",
        nameAr: "عالم المغامرات",
        category: "Theme Park",
        categoryAr: "ملاهي",
        description: "Thrilling rides and family entertainment",
        descriptionAr: "ألعاب مثيرة وترفيه عائلي",
        latitude: "24.8059",
        longitude: "46.6545",
        address: "Al Malqa District, Riyadh",
        addressAr: "حي الملقا، الرياض",
        phone: "+966112345680",
        rating: "4.9",
        imageUrl: "https://pixabay.com/get/g3b12da663d748773d4d4df6c4a2114d1a596019a910c22a006c38b46a5aed384f969ef649c15491578576e64132138c5940046dc60a7036cbc674eec4d51e86c_1280.jpg",
        isActive: true,
      }
    ];

    mockVenues.forEach(venue => {
      const id = this.currentVenueId++;
      this.venues.set(id, { ...venue, id, createdAt: new Date() });
    });

    // Add mock queues
    this.venues.forEach((venue, venueId) => {
      const queueId = this.currentQueueId++;
      this.queues.set(queueId, {
        id: queueId,
        venueId: venueId,
        name: "Main Entry",
        nameAr: "الدخول الرئيسي",
        maxCapacity: 100,
        currentCount: Math.floor(Math.random() * 50),
        averageWaitTime: Math.floor(Math.random() * 60) + 5,
        isActive: true,
        createdAt: new Date(),
      });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id, 
      phone: insertUser.phone || null,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getAllVenues(): Promise<Venue[]> {
    return Array.from(this.venues.values()).filter(venue => venue.isActive);
  }

  async getVenue(id: number): Promise<Venue | undefined> {
    return this.venues.get(id);
  }

  async getVenuesByCategory(category: string): Promise<Venue[]> {
    return Array.from(this.venues.values()).filter(
      venue => venue.isActive && (venue.category === category || venue.categoryAr === category)
    );
  }

  async getVenuesNearby(lat: number, lng: number, radius: number): Promise<Venue[]> {
    // Simple distance calculation for mock data
    return Array.from(this.venues.values()).filter(venue => venue.isActive);
  }

  async createVenue(insertVenue: InsertVenue): Promise<Venue> {
    const id = this.currentVenueId++;
    const venue: Venue = { 
      ...insertVenue, 
      id, 
      description: insertVenue.description || null,
      descriptionAr: insertVenue.descriptionAr || null,
      phone: insertVenue.phone || null,
      rating: insertVenue.rating || "0",
      imageUrl: insertVenue.imageUrl || null,
      isActive: insertVenue.isActive ?? true,
      createdAt: new Date() 
    };
    this.venues.set(id, venue);
    return venue;
  }

  async getQueuesByVenue(venueId: number): Promise<Queue[]> {
    return Array.from(this.queues.values()).filter(
      queue => queue.venueId === venueId && queue.isActive
    );
  }

  async getQueue(id: number): Promise<Queue | undefined> {
    return this.queues.get(id);
  }

  async updateQueueCount(id: number, count: number): Promise<Queue | undefined> {
    const queue = this.queues.get(id);
    if (queue) {
      queue.currentCount = count;
      this.queues.set(id, queue);
    }
    return queue;
  }

  async createQueue(insertQueue: InsertQueue): Promise<Queue> {
    const id = this.currentQueueId++;
    const queue: Queue = { 
      ...insertQueue, 
      id, 
      maxCapacity: insertQueue.maxCapacity || null,
      currentCount: insertQueue.currentCount || null,
      averageWaitTime: insertQueue.averageWaitTime || null,
      isActive: insertQueue.isActive ?? true,
      createdAt: new Date() 
    };
    this.queues.set(id, queue);
    return queue;
  }

  async getReservationsByUser(userId: number): Promise<(Reservation & { venue: Venue; queue: Queue })[]> {
    const userReservations = Array.from(this.reservations.values()).filter(
      reservation => reservation.userId === userId
    );

    return userReservations.map(reservation => {
      const queue = this.queues.get(reservation.queueId)!;
      const venue = this.venues.get(queue.venueId)!;
      return { ...reservation, venue, queue };
    });
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = this.currentReservationId++;
    const queue = await this.getQueue(insertReservation.queueId);
    const position = (queue?.currentCount || 0) + 1;
    const qrCode = `QR-${id}-${Date.now()}`;
    
    const reservation: Reservation = {
      ...insertReservation,
      id,
      position,
      estimatedWaitTime: insertReservation.estimatedWaitTime || null,
      status: insertReservation.status || "waiting",
      qrCode,
      notificationSent: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    this.reservations.set(id, reservation);
    
    // Update queue count
    if (queue && queue.currentCount !== null) {
      await this.updateQueueCount(queue.id, queue.currentCount + 1);
    }
    
    return reservation;
  }

  async updateReservationStatus(id: number, status: string): Promise<Reservation | undefined> {
    const reservation = this.reservations.get(id);
    if (reservation) {
      reservation.status = status;
      reservation.updatedAt = new Date();
      this.reservations.set(id, reservation);
    }
    return reservation;
  }

  async getActiveReservationByUser(userId: number): Promise<(Reservation & { venue: Venue; queue: Queue }) | undefined> {
    const activeReservation = Array.from(this.reservations.values()).find(
      reservation => reservation.userId === userId && reservation.status === "waiting"
    );

    if (activeReservation) {
      const queue = this.queues.get(activeReservation.queueId)!;
      const venue = this.venues.get(queue.venueId)!;
      return { ...activeReservation, venue, queue };
    }

    return undefined;
  }

  async getReviewsByVenue(venueId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      review => review.venueId === venueId
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { 
      ...insertReview, 
      id, 
      comment: insertReview.comment || null,
      commentAr: insertReview.commentAr || null,
      createdAt: new Date() 
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
