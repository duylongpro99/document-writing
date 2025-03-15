import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

// Ensure these environment variables are defined in your GitHub Actions workflow
// Add error handling for missing environment variables
const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL ??
    (() => {
      throw new Error(
        "NEXT_PUBLIC_CONVEX_URL environment variable is not defined"
      );
    })()
);

const liveblocks = new Liveblocks({
  secret:
    process.env.LIVE_BLOCK_SECRET_API_KEY ??
    (() => {
      throw new Error(
        "LIVE_BLOCK_SECRET_API_KEY environment variable is not defined"
      );
    })(),
});

export async function POST(req: Request) {
  const { sessionClaims } = await auth();
  if (!sessionClaims) return new Response("Unauthorized", { status: 401 });

  const user = await currentUser();
  if (!user) return new Response("Unauthorized", { status: 401 });

  const { room } = await req.json();
  const document = await convex.query(api.document.get, {
    id: room,
    ignoreAuth: true,
  });

  if (!document) return new Response("Unauthorized", { status: 401 });

  const isOwner = document.ownerId === user.id;
  const isOrgMember = !!(
    document.organizationId && document.organizationId === sessionClaims.org_id
  );

  if (!isOwner && !isOrgMember)
    return new Response("Unauthorized", { status: 401 });

  const session = liveblocks.prepareSession(user.id, {
    userInfo: {
      name:
        user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
      avatar: user.imageUrl,
    },
  });

  session.allow(room, session.FULL_ACCESS);
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}
