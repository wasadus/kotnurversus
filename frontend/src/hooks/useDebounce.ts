import { useCallback, useRef } from "react";

export const useDebounce = (debounceTime: number) => {
  const timeout = useRef<number | undefined>(undefined);

  const reset = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = undefined;
    }
  }, []);

  const set = useCallback((callback: () => void) => {
    reset();
    timeout.current = setTimeout(callback, debounceTime);
  }, []);

  return { set, reset };
};
