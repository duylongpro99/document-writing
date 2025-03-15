"use client";

import { useEditorStore } from "@/store/useEditorStore";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import HightLight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ResizeImage from "tiptap-extension-resize-image";

import { INITIAL_MG } from "@/constants/measure";
import { FontSizeExtension } from "@/extensions/font-size";
import { LineHeightExtension } from "@/extensions/line-height";
import { useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useStorage } from "@liveblocks/react/suspense";
import TextStyle from "@tiptap/extension-text-style";
import { Ruler } from "./(ruler)/rulers";
import { Threads } from "./threads";

type Props = {
  initialContent?: string;
};

export const Editor: React.FC<Props> = ({ initialContent }) => {
  const leftMg = useStorage((root) => root.leftMg);
  const rightMg = useStorage((root) => root.rightMg);
  const { setEditor } = useEditorStore();
  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true,
  });

  const editor = useEditor({
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      setEditor(editor);
    },
    onDestroy: () => {
      setEditor(null);
    },
    onUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onSelectionUpdate: ({ editor }) => {
      setEditor(editor);
    },
    onTransaction: ({ editor }) => {
      setEditor(editor);
    },
    onFocus: ({ editor }) => {
      setEditor(editor);
    },
    onBlur: ({ editor }) => {
      setEditor(editor);
    },
    onContentError: ({ editor }) => {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMg ?? INITIAL_MG}px; padding-right: ${rightMg ?? INITIAL_MG}px;`,
        class:
          "focus:outline-none print:border-0 bg-white  border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit.configure({
        history: false,
      }),
      FontSizeExtension,
      LineHeightExtension.configure({
        types: ["paragraph", "heading"],
        defaultLineHeight: "normal",
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Image,
      ResizeImage,
      Underline,
      FontFamily,
      TextStyle,
      Color,
      HightLight.configure({
        multicolor: true,
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      liveblocks,
    ],
    content: ``,
  });

  return (
    <div className="size-full overflow-x-auto bg-[#f9fbfd] px-4 print:px-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
      </div>
    </div>
  );
};
