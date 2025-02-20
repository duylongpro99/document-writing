import { useEditorStore } from "@/store/useEditorStore";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export const FontSizeButton: React.FC = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);

    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands?.focus();
    }
  };

  const inc = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const dec = () => {
    const newSize = Math.max(parseInt(fontSize) - 1, 0);
    updateFontSize(newSize.toString());
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
        <MinusIcon onClick={dec} className="size-4" />
      </button>
      {isEditing ? (
        <>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            className="h-7 w-10 border border-neutral-400 rounded-sm text-sm bg-transparent focus:outline-none focus:ring-0"
          />
        </>
      ) : (
        <>
          <button
            onClick={() => {
              setIsEditing(true);
              setFontSize(currentFontSize);
            }}
            className="h-7 w-10 border border-neutral-400 rounded-sm bg-transparent text-sm cursor-text hover:bg-neutral-200/80"
          >
            {currentFontSize}
          </button>
        </>
      )}

      <button className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
        <PlusIcon onClick={inc} className="size-4" />
      </button>
    </div>
  );
};
