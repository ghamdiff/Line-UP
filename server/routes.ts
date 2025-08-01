import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse } from "./gemini";
import { insertVenueSchema, insertQueueSchema, insertReservationSchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Venues endpoints
  app.get("/api/venues", async (req, res) => {
    try {
      const venues = await storage.getAllVenues();
      res.json(venues);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch venues" });
    }
  });

  app.get("/api/venues/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const venue = await storage.getVenue(id);
      if (!venue) {
        return res.status(404).json({ message: "Venue not found" });
      }
      res.json(venue);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch venue" });
    }
  });

  app.get("/api/venues/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const venues = await storage.getVenuesByCategory(category);
      res.json(venues);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch venues by category" });
    }
  });

  app.get("/api/venues/nearby/:lat/:lng", async (req, res) => {
    try {
      const lat = parseFloat(req.params.lat);
      const lng = parseFloat(req.params.lng);
      const radius = parseFloat(req.query.radius as string) || 10; // default 10km
      const venues = await storage.getVenuesNearby(lat, lng, radius);
      res.json(venues);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch nearby venues" });
    }
  });

  // Queues endpoints
  app.get("/api/venues/:venueId/queues", async (req, res) => {
    try {
      const venueId = parseInt(req.params.venueId);
      const queues = await storage.getQueuesByVenue(venueId);
      res.json(queues);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch queues" });
    }
  });

  app.get("/api/queues/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const queue = await storage.getQueue(id);
      if (!queue) {
        return res.status(404).json({ message: "Queue not found" });
      }
      res.json(queue);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch queue" });
    }
  });

  // Reservations endpoints
  app.post("/api/reservations", async (req, res) => {
    try {
      // Create a custom schema for the request that only requires queueId and estimatedWaitTime
      const requestSchema = z.object({
        queueId: z.number(),
        estimatedWaitTime: z.number().optional(),
        status: z.string().optional()
      });
      
      const data = requestSchema.parse(req.body);
      // For demo purposes, we'll use userId = 1
      const reservation = await storage.createReservation({ 
        ...data, 
        userId: 1,
        position: 0, // Will be calculated in storage layer
      });
      res.json(reservation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create reservation" });
    }
  });

  app.get("/api/reservations/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const reservations = await storage.getReservationsByUser(userId);
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reservations" });
    }
  });

  app.get("/api/reservations/active/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const activeReservation = await storage.getActiveReservationByUser(userId);
      res.json(activeReservation || null);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch active reservation" });
    }
  });

  app.patch("/api/reservations/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const reservation = await storage.updateReservationStatus(id, status);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ message: "Failed to update reservation" });
    }
  });

  // Reviews endpoints
  app.get("/api/venues/:venueId/reviews", async (req, res) => {
    try {
      const venueId = parseInt(req.params.venueId);
      const reviews = await storage.getReviewsByVenue(venueId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const data = insertReviewSchema.parse(req.body);
      // For demo purposes, we'll use userId = 1
      const review = await storage.createReview({ ...data, userId: 1 });
      res.json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  // Chat endpoints
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, language } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ message: "Message is required" });
      }

      const response = await generateChatResponse(message, language || 'en');
      res.json({ response });
    } catch (error) {
      console.error("Chat API error:", error);
      res.status(500).json({ message: "Failed to generate response" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
