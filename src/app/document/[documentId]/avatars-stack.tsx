"use client";

import { Separator } from "@/components/ui/separator";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Avatar } from "./avatar";

export const AvatarsStack: React.FC = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (!users.length) return <></>;
  return (
    <>
      <div className="flex items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatar name="You" src={currentUser.info.avatar} />
          </div>
        )}

        <div className="flex">
          {users.map(({ connectionId, info }) => {
            return (
              <Avatar key={connectionId} name={info.name} src={info.avatar} />
            );
          })}
        </div>
      </div>
      <Separator orientation="vertical" className="h-6" />
    </>
  );
};
