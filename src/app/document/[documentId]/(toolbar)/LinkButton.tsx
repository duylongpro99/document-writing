import { useEditorStore } from "@/store/useEditorStore";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link2Icon } from "lucide-react";

export const LinkButton: React.FC = () => {
  const { editor } = useEditorStore();
  const [link, setLink] = useState(editor?.getAttributes("link").href || "");

  const onClick = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setLink("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) =>
        open && setLink(editor?.getAttributes("link").href)
      }
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <Link2Icon className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://yourlink.com"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <Button onClick={() => onClick(link)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
