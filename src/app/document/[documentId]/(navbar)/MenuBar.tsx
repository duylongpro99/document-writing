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

type Props = {};
export const MenuBar: React.FC<Props> = ({}) => {
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
                <MenubarItem>
                  <FileJsonIcon className="size-4 mr-2" />
                  JSON
                </MenubarItem>

                <MenubarItem>
                  <GlobeIcon className="size-4 mr-2" />
                  HTML
                </MenubarItem>

                <MenubarItem>
                  <FileTextIcon className="size-4 mr-2" />
                  PDF
                </MenubarItem>

                <MenubarItem>
                  <FileIcon className="size-4 mr-2" />
                  Text
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>

            <MenubarItem>
              <FilePlusIcon className="size-4 mr-2" />
              New Document
            </MenubarItem>

            <MenubarSeparator />

            <MenubarItem>
              <FilePenIcon className="size-4 mr-2" />
              Rename
            </MenubarItem>

            <MenubarItem>
              <TrashIcon className="size-4 mr-2" />
              Remove
            </MenubarItem>

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
            <MenubarItem>
              <Undo2Icon className="size-4 mr-2" />
              Undo <MenubarShortcut>⌘Z</MenubarShortcut>
            </MenubarItem>

            <MenubarItem>
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
                  <MenubarItem>
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
                <MenubarItem>
                  <BoldIcon className="size-4 mr-2" />
                  Bold <MenubarShortcut>⌘B</MenubarShortcut>
                </MenubarItem>

                <MenubarItem>
                  <ItalicIcon className="size-4 mr-2" />
                  Italic <MenubarShortcut>⌘I</MenubarShortcut>
                </MenubarItem>

                <MenubarItem>
                  <UnderlineIcon className="size-4 mr-2" />
                  Underline <MenubarShortcut>⌘U</MenubarShortcut>
                </MenubarItem>

                <MenubarItem>
                  <StrikethroughIcon className="size-4 mr-2" />
                  Strikethrough &nbsp; &nbsp; <MenubarShortcut>⌘S</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem>
                <RemoveFormattingIcon className="size-4 mr-2" />
                Remove Formatting
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};
