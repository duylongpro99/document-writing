import { LucideIcon } from "lucide-react";

export type ToolbarButtonProps = {
  onClick: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  label: string;
};
