import { CloudFogIcon } from "lucide-react";

type Props = {};
export const DocumentInput: React.FC<Props> = ({}) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg px-1.5 cursor-pointer truncate">
        Untitled Document
      </span>
      <CloudFogIcon />
    </div>
  );
};
