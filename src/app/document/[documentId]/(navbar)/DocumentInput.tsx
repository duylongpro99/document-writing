import { CloudFogIcon } from "lucide-react";

export const DocumentInput: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        Untitled Document
      </span>
      <CloudFogIcon />
    </div>
  );
};
