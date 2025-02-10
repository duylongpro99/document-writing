import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/useEditorStore";
import { type Level } from "@tiptap/extension-heading";
import { ChevronDownIcon } from "lucide-react";

type Props = {};
export const HeadingLevelButton: React.FC<Props> = ({}) => {
  const { editor } = useEditorStore();
  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];
  const getCurrentHeading = () => {
    return (
      headings.find((heading) =>
        editor?.isActive("heading", { level: heading.value })
      )?.label ?? "Normal text"
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ fontSize, label, value }) => {
          return (
            <button
              key={value}
              style={{ fontSize }}
              className={cn(
                "flex items-center gap-x-2 px-2 py-1 rounded-sm  hover:bg-neutral-200/80",
                (value === 0 && !editor?.isActive("heading")) ||
                  (editor?.isActive("heading", { level: value }) &&
                    "bg-neutral-200/80")
              )}
              onClick={() =>
                value === 0
                  ? editor?.chain().focus().setParagraph().run()
                  : editor
                      ?.chain()
                      .focus()
                      .toggleHeading({ level: value as Level })
                      .run()
              }
            >
              {label}
            </button>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
