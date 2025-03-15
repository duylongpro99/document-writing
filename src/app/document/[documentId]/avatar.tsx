import Image from "next/image";
import React from "react";

const SIZE = 36;

type Props = {
  src: string;
  name: string;
};

export const Avatar: React.FC<Props> = ({ src, name }) => {
  return (
    <>
      <div
        style={{ width: SIZE, height: SIZE }}
        className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400"
      >
        <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity">
          {name}
        </div>
        <img src={src} alt={name} className="size-full rounded-full" />
      </div>
    </>
  );
};
