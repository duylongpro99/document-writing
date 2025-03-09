"use client";

import { useToast } from "@/hooks/use-toast";
import { useMutation } from "convex/react";
import React, { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

type Props = {
  documentId: Id<"documents">;
  children: React.ReactNode;
};
export const RemoveDialog: React.FC<Props> = ({ children, documentId }) => {
  const remove = useMutation(api.document.remove);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);
  const { toast } = useToast();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Remove permanently document?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isRemoving}
            onClick={() => {
              setIsRemoving(true);
              remove({
                documentId,
              })
                .then(() =>
                  toast({
                    title: "Document removed!",
                    variant: "default",
                  })
                )
                .catch(() => {
                  toast({
                    title: "Cannot delete!",
                    description:
                      "Something went wrong or you don't have permission",
                    variant: "destructive",
                  });
                })
                .finally(() => setIsRemoving(false));
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
