import { useDebounce } from "@/hooks/use-debounce";
import { useToast } from "@/hooks/use-toast";
import { useStatus } from "@liveblocks/react";
import { useMutation } from "convex/react";
import { CloudAlertIcon, CloudIcon, CloudUploadIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

type Props = {
  id: Id<"documents">;
  title: string;
};

export const DocumentInput: React.FC<Props> = ({ id, title }) => {
  const [value, setValue] = useState<string>(title);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutate = useMutation(api.document.update);
  const status = useStatus();

  const { toast } = useToast();

  const update = (value: string) => {
    setIsPending(true);
    mutate({
      documentId: id,
      title: value,
    })
      .then(() => {
        toast({
          title: "Document updated",
          description: "Your document has been updated.",
        });
      })
      .catch(() => {
        toast({
          title: "Document update failed",
          description: "Your document could not be updated",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  const debounce = useDebounce((value: string) => {
    if (value === title) return;
    update(value);
  }, 1000);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    update(value);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debounce(e.target.value);
  };

  const isCloudLoading =
    isPending || status === "connecting" || status === "reconnecting";
  const isCloudError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <>
          <form className="relative w-fit max-w-[50ch]" onSubmit={submit}>
            <span className="invisible whitespace-pre px-1.5 text-lg">
              {value || " "}
            </span>
            <input
              ref={inputRef}
              value={value}
              onChange={onChange}
              onBlur={() => setIsEditing(false)}
              className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate  "
            />
          </form>
        </>
      ) : (
        <>
          <span
            className="text-lg px-1.5 cursor-pointer truncate"
            onClick={() => {
              setIsEditing(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
          >
            {title}
          </span>
        </>
      )}
      {!isCloudError && !isCloudLoading && <CloudIcon />}
      {isCloudLoading && <CloudUploadIcon />}
      {isCloudError && <CloudAlertIcon />}
    </div>
  );
};
