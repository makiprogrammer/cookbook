"use client";

import { MouseEvent, useCallback, useState } from "react";

import styles from "./Multiselect.module.css";

type Selection = Record<number | string, boolean>;

export interface Option {
  id: number | string;
  label: string;
  defaultSelected?: boolean;
}

export interface MultiselectProps {
  options: Option[];
  name?: string;
}

export function Multiselect({ name, options }: MultiselectProps) {
  const [selection, setSelection] = useState<Selection>(
    Object.fromEntries(
      options.filter((opt) => opt.defaultSelected).map((opt) => [opt.id, true])
    )
  );

  const selectedCount = Object.values(selection).filter(Boolean).length;

  const toggleOption = useCallback((e: MouseEvent<HTMLElement>) => {
    const optionId = e.currentTarget.getAttribute("data-id");
    if (!optionId) return;
    setSelection((oldSelection) => ({
      ...oldSelection,
      [optionId]: !oldSelection[optionId],
    }));
  }, []);

  return (
    <details className={styles.details}>
      <summary>{selectedCount} selected</summary>
      <ul className={styles.list} role="listbox" aria-orientation="horizontal">
        {options.map((option) => (
          <li
            key={option.id}
            role="option"
            aria-selected={!!selection[option.id]}
          >
            <button type="button" data-id={option.id} onClick={toggleOption}>
              {option.label}
            </button>
          </li>
        ))}
      </ul>

      {/* provide also a native select element for submitting forms */}
      {name && (
        <select name={name} style={{ display: "none" }} multiple>
          {options.map((option) => (
            <option
              key={option.id}
              selected={!!selection[option.id]}
              value={option.id}
            />
          ))}
        </select>
      )}
    </details>
  );
}
