import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getWorkshops, getWorkshopById, getProducts, getProductById, getPortfolioItems, subscribeNewsletter, createMuralRequest, getDb, createProduct, updateProduct, deleteProduct } from "./db";
import { TRPCError } from "@trpc/server";
import crypto from "crypto";

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Workshops router
  workshops: router({
    list: publicProcedure.query(async () => {
      return await getWorkshops();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const workshop = await getWorkshopById(input.id);
        if (!workshop) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Workshop not found" });
        }
        return workshop;
      }),
  }),

  // Products/Shop router
  products: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await getProducts(input?.category);
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        const product = await getProductById(input.id);
        if (!product) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Product not found" });
        }
        return product;
      }),

    create: protectedProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        description: z.string().min(1, "Description is required"),
        category: z.enum(["workshop-ticket", "3d-model", "diorama", "canvas", "mural"]),
        price: z.number().positive("Price must be positive"),
        stock: z.number().int().nonnegative("Stock must be non-negative"),
        imageUrl: z.string().optional(),
        isOneOfOne: z.boolean().default(false),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can create products" });
        }
        const id = crypto.randomUUID();
        const result = await createProduct({
          id,
          ...input,
        });
        if (!result) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to create product" });
        }
        return { success: true, id };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.string(),
        name: z.string().optional(),
        description: z.string().optional(),
        category: z.enum(["workshop-ticket", "3d-model", "diorama", "canvas", "mural"]).optional(),
        price: z.number().positive().optional(),
        stock: z.number().int().nonnegative().optional(),
        imageUrl: z.string().optional(),
        isOneOfOne: z.boolean().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can update products" });
        }
        const { id, ...updateData } = input;
        const result = await updateProduct(id, updateData);
        if (!result) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to update product" });
        }
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can delete products" });
        }
        const result = await deleteProduct(input.id);
        if (!result) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to delete product" });
        }
        return { success: true };
      }),
  }),

  // Portfolio router
  portfolio: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional() }).optional())
      .query(async ({ input }) => {
        return await getPortfolioItems(input?.category);
      }),
  }),

  // Mural requests router
  muralRequests: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().optional(),
        location: z.string().optional(),
        wallSize: z.string().optional(),
        wallCondition: z.string().optional(),
        theme: z.string().optional(),
        inspiration: z.string().optional(),
        timeline: z.string().optional(),
        budget: z.string().optional(),
        additionalNotes: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const id = crypto.randomUUID();
        const requestId = await createMuralRequest({ id, ...input } as any);
        if (!requestId) {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to submit mural request" });
        }
        return { success: true, id: requestId };
      }),
  }),

  // Newsletter router
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email("Invalid email"),
        name: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const success = await subscribeNewsletter(input.email, input.name);
          if (!success) {
            throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to subscribe to newsletter" });
          }
          return { success: true };
        } catch (error: any) {
          if (error.code === "ER_DUP_ENTRY") {
            throw new TRPCError({ code: "CONFLICT", message: "Email already subscribed" });
          }
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Failed to subscribe to newsletter" });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;

