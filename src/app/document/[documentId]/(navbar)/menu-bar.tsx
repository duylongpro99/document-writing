"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useEditorStore } from "@/store/useEditorStore";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";

type Props = {
  data: Doc<"documents">;
};

export const MenuBar: React.FC<Props> = ({ data }) => {
  const router = useRouter();
  const { editor } = useEditorStore();
  const mutation = useMutation(api.document.create);
  const { toast } = useToast();

  const onNewDoc = () => {
    mutation({
      title: "Untitled",
      initialContent: "",
    })
      .then((id) => {
        toast({
          title: "New document created",
          description: "New document has been created.",
        });
        router.push(`/document/${id}`);
      })
      .catch(() => {
        toast({
          title: "Document creation failed",
          description: "Your document could not be created",
          variant: "destructive",
        });
      });
  };

  const addTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({
        rows,
        cols,
      })
      .run();
  };

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });

    onDownload(blob, `${data.title}.json`);
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });

    onDownload(blob, `${data.title}.html`);
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/plain",
    });

    onDownload(blob, `${data.title}.txt`);
  };

  return (
    <div className="flex">
      <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
            File
          </MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarSub>
              <MenubarSubTrigger>
                <FileIcon className="size-4 mr-2" />
                Save
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem onClick={onSaveJSON}>
                  <FileJsonIcon className="size-4 mr-2" />
                  JSON
                </MenubarItem>

                <MenubarItem onClick={onSaveHTML}>
                  <GlobeIcon className="size-4 mr-2" />
                  HTML
                </MenubarItem>

                <MenubarItem onClick={() => window?.print()}>
                  <FileTextIcon className="size-4 mr-2" />
                  PDF
                </MenubarItem>

                <MenubarItem onClick={onSaveText}>
                  <FileIcon className="size-4 mr-2" />
                  Text
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarItem onClick={onNewDoc}>
              <FilePlusIcon className="size-4 mr-2" />
              New Document
            </MenubarItem>

            <MenubarSeparator />

            <RenameDialog documentId={data._id} title={data.title}>
              <MenubarItem
                onClick={(e) => e.stopPropagation()}
                onSelect={(e) => e.preventDefault()}
              >
                <FilePenIcon className="size-4 mr-2" />
                Rename
              </MenubarItem>
            </RenameDialog>

            <RemoveDialog documentId={data._id}>
              <MenubarItem
                onClick={(e) => e.stopPropagation()}
                onSelect={(e) => e.preventDefault()}
              >
                <TrashIcon className="size-4 mr-2" />
                Remove
              </MenubarItem>
            </RemoveDialog>

            <MenubarSeparator />
            <MenubarItem onClick={() => window?.print()}>
              <PrinterIcon className="size-4 mr-2" />
              Print <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
            Edit
          </MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
              <Undo2Icon className="size-4 mr-2" />
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>

            <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
              <Redo2Icon className="size-4 mr-2" />
              Redo <MenubarShortcut>⌘Y</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
            Insert
          </MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarSub>
              <MenubarSubTrigger>Table</MenubarSubTrigger>
              <MenubarSubContent>
                {Array.from({ length: 4 }, (_, i) => i).map((i) => (
                  <MenubarItem
                    key={i}
                    onClick={() =>
                      addTable({
                        cols: i + 1,
                        rows: i + 1,
                      })
                    }
                  >
                    {i + 1} x {i + 1}
                  </MenubarItem>
                ))}
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
            Format
          </MenubarTrigger>
          <MenubarContent className="print:hidden">
            <MenubarSub>
              <MenubarSubTrigger>
                <TextIcon className="size-4 mr-2" />
                Text
              </MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                >
                  <BoldIcon className="size-4 mr-2" />
                  Bold <MenubarShortcut>⌘B</MenubarShortcut>
                </MenubarItem>

                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                >
                  <ItalicIcon className="size-4 mr-2" />
                  Italic <MenubarShortcut>⌘I</MenubarShortcut>
                </MenubarItem>

                <MenubarItem
                  onClick={() =>
                    editor?.chain().focus().toggleUnderline().run()
                  }
                >
                  <UnderlineIcon className="size-4 mr-2" />
                  Underline <MenubarShortcut>⌘U</MenubarShortcut>
                </MenubarItem>

                <MenubarItem
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                >
                  <StrikethroughIcon className="size-4 mr-2" />
                  Strikethrough &nbsp; &nbsp;{" "}
                  <MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem
              onClick={() => editor?.chain().focus().unsetAllMarks().run()}
            >
              <RemoveFormattingIcon className="size-4 mr-2" />
              Remove Formatting
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
