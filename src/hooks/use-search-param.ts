import { useQueryState, parseAsString } from "nuqs";

export const useSearchParam = () => {
  return useQueryState(
    "search",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
};
