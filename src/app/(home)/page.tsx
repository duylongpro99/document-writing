"use client";

import { PAGE_SIZE } from "@/constants/pagination";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Navbar } from "./Navbar";
import { TemplatesGallery } from "./TemplatesGallery";
import { DocumentTable } from "./document-table";

const Page: React.FC = () => {
  const { results, loadMore, status } = usePaginatedQuery(
    api.document.list,
    {},
    { initialNumItems: PAGE_SIZE }
  );

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />

        <DocumentTable
          documents={results}
          status={status}
          loadMore={loadMore}
        />
      </div>
    </div>
  );
};

export default Page;
