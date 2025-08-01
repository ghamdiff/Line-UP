import {
  venues,
  queues,
  reservations,
  reviews,
  users,
  type User,
  type InsertUser,
  type Venue,
  type InsertVenue,
  type Queue,
  type InsertQueue,
  type Reservation,
  type InsertReservation,
  type Review,
  type InsertReview,
} from "@shared/schema";

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
  getReservationsByUser(
    userId: number,
  ): Promise<(Reservation & { venue: Venue; queue: Queue })[]>;
  getReservation(id: number): Promise<Reservation | undefined>;
  createReservation(
    reservation: InsertReservation & { userId: number; position?: number },
  ): Promise<Reservation>;
  updateReservationStatus(
    id: number,
    status: string,
  ): Promise<Reservation | undefined>;
  getActiveReservationByUser(
    userId: number,
  ): Promise<(Reservation & { venue: Venue; queue: Queue }) | undefined>;

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
        name: "Soudah Cable Car",
        nameAr: "تلفريك السودة",
        category: "Entertainment",
        categoryAr: "ترفيه",
        description:
          "A scenic cable car experience offering breathtaking views of the Asir mountains and valleys.",
        descriptionAr:
          "تجربة تلفريك خلابة تقدم إطلالات رائعة على جبال ووديان عسير.",
        latitude: "18.2383",
        longitude: "42.3691",
        address: "Soudah, Asir Region, Saudi Arabia",
        addressAr: "السودة، منطقة عسير، المملكة العربية السعودية",
        phone: "+966920000089",
        rating: "4.7",
        imageUrl: "https://i.ibb.co/ZRxptFPz/IMG-20250723-WA0069.jpg",
        isActive: true,
        pros: [
          "Breathtaking Scenic Views: Reviewers consistently highlight the stunning aerial views of the mountains, valleys, and the city.	",
          "Unique Experience: Offers a distinct way to experience the natural beauty of the Abha region.",
          "Connection to Nature: Provides access to natural attractions like Soudah Mountain and Aseer National Park.",
          "Good for Photography: Many users mention it as a great spot for taking beautiful pictures.",
        ], // Add your pros here
        cons: [
          "Operational Issues/Closures: Some reviews mention facilities being closed or staff being on leave, leading to disappointment.",
          "Limited Information/Signage: Information, especially in English, can be lacking or poorly translated.",
          "Weather Dependency: The experience can be affected by weather conditions, such as fog obscuring the views.",
          "Potential for Chilly Weather: It can get quite cold at the top of the mountain.",
        ], // Add your cons here
      },
      {
        name: "High City",
        nameAr: "المدينة العالية",
        category: "Entertainment",
        categoryAr: "ترفيه",
        description:
          "A modern mountaintop destination in Abha offering dining, entertainment, and stunning mountain views.",
        descriptionAr:
          "وجهة جبلية عصرية في أبها تقدم المأكولات والترفيه والإطلالات الجبلية الخلابة.",
        latitude: "18.2165",
        longitude: "42.5053",
        address: "High City, King Abdulaziz Road, Abha 62521, Saudi Arabia",
        addressAr:
          "المدينة العالية، طريق الملك عبدالعزيز، أبها 62521، المملكة العربية السعودية",
        phone: "+966172289090",
        rating: "4.8",
        imageUrl: "https://i.ibb.co/RTSmmLd6/IMG-20250723-WA0072.jpg",
        isActive: true,
        pros: [
          "Stunning Panoramic Views: Offers incredible views of Abha city and the surrounding mountains, especially at night.",
          "Cooler Climate: Due to its high altitude, it provides a milder and more pleasant temperature compared to other parts of Saudi Arabia.",
          "Pleasant Atmosphere: Described as a peaceful and relaxing place to spend time, with fresh air.",
          "Variety of Facilities: Features numerous cafes, restaurants, gift shops, and walking paths.",
          "Family-Friendly: Offers amenities like golf carts for easier movement, making it suitable for children and the elderly.",
        ], // Add your pros here
        cons: [
          "Family-Friendly: Offers amenities like golf carts for easier movement, making it suitable for children and the elderly.",
          "Parking Difficulties: Several reviews mention that car parking can be challenging.",
          "Expensive Food Stalls: Some visitors find the food and coffee shops to be on the pricier side, leading some families to bring their own snacks.",
          'Fog can obscure views: While fog can add to the "different world" feel, it can also completely hide the views at times.',
        ], // Add your cons here
      },
      {
        name: "Abha Entertainment Carnival",
        nameAr: "كرنفال أبها الترفيهي",
        category: "Theme Park",
        categoryAr: "ملاهي",
        description:
          "A family-friendly carnival in Abha featuring cultural shows, games, local markets, food trucks, and scenic seating areas.",
        descriptionAr:
          "كرنفال ترفيهي عائلي في أبها يشمل فعاليات ثقافية، ألعاب، أسواق شعبية، عربات طعام، وجلسات جبلية.",
        latitude: "18.2165",
        longitude: "42.5053",
        address: "Sama Abha Park & Art Street, Abha, Asir Region, Saudi Arabia",
        addressAr:
          "حديقة سما أبها وشارع الفن، أبها، منطقة عسير، المملكة العربية السعودية",
        phone: "+966920000089",
        rating: "4.4",
        imageUrl: "https://i.ibb.co/1GFPWQ6v/SAVE-20250723-201047.jpg",
        isActive: true,
        pros: [
          "Variety of Attractions: Reviewers praise the diverse range of activities, including traditional amusement rides (Ferris wheel, roller coasters, bumper cars), playgrounds, and a boating lake.",
          "Green Spaces & Nature: The park is noted for its beautiful green areas, flower gardens, and walking paths, offering a pleasant environment for relaxation and picnics.",
          "Family-Friendly: Many reviews highlight it as an excellent destination for families with children, offering entertainment options for various age groups.",
          "Affordable Entertainment: Compared to other entertainment options, some visitors find it to be a reasonably priced place for a day out.",
          "Good for Relaxation & Picnics: Beyond the rides, it's also appreciated as a peaceful place for strolls, enjoying the scenery, and having picnics with family and friends.",
          "Accessible Amenities: The park provides amenities like prayer places, kiosks, footpaths, and in some mentions, facilities for those with special needs (e.g., wheelchairs, baby pushchairs).",
        ], // Add your pros here
        cons: [
          "Maintenance/Cleanliness Issues: Some reviews mention that the park's facilities, including rides and restrooms, could benefit from better maintenance and cleanliness.",
          "Crowding: Especially during peak times (evenings, weekends, holidays), the park can become very crowded, leading to long queues for rides and difficulty finding seating.",
          "Ride Availability/Safety Concerns: A few reviews express concerns about certain rides being out of order or perceived safety issues, though this is not a widespread complaint.",
          "Limited Food Options/Quality: While there are kiosks and restaurants, some reviewers are not entirely satisfied with the variety or quality of the food and beverage options, with some suggesting bringing your own.",
          "Discrepancies in Operating Hours: There can be some confusion or variability in actual operating hours for rides or specific sections of the park, differing from stated 24/7 park access. (Note: While the park itself might be open 24/7, rides and specific facilities have limited operational hours).",
        ], // Add your cons here
      },
    ];

    mockVenues.forEach((venue) => {
      const id = this.currentVenueId++;
      this.venues.set(id, { ...venue, id, createdAt: new Date() });
    });

    // Add mock queues based on rating thresholds
    this.venues.forEach((venue, venueId) => {
      const queueId = this.currentQueueId++;
      const rating = parseFloat(venue.rating ?? "0");

      let currentCount: number;
      let averageWaitTime: number;

      if (rating >= 4.8) {
        currentCount = 32;
        averageWaitTime = Math.floor(currentCount * 1.5);
      } else if (rating >= 4.5) {
        currentCount = 13;
        averageWaitTime = Math.floor(currentCount * 1.5);
      } else {
        currentCount = 7;
        averageWaitTime = Math.floor(currentCount * 1.5);
      }

      this.queues.set(queueId, {
        id: queueId,
        venueId: venueId,
        name: "Main Entry",
        nameAr: "الدخول الرئيسي",
        maxCapacity: 100,
        currentCount,
        averageWaitTime,
        isActive: true,
        createdAt: new Date(),
      });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = {
      ...insertUser,
      id,
      phone: insertUser.phone || null,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async getAllVenues(): Promise<Venue[]> {
    return Array.from(this.venues.values()).filter((venue) => venue.isActive);
  }

  async getVenue(id: number): Promise<Venue | undefined> {
    return this.venues.get(id);
  }

  async getVenuesByCategory(category: string): Promise<Venue[]> {
    return Array.from(this.venues.values()).filter(
      (venue) =>
        venue.isActive &&
        (venue.category === category || venue.categoryAr === category),
    );
  }

  async getVenuesNearby(
    lat: number,
    lng: number,
    radius: number,
  ): Promise<Venue[]> {
    // Simple distance calculation for mock data
    return Array.from(this.venues.values()).filter((venue) => venue.isActive);
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
      createdAt: new Date(),
    };
    this.venues.set(id, venue);
    return venue;
  }

  async getQueuesByVenue(venueId: number): Promise<Queue[]> {
    return Array.from(this.queues.values()).filter(
      (queue) => queue.venueId === venueId && queue.isActive,
    );
  }

  async getQueue(id: number): Promise<Queue | undefined> {
    return this.queues.get(id);
  }

  async updateQueueCount(
    id: number,
    count: number,
  ): Promise<Queue | undefined> {
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
      createdAt: new Date(),
    };
    this.queues.set(id, queue);
    return queue;
  }

  async getReservationsByUser(
    userId: number,
  ): Promise<(Reservation & { venue: Venue; queue: Queue })[]> {
    const userReservations = Array.from(this.reservations.values()).filter(
      (reservation) => reservation.userId === userId,
    );

    return userReservations.map((reservation) => {
      // Update position based on elapsed time for waiting reservations
      if (reservation.status === "waiting") {
        this.updatePositionBasedOnTime(reservation);
      }

      const queue = this.queues.get(reservation.queueId)!;
      const venue = this.venues.get(queue.venueId)!;
      return { ...reservation, venue, queue };
    });
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    return this.reservations.get(id);
  }

  async createReservation(
    insertReservation: InsertReservation & {
      userId: number;
      position?: number;
      groupSize?: number;
    },
  ): Promise<Reservation> {
    const id = this.currentReservationId++;
    const queue = await this.getQueue(insertReservation.queueId);
    const groupSize = insertReservation.groupSize || 1;

    // Position calculation for groups:
    // If there are 7 people in queue and user brings 3 people, their positions are 8, 9, 10
    // So position should be current count + 1 (start of the group)
    const position = (queue?.currentCount || 0) + 1;

    // Each person takes 1.5 minutes, so estimated wait time = position * 1.5
    const estimatedWaitTime = Math.floor(position * 1.5);
    const qrCode = `QR-${id}-${Date.now()}`;

    const reservation: Reservation = {
      ...insertReservation,
      id,
      position,
      groupSize,
      estimatedWaitTime,
      status: insertReservation.status || "waiting",
      qrCode,
      notificationSent: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.reservations.set(id, reservation);

    // Update queue count to reflect new group joining (add groupSize to current count)
    if (queue && queue.currentCount !== null) {
      await this.updateQueueCount(queue.id, queue.currentCount + groupSize);
    }

    return reservation;
  }

  async updateReservationStatus(
    id: number,
    status: string,
  ): Promise<Reservation | undefined> {
    const reservation = this.reservations.get(id);
    if (reservation) {
      reservation.status = status;
      reservation.updatedAt = new Date();
      this.reservations.set(id, reservation);
    }
    return reservation;
  }

  async getActiveReservationByUser(
    userId: number,
  ): Promise<(Reservation & { venue: Venue; queue: Queue }) | undefined> {
    const activeReservation = Array.from(this.reservations.values()).find(
      (reservation) =>
        reservation.userId === userId && reservation.status === "waiting",
    );

    if (activeReservation) {
      // Update position based on elapsed time for dynamic progress
      this.updatePositionBasedOnTime(activeReservation);

      const queue = this.queues.get(activeReservation.queueId)!;
      const venue = this.venues.get(queue.venueId)!;
      return { ...activeReservation, venue, queue };
    }

    return undefined;
  }

  async getReviewsByVenue(venueId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(
      (review) => review.venueId === venueId,
    );
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = {
      ...insertReview,
      id,
      comment: insertReview.comment || null,
      commentAr: insertReview.commentAr || null,
      createdAt: new Date(),
    };
    this.reviews.set(id, review);
    return review;
  }

  // Private method to update position based on elapsed time
  private updatePositionBasedOnTime(reservation: Reservation): void {
    if (!reservation.estimatedWaitTime || reservation.status !== "waiting") {
      return;
    }

    const now = new Date();
    const createdAt =
      reservation.createdAt instanceof Date
        ? reservation.createdAt
        : new Date(reservation.createdAt || Date.now());
    const elapsedMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);

    // Calculate initial position based on estimated wait time (reverse calculation)
    const initialPosition = Math.ceil(reservation.estimatedWaitTime / 1.5);

    // Each person takes 1.5 minutes, so calculate how many people should have been served
    const peopleServed = Math.floor(elapsedMinutes / 1.5);

    // New position = initial position - people served, minimum 1 (your turn)
    const newPosition = Math.max(1, initialPosition - peopleServed);

    // Update the reservation position
    reservation.position = newPosition;

    // Update in storage
    this.reservations.set(reservation.id, reservation);
  }
}

export const storage = new MemStorage();
