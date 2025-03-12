"use client";

import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { Avatars } from "./avatars";

export const AvatarsStack: React.FC = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (!users.length) return <></>;
  return (
    <>
      <div className="items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatars name="You" src={currentUser.info.avatar} />
          </div>
        )}
      </div>
    </>
  );
};
