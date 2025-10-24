import { mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Workshops table for fortnightly creative workshops
export const workshops = mysqlTable("workshops", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  time: varchar("time", { length: 10 }),
  location: varchar("location", { length: 255 }),
  price: varchar("price", { length: 50 }),
  capacity: varchar("capacity", { length: 50 }),
  imageUrl: text("imageUrl"),
  qrCode: text("qrCode"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Workshop = typeof workshops.$inferSelect;
export type InsertWorkshop = typeof workshops.$inferInsert;

// Workshop tickets/registrations
export const workshopTickets = mysqlTable("workshopTickets", {
  id: varchar("id", { length: 64 }).primaryKey(),
  workshopId: varchar("workshopId", { length: 64 }).notNull(),
  userId: varchar("userId", { length: 64 }),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  quantity: varchar("quantity", { length: 10 }).notNull(),
  totalPrice: varchar("totalPrice", { length: 50 }),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type WorkshopTicket = typeof workshopTickets.$inferSelect;
export type InsertWorkshopTicket = typeof workshopTickets.$inferInsert;

// Products for the shop (artwork, 3D models, dioramas, etc.)
export const products = mysqlTable("products", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // "canvas", "3d-model", "diorama", "other"
  price: varchar("price", { length: 50 }).notNull(),
  imageUrl: text("imageUrl"),
  imageUrls: text("imageUrls"), // JSON array of image URLs
  isOneOfOne: varchar("isOneOfOne", { length: 10 }).default("true"), // "true" or "false"
  stock: varchar("stock", { length: 10 }).default("1"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

// Portfolio items to showcase previous work
export const portfolioItems = mysqlTable("portfolioItems", {
  id: varchar("id", { length: 64 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 100 }).notNull(), // "mural", "3d-model", "canvas", "diorama", "other"
  imageUrl: text("imageUrl"),
  imageUrls: text("imageUrls"), // JSON array of image URLs
  createdAt: timestamp("createdAt").defaultNow(),
});

export type PortfolioItem = typeof portfolioItems.$inferSelect;
export type InsertPortfolioItem = typeof portfolioItems.$inferInsert;

// Mural requests for custom personalized murals
export const muralRequests = mysqlTable("muralRequests", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  location: text("location"),
  wallSize: varchar("wallSize", { length: 100 }),
  wallCondition: text("wallCondition"),
  theme: text("theme"),
  inspiration: text("inspiration"),
  timeline: varchar("timeline", { length: 100 }),
  budget: varchar("budget", { length: 100 }),
  additionalNotes: text("additionalNotes"),
  status: mysqlEnum("status", ["new", "reviewed", "quoted", "in-progress", "completed"]).default("new"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type MuralRequest = typeof muralRequests.$inferSelect;
export type InsertMuralRequest = typeof muralRequests.$inferInsert;

// Newsletter subscriptions
export const newsletterSubscriptions = mysqlTable("newsletterSubscriptions", {
  id: varchar("id", { length: 64 }).primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  status: mysqlEnum("status", ["subscribed", "unsubscribed"]).default("subscribed"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;

// Cart items for shop
export const cartItems = mysqlTable("cartItems", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }),
  sessionId: varchar("sessionId", { length: 64 }),
  productId: varchar("productId", { length: 64 }).notNull(),
  quantity: varchar("quantity", { length: 10 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

// Orders
export const orders = mysqlTable("orders", {
  id: varchar("id", { length: 64 }).primaryKey(),
  userId: varchar("userId", { length: 64 }),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  totalPrice: varchar("totalPrice", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["pending", "processing", "shipped", "delivered", "cancelled"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow(),
});

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;
