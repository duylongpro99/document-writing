import { ArrowBigDownDash } from "lucide-react";

type Props = {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
};

export const Marker: React.FC<Props> = ({
  isDragging,
  isLeft,
  onDoubleClick,
  onMouseDown,
  position,
}) => {
  return (
    <>
      <div
        className="absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2"
        style={{ [isLeft ? "left" : "right"]: `${position}px` }}
        onDoubleClick={onDoubleClick}
        onMouseDown={onMouseDown}
      >
        <ArrowBigDownDash className="size-4 absolute left-1/2 top-0 h-full fill-blue-500 transform -translate-x-1/2" />
        <div
          className="absolute left-1/2 top-4 transform -translate-x-1/2 transition-opacity duration-500"
          style={{
            height: "100vh",
            width: "1px",
            transform: "scaleX(0.5)",
            backgroundColor: "#3b72f6",
            display: isDragging ? "block" : "none",
          }}
        ></div>
      </div>
    </>
  );
};
