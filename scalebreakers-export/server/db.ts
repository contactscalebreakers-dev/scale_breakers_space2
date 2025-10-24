import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, workshops, products, portfolioItems, newsletterSubscriptions, muralRequests, InsertMuralRequest } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.id) {
    throw new Error("User ID is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      id: user.id,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role === undefined) {
      if (user.id === ENV.ownerId) {
        user.role = 'admin';
        values.role = 'admin';
        updateSet.role = 'admin';
      }
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUser(id: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Workshops queries
export async function getWorkshops() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(workshops).orderBy(desc(workshops.date));
}

export async function getWorkshopById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(workshops).where(eq(workshops.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Products queries
export async function getProducts(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return await db.select().from(products).where(eq(products.category, category));
  }
  return await db.select().from(products);
}

export async function getProductById(id: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// Portfolio queries
export async function getPortfolioItems(category?: string) {
  const db = await getDb();
  if (!db) return [];
  if (category) {
    return await db.select().from(portfolioItems).where(eq(portfolioItems.category, category));
  }
  return await db.select().from(portfolioItems);
}

// Newsletter queries
export async function subscribeNewsletter(email: string, name?: string) {
  const db = await getDb();
  if (!db) return false;
  try {
    const id = crypto.randomUUID();
    await db.insert(newsletterSubscriptions).values({
      id,
      email,
      name: name || undefined,
      status: "subscribed",
    });
    return true;
  } catch (error) {
    console.error("Failed to subscribe to newsletter:", error);
    return false;
  }
}

// Product mutations
export async function createProduct(data: any) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.insert(products).values({
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      price: data.price.toString(),
      stock: data.stock.toString(),
      imageUrl: data.imageUrl || null,
      isOneOfOne: data.isOneOfOne ? "true" : "false",
    });
    return true;
  } catch (error) {
    console.error("Failed to create product:", error);
    return null;
  }
}

export async function updateProduct(id: string, data: any) {
  const db = await getDb();
  if (!db) return null;
  try {
    const updateData: any = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.price !== undefined) updateData.price = data.price.toString();
    if (data.stock !== undefined) updateData.stock = data.stock.toString();
    if (data.imageUrl !== undefined) updateData.imageUrl = data.imageUrl;
    if (data.isOneOfOne !== undefined) updateData.isOneOfOne = data.isOneOfOne ? "true" : "false";
    
    await db.update(products).set(updateData).where(eq(products.id, id));
    return true;
  } catch (error) {
    console.error("Failed to update product:", error);
    return null;
  }
}

export async function deleteProduct(id: string) {
  const db = await getDb();
  if (!db) return null;
  try {
    await db.delete(products).where(eq(products.id, id));
    return true;
  } catch (error) {
    console.error("Failed to delete product:", error);
    return null;
  }
}

// Mural request queries
export async function createMuralRequest(data: InsertMuralRequest) {
  const db = await getDb();
  if (!db) return null;
  try {
    const id = crypto.randomUUID();
    await db.insert(muralRequests).values({
      ...data,
      id,
    });
    return id;
  } catch (error) {
    console.error("Failed to create mural request:", error);
    return null;
  }
}
