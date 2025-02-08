"use client";

import { Undo2Icon } from "lucide-react";
import { ToolbarButtonProps } from "./toolbar-types";
import { ToolbarButton } from "./toolbarButton";

export const Toolbar: React.FC = () => {
  const sections: ToolbarButtonProps[] = [
    {
      label: "Undo",
      icon: Undo2Icon,
      onClick: () => console.log("Undo"),
      isActive: true,
    },
  ];
  return (
    <div className="bg-[#f1f4f9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections.map((item) => {
        return <ToolbarButton key={item.label} {...item} />;
      })}
    </div>
  );
};
