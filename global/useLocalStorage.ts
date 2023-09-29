"use client";

import { useCallback, useEffect, useState } from "react";

function savedValue(key: string, isObject: boolean) {
  let savedValue = localStorage.getItem(key);
  if (savedValue && isObject) {
    try {
      return JSON.parse(savedValue);
    } catch (e) {
      console.error(e);
    }
  }
  return savedValue;
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T | undefined, (newValue: T) => void] {
  const isObject = typeof initialValue === "object";
  const [value, setValue] = useState<T>();
  // undefined on first render to avoid server side rendering problems

  const setLocalStorageValue = useCallback(
    (newValue: T) => {
      const toBeSaved = isObject ? JSON.stringify(newValue) : newValue;
      localStorage.setItem(key, toBeSaved as string);
    },
    [isObject, key]
  );
  const setValueComplete = useCallback(
    (newValue: T) => {
      setLocalStorageValue(newValue);
      setValue(newValue);
    },
    [setLocalStorageValue, setValue]
  );

  // load saved from local storage or save initial object on first render
  useEffect(() => {
    const saved = savedValue(key, isObject);
    if (saved === null) setValueComplete(initialValue);
    else setValue(saved);
  }, [initialValue, isObject, key, setLocalStorageValue, setValueComplete]);

  return [value, setValueComplete];
}
