import { TableCell, TableRow } from "@/components/ui/table";
import { Building2Icon, CircleUserIcon, FileIcon } from "lucide-react";

import { format } from "date-fns";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import { DocumentMenu } from "./document-menu";

type Props = {
  document: Doc<"documents">;
};

export const DocumentRow: React.FC<Props> = ({ document }) => {
  const onNewTab = (id: Id<"documents">) => {
    window.open(`/document/${id}`, "_blank");
  };

  return (
    <TableRow className="cursor-pointer">
      <TableCell className="w-[50px]">
        <FileIcon className="size-6" />
      </TableCell>

      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationId ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organizationId ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "dd/MM/yyyy")}
      </TableCell>

      <TableCell className="flex ml-auto justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTab}
        />
      </TableCell>
    </TableRow>
  );
};
