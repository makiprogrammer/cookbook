"use client";

import { Ingredient, Recipe, Unit } from "@prisma/client";
import classNames from "classnames";
import {
  useCallback,
  useRef,
  useState,
  useEffect,
  Fragment,
  MutableRefObject,
} from "react";

import { Button } from "components/Button";
import { unitNames, unitsOfType } from "global/meals";
import { ClassName } from "global/types";
import { useDebounceCallback } from "global/useDebounceCallback";

import { IngredientSearchResponse } from "./ingredients/route";
import styles from "./IngredientsEditor.module.css";
import { RecipeIngredientBase } from "./RecipeEditor";

export interface IngredientsEditorProps {
  className?: ClassName;
  dataRef: MutableRefObject<RecipeIngredientBase[]>;
}

function displayIngredient(ingredient: RecipeIngredientBase) {
  return `${ingredient._name} (${ingredient.amount} ${
    unitNames[ingredient.unit]
  })`;
}

export function IngredientsEditor({
  className,
  dataRef,
}: IngredientsEditorProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);

  const [selection, setSelection] = useState<RecipeIngredientBase[]>(
    dataRef.current
  );
  const [filteredIngredients, setFilteredIngredients] = useState<Ingredient[]>(
    []
  );
  const [ingredientToAdd, setIngredientToAdd] = useState<Ingredient>();
  const ingredientAlreadySelected =
    !!ingredientToAdd &&
    selection.some((ri) => ri.ingredientId === ingredientToAdd?.id);

  const closeDialog = useCallback(() => dialogRef.current?.close(), []);

  const fetchSearchResults = useCallback(async () => {
    const search = searchRef.current?.value;
    if (!search) {
      setFilteredIngredients([]);
      setIngredientToAdd(undefined);
      return;
    }
    const url = new URL("/recipe/edit/ingredients", window.location.origin);
    url.searchParams.set("search", search);
    const response = await fetch(url);
    if (!response.ok) return;
    const json: IngredientSearchResponse = await response.json();
    if (json.ingredients) setFilteredIngredients(json.ingredients ?? []);
  }, []);

  const onSearchTextChange = useDebounceCallback(fetchSearchResults, 350);

  const addIngredient = useCallback(() => {
    if (!ingredientToAdd) return;
    if (!amountRef.current || !unitRef.current) return;
    if (!amountRef.current.value) {
      amountRef.current.focus();
      return;
    }
    if (!unitRef.current.value) {
      unitRef.current.focus();
      return;
    }

    setSelection([
      ...selection,
      {
        ingredientId: ingredientToAdd.id,
        amount: Number(amountRef.current?.value),
        unit: unitRef.current.value as Unit,
        _name: ingredientToAdd.name,
      },
    ]);
    setIngredientToAdd(undefined);

    closeDialog();
  }, [ingredientToAdd, selection, closeDialog]);

  useEffect(() => {
    if (!amountRef.current) return;
    amountRef.current.value = "";
    amountRef.current.focus();
  }, [ingredientToAdd]);

  useEffect(() => {
    dataRef.current = selection;
  }, [dataRef, selection]);

  return (
    <div className={classNames(className, styles.root)}>
      <label>Ingredients</label>
      <ul className={styles.show}>
        {selection.map((recipeIngredient) => (
          <Fragment key={recipeIngredient.ingredientId}>
            <Button
              type="button"
              icon="delete"
              onClick={() =>
                setSelection((oldSelection) =>
                  oldSelection.filter(
                    (ri) => ri.ingredientId !== recipeIngredient.ingredientId
                  )
                )
              }
            />
            <span>{displayIngredient(recipeIngredient)}</span>
          </Fragment>
        ))}
      </ul>
      <Button
        type="button"
        icon="plus"
        onClick={() => {
          dialogRef.current?.showModal();
          searchRef.current?.focus();
        }}
      >
        Add an ingredient
      </Button>

      <dialog className={styles.dialog} ref={dialogRef}>
        <div className={styles.table}>
          <header className={styles.header}>
            <h2>Add an ingredient</h2>
            <Button type="button" theme="secondary" onClick={closeDialog}>
              Close
            </Button>
          </header>
          <div className={styles.search}>
            <input
              type="search"
              ref={searchRef}
              placeholder="Search ingredients..."
              onChange={onSearchTextChange}
            />
            <ul role="listbox">
              {filteredIngredients.map((ingredient) => (
                <button
                  key={ingredient.id}
                  role="option"
                  type="button"
                  aria-selected={ingredient.id === ingredientToAdd?.id}
                  className={styles.item}
                  onClick={() => setIngredientToAdd(ingredient)}
                >
                  {ingredient.name}
                </button>
              ))}
            </ul>
          </div>

          <div aria-hidden style={{ borderRight: "var(--border)" }} />

          <div
            className={styles.configure}
            style={
              ingredientToAdd && !ingredientAlreadySelected
                ? undefined
                : { display: "none" }
            }
          >
            <p className={styles.name}>{ingredientToAdd?.name}</p>
            <input type="number" min={0} ref={amountRef} />
            <select ref={unitRef}>
              {ingredientToAdd &&
                unitsOfType[ingredientToAdd.unitType].map((unit) => (
                  <option key={unit} value={unit}>
                    {unitNames[unit]}
                  </option>
                ))}
            </select>

            <Button
              type="button"
              icon="plus"
              theme="primary"
              disabled={ingredientAlreadySelected}
              onClick={addIngredient}
              style={{
                marginTop: "auto",
                alignSelf: "end",
              }}
            >
              Add
            </Button>
          </div>
          <p>
            {!ingredientToAdd && <i>Select an ingredient</i>}
            {ingredientAlreadySelected && (
              <i>This ingredient is already added</i>
            )}
          </p>
        </div>
      </dialog>
    </div>
  );
}
