import { preloadQuery } from "convex/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./document";
import { api } from "../../../../convex/_generated/api";

interface Props {
  params: Promise<{ documentId: Id<"documents"> }>;
}
const Page: React.FC<Props> = async ({ params }) => {
  const { documentId } = await params;
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? "";

  if (!token) throw new Error("Unauthorized");

  const preloadedDocument = await preloadQuery(
    api.document.get,
    {
      id: documentId,
    },
    {
      token,
    }
  );

  return <Document preloadedDocument={preloadedDocument} />;
};

export default Page;
