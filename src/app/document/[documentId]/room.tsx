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
import { getUsers } from "./action";

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
    []
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint={"/api/auth/liveblocks"}
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
      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={params.documentId}>
        <ClientSideSuspense
          fallback={<FullscreenLoader label="Document loading..." />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
