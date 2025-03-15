"use client";

import { FullscreenLoader } from "@/components/fullscreen-loader";
import { useToast } from "@/hooks/use-toast";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { getDocuments, getUsers } from "./action";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
  const params = useParams<{ documentId: string }>();
  const { toast } = useToast();

  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useMemo(
    () => async () => {
      try {
        const users = await getUsers();
        setUsers(users);
      } catch {
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const endpoint = "/api/auth/liveblocks";
        const room = params.documentId as string;
        const res = await fetch(endpoint, {
          method: "POST",
          body: JSON.stringify({ room }),
        });

        return await res.json();
      }}
      throttle={16}
      resolveUsers={({ userIds }) =>
        userIds.map((id) => users.find((u) => u.id === id))
      }
      resolveMentionSuggestions={({ text }) => {
        let filterUsers = users;
        if (text) {
          filterUsers = users.filter((u) =>
            u.name.toLowerCase().includes(text.toLowerCase())
          );
        }
        return filterUsers.map((u) => u.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        return documents.map((doc) => {
          return {
            id: doc._id,
            name: doc.title,
          };
        });
      }}
    >
      <RoomProvider
        id={params.documentId}
        initialStorage={{
          leftMg: 56,
          rightMg: 56,
        }}
      >
        <ClientSideSuspense
          fallback={<FullscreenLoader label="Document loading..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
