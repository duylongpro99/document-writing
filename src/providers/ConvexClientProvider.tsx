"use client";

import { FullscreenLoader } from "@/components/fullscreen-loader";
import { ClerkProvider, SignIn, useAuth } from "@clerk/nextjs";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ReactNode } from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated>
        <Unauthenticated>
          <div className="flex flex-col items-center justify-center  min-h-screen">
            <SignIn routing="hash" />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullscreenLoader label="Checking Auth..." />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
