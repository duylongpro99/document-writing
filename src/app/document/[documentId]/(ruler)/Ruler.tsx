import React, { useRef, useState } from "react";
import { Marker } from "./Marker";

type Props = {};

const makers = Array.from({ length: 83 }, (_, i) => i);

const PAGE_WIDTH = 816;
const MINIMUM_SPACE = 100;
const INITIAL_MG = 56;

export const Ruler: React.FC<Props> = ({}) => {
  const [leftMg, setLeftMg] = useState(INITIAL_MG);
  const [rightMg, setRightMg] = useState(INITIAL_MG);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((isDraggingLeft || isDraggingRight) && ref.current) {
      const container = ref.current.querySelector("#ruler-container");

      if (container) {
        const containerRef = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRef.left;

        const rawPosition = Math.max(0, Math.min(PAGE_WIDTH, relativeX));

        if (isDraggingLeft) {
          const maxLetPosition = PAGE_WIDTH - rightMg - MINIMUM_SPACE;
          const newLeftPosition = Math.min(rawPosition, maxLetPosition);
          setLeftMg(newLeftPosition);
        } else if (isDraggingRight) {
          const maxRightPosition = PAGE_WIDTH - leftMg - MINIMUM_SPACE;
          const newRightPosition = Math.max(PAGE_WIDTH - rawPosition, 0);

          const constrainedRightPosition = Math.min(
            newRightPosition,
            maxRightPosition
          );
          setRightMg(constrainedRightPosition);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMg(INITIAL_MG);
  };

  const handleRightDoubleClick = () => {
    setRightMg(INITIAL_MG);
  };

  return (
    <div
      className="w-[816px] mx-auto h-6 border-b border-gray-300 flex items-end relative select-none print:hidden"
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div
        id="ruler-container"
        className="w-full h-full relative"
      >
        <Marker
          position={leftMg}
          isLeft={true}
          isDragging={isDraggingLeft}
          onDoubleClick={handleLeftDoubleClick}
          onMouseDown={handleLeftMouseDown}
        />
        <Marker
          position={rightMg}
          isLeft={false}
          isDragging={isDraggingRight}
          onDoubleClick={handleRightDoubleClick}
          onMouseDown={handleRightMouseDown}
        />
        <div className="absolute inset-x-0 bottom-0 h-full ">
          <div className="relative h-full w-[816px]">
            {makers.map((maker) => {
              const position = (maker * PAGE_WIDTH) / 82;
              return (
                <div
                  key={maker}
                  className="absolute bottom-0"
                  style={{ left: `${position}px` }}
                >
                  {maker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-neutral-500"></div>
                      <span className="absolute bottom-2 text-[10px]  text-neutral-500 transform -translate-x-1/2">
                        {maker / 10 + 1}
                      </span>
                    </>
                  )}

                  {maker % 5 === 0 && maker % 10 !== 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-5 bg-neutral-500"></div>
                    </>
                  )}

                  {maker % 5 !== 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-1 bg-neutral-500"></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
