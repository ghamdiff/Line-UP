import {
  pgTable,
  text,
  serial,
  integer,
  boolean,
  timestamp,
  decimal,
  jsonb,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const venues = pgTable("venues", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  category: text("category").notNull(),
  categoryAr: text("category_ar").notNull(),
  description: text("description"),
  descriptionAr: text("description_ar"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }).notNull(),
  longitude: decimal("longitude", { precision: 11, scale: 8 }).notNull(),
  address: text("address").notNull(),
  addressAr: text("address_ar").notNull(),
  phone: text("phone"),
  rating: decimal("rating", { precision: 3, scale: 2 }).default("0"),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  pros: jsonb("pros").default([] as string[]), // Define pros as a list of strings
  cons: jsonb("cons").default([] as string[]), // Define cons as a list of strings
});
export const queues = pgTable("queues", {
  id: serial("id").primaryKey(),
  venueId: integer("venue_id")
    .references(() => venues.id)
    .notNull(),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  maxCapacity: integer("max_capacity").default(100),
  currentCount: integer("current_count").default(0),
  averageWaitTime: integer("average_wait_time").default(0), // in minutes
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  queueId: integer("queue_id")
    .references(() => queues.id)
    .notNull(),
  position: integer("position").notNull(),
  groupSize: integer("group_size").default(1).notNull(),
  estimatedWaitTime: integer("estimated_wait_time"), // in minutes
  status: text("status").default("waiting"), // waiting, called, completed, cancelled
  qrCode: text("qr_code"),
  notificationSent: boolean("notification_sent").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  venueId: integer("venue_id")
    .references(() => venues.id)
    .notNull(),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  commentAr: text("comment_ar"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  phone: true,
});

export const insertVenueSchema = createInsertSchema(venues).omit({
  id: true,
  createdAt: true,
});

export const insertQueueSchema = createInsertSchema(queues).omit({
  id: true,
  createdAt: true,
});

export const insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  userId: true,
  position: true,
  qrCode: true,
  notificationSent: true,
  createdAt: true,
  updatedAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Venue = typeof venues.$inferSelect;
export type InsertVenue = z.infer<typeof insertVenueSchema>;
export type Queue = typeof queues.$inferSelect;
export type InsertQueue = z.infer<typeof insertQueueSchema>;
export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
