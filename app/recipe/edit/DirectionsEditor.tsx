"use client";

import classNames from "classnames";
import { useCallback, useState } from "react";

import { Button } from "components/Button";
import { ClassName } from "global/types";

import styles from "./DirectionsEditor.module.css";

export interface DirectionsEditorProps {
  className?: ClassName;
  defaultDirections?: string[];
  name?: string;
}

interface Item {
  key: string | number;
  defaultValue?: string;
}

function SingleDirection({
  name,
  defaultValue,
  deleteItem,
}: {
  name?: string;
  defaultValue?: string;
  deleteItem?: () => void;
}) {
  return (
    <li className={styles.item}>
      <p className={styles.hidden}>.</p>
      <div>
        <textarea name={name} defaultValue={defaultValue} />
        <Button
          type="button"
          icon="delete"
          aria-label="Delete"
          onClick={deleteItem}
        />
      </div>
    </li>
  );
}

function random() {
  return Math.random() * 99999;
}

export function DirectionsEditor({
  className,
  defaultDirections,
  name,
}: DirectionsEditorProps) {
  const [items, setItems] = useState<Item[]>(
    Array(defaultDirections?.length ?? 1)
      .fill(null)
      .map((_, i) => ({ key: random(), defaultValue: defaultDirections?.[i] }))
  );

  const addDirection = useCallback(
    () => setItems((oldItems) => [...oldItems, { key: random() }]),
    []
  );

  return (
    <div className={classNames(className, styles.root)}>
      <label>Directions</label>
      <ol className={styles.list}>
        {items.map(({ key, defaultValue }) => (
          <SingleDirection
            key={key}
            name={name}
            defaultValue={defaultValue}
            deleteItem={() =>
              setItems(items.filter((item) => item.key !== key))
            }
          />
        ))}
      </ol>
      <Button type="button" icon="plus" onClick={addDirection}>
        Add direction
      </Button>
    </div>
  );
}
