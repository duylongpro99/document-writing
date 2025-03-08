/* eslint-disable @typescript-eslint/no-explicit-any */
import { Extension } from "@tiptap/core";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    lineHeight: {
      setLineHeight: (lineHeight: string) => ReturnType;
      unsetLineHeight: () => ReturnType;
    };
  }
}

export const LineHeightExtension = Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["paragraph", "heading"],
      defaultLineHeight: "normal",
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: this.options.defaultLineHeight,
            parseHTML: (element: any) =>
              element.style.lineHeight || this.options.defaultLineHeight,
            renderHTML: (attrs: any) => {
              if (!attrs.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attrs.lineHeight}`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setLineHeight:
        (lineHeight: string) =>
        ({ tr, state, dispatch }: { tr: any; state: any; dispatch: any }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);
          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node: any, pos: any) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight,
              });
            }
          });

          if (dispatch) dispatch(tr);

          return true;
        },
      unsetLineHeight:
        () =>
        ({ tr, state, dispatch }: { tr: any; state: any; dispatch: any }) => {
          const { selection } = state;
          tr = tr.setSelection(selection);
          const { from, to } = selection;

          state.doc.nodesBetween(from, to, (node: any, pos: any) => {
            if (this.options.types.includes(node.type.name)) {
              tr = tr.setNodeMarkup(pos, undefined, {
                ...node.attrs,
                lineHeight: this.options.defaultLineHeight,
              });
            }
          });

          if (dispatch) dispatch(tr);

          return true;
        },
    };
  },
});
