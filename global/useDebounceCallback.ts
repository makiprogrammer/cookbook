"use client";

import { useCallback, useRef } from "react";

type TimeoutId = ReturnType<typeof setTimeout>;

export function useDebounceCallback(
  callback: () => void,
  delayMs: number = 250
) {
  const searchTimeout = useRef<TimeoutId | null>(null);

  const debouncedCallback = useCallback(() => {
    // call callback after some time after inactivity
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(callback, delayMs);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [callback, delayMs]);

  return debouncedCallback;
}
