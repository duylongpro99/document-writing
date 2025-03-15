"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { ClientSideSuspense } from "@liveblocks/react";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { BellIcon } from "lucide-react";

export const Inbox: React.FC = () => {
  return (
    <ClientSideSuspense
      fallback={
        <>
          <Button variant="ghost" className="relative" size="icon" disabled>
            <BellIcon className="size-5" />
          </Button>
          <Separator orientation="vertical" className="h-6" />
        </>
      }
    >
      <InboxMenu />
    </ClientSideSuspense>
  );
};

export const InboxMenu: React.FC = () => {
  const { inboxNotifications } = useInboxNotifications();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative" size="icon">
            <BellIcon className="size-5" />
            {inboxNotifications.length > 0 && (
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-sky-500 text-xs text-white flex items-center justify-center">
                {inboxNotifications.length}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-auto">
          {inboxNotifications.length > 0 ? (
            <InboxNotificationList>
              {inboxNotifications.map((inboxNotification) => {
                return (
                  <InboxNotification
                    key={inboxNotification.id}
                    inboxNotification={inboxNotification}
                  />
                );
              })}
            </InboxNotificationList>
          ) : (
            <>
              <div className="p-2 w-[400px] text-center text-sm text-muted-foreground">
                No notifications
              </div>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};
