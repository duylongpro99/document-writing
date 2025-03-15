"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { Navbar } from "./(navbar)/navbar";
import { Toolbar } from "./(toolbar)/toolbar";
import { Editor } from "./editor";
import { Room } from "./room";
import { api } from "../../../../convex/_generated/api";

interface Props {
  preloadedDocument: Preloaded<typeof api.document.get>;
}
export const Document: React.FC<Props> = ({ preloadedDocument }) => {
  const document = usePreloadedQuery(preloadedDocument);
  return (
    <Room>
      <div className="min-h-screen bg-[#fafbfd]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#fafbfd] print:hidden">
          <Navbar document={document} />
          <Toolbar />
        </div>

        <div className="pt-[114px] print:pt-0">
          <Editor />
        </div>
      </div>
    </Room>
  );
};
