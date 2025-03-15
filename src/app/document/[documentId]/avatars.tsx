"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { AvatarsStack } from "./avatars-stack";

export const Avatars: React.FC = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarsStack />
    </ClientSideSuspense>
  );
};
