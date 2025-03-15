"use client";

import { useMutation } from "convex/react";
import React, { useState } from "react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

type Props = {
  documentId: Id<"documents">;
  title: string;
  children: React.ReactNode;
};
export const RenameDialog: React.FC<Props> = ({
  children,
  title,
  documentId,
}) => {
  const rename = useMutation(api.document.update);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  
  const [modifiedTitle, setModifiedTitle] = useState<string>(title);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    rename({
      documentId,
      title: modifiedTitle.trim() || "Untitled",
    })
      .then(() => {
        toast({
          title: "Document renamed!",
          variant: "default",
        });
        setOpen(false);
      })
      .catch(() => {
        toast({
          title: "Cannot rename!",
          description: "Something went wrong or you don't have permission",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename</DialogTitle>
            <DialogDescription>Enter new name</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={modifiedTitle}
              onChange={(e) => setModifiedTitle(e.target.value)}
              placeholder="Document title"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant={"ghost"}
              disabled={isUpdating}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              onClick={(e) => e.stopPropagation()}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
