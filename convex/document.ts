import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled",
      ownerId: user.subject,
      initialContent: args.initialContent,
    });
  },
});

export const list = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db.query("documents").paginate(args.paginationOpts);
  },
});

export const remove = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const doc = await ctx.db.get(args.documentId);
    if (!doc) throw new ConvexError("Document not found");

    if (doc.ownerId !== user.subject) throw new ConvexError("Unauthorized");

    return await ctx.db.delete(args.documentId);
  },
});

export const update = mutation({
  args: { documentId: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const doc = await ctx.db.get(args.documentId);
    if (!doc) throw new ConvexError("Document not found");

    if (doc.ownerId !== user.subject) throw new ConvexError("Unauthorized");

    return await ctx.db.patch(args.documentId, { title: args.title });
  },
});
