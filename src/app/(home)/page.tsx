"use client";

import { useQuery } from "convex/react";
import { Navbar } from "./Navbar";
import { TemplatesGallery } from "./TemplatesGallery";
import { api } from "../../../convex/_generated/api";

const Page: React.FC = () => {
  const documents = useQuery(api.document.list);

  if (documents === undefined)
    return (
      <>
        <span>Loading...</span>
      </>
    );

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplatesGallery />

        {documents?.map((document) => {
          return <span>{document.title}</span>;
        })}
      </div>
    </div>
  );
};

export default Page;
