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

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    return await ctx.db.insert("documents", {
      title: args.title ?? "Untitled",
      ownerId: user.subject,
      organizationId,
      initialContent: args.initialContent,
    });
  },
});

export const list = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, { search, paginationOpts }) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const orgId = (user.organization_id ?? undefined) as string | undefined;

    if (search) {
      if (orgId) {
        return await ctx.db
          .query("documents")
          .withSearchIndex("search_title", (q) =>
            q.search("title", search).eq("organizationId", orgId)
          )
          .paginate(paginationOpts);
      }

      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", search).eq("ownerId", user.subject)
        )
        .paginate(paginationOpts);
    }

    if (orgId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) => q.eq("organizationId", orgId))
        .paginate(paginationOpts);
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject))
      .paginate(paginationOpts);
  },
});

export const remove = mutation({
  args: { documentId: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const doc = await ctx.db.get(args.documentId);
    if (!doc) throw new ConvexError("Document not found");

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    if (doc.ownerId !== user.subject && doc.organizationId !== organizationId)
      throw new ConvexError("Unauthorized");

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

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    if (doc.ownerId !== user.subject && doc.organizationId !== organizationId)
      throw new ConvexError("Unauthorized");

    return await ctx.db.patch(args.documentId, { title: args.title });
  },
});
