"use client";

import { Recipe, Unit } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FormEventHandler, useCallback, useRef } from "react";

import { Button } from "components/Button";
import { Multiselect } from "components/Multiselect";
import { formDataToObject } from "global/formData";
import { equipmentList, mealTypeList } from "global/meals";
import { postJson } from "global/postJson";
import { FormSubmitHandler } from "global/types";

import { DirectionsEditor } from "./DirectionsEditor";
import { IngredientsEditor } from "./IngredientsEditor";
import styles from "./RecipeEditor.module.css";
import { RecipeEditResponse } from "./route";

export type RecipeIngredientBase = {
  ingredientId: number;
  amount: number;
  unit: Unit;
  _name?: string;
};

export interface RecipeEditorProps {
  recipe?: Recipe;
  recipeIngredients?: (RecipeIngredientBase & { recipeId: number })[];
}

export function RecipeEditor({ recipe, recipeIngredients }: RecipeEditorProps) {
  const router = useRouter();

  const totalTime = recipe?.totalTime ?? 0;
  const defaultHours = Math.floor(totalTime / 60);
  const defaultMinutes = totalTime % 60;

  const recipeIngredientsRef = useRef<RecipeIngredientBase[]>(
    recipeIngredients ?? []
  );

  const onSubmit: FormSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault(); // no form action
      const formData = new FormData(e.currentTarget);
      const object = formDataToObject(formData, ["equipment", "directions"]);
      const { timeHours, timeMinutes, ...recipe } = object;

      // prepare the recipe data
      recipe.totalTime = Number(timeHours) * 60 + Number(timeMinutes);
      recipe.ingredients = recipeIngredientsRef.current.map((ri) => {
        const { _name, ...rest } = ri;
        return rest;
      });

      // submit the data
      const response = await postJson("/recipe/edit", recipe);
      if (!response.ok) {
        console.error(response);
        alert("Request unsuccessful. Please try again.");
        return;
      }
      const json: RecipeEditResponse = await response.json();
      const recipeId = json.recipe?.id;
      router.push(`/recipe/${recipeId}`);
    },
    [router]
  );

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.table}>
        <input name="id" readOnly value={recipe?.id} type="hidden" />
        <label className={styles.full}>
          Name
          <input name="name" type="text" defaultValue={recipe?.name} required />
        </label>
        <label className={styles.full}>
          Description
          <textarea
            name="description"
            defaultValue={recipe?.description ?? ""}
          />
        </label>

        <label>
          Servings
          <input
            name="servings"
            type="number"
            min={1}
            defaultValue={recipe?.servings}
          />
        </label>

        <label>
          Total time
          <span className={styles.time}>
            <input
              name="timeHours"
              type="number"
              min={0}
              defaultValue={defaultHours}
            />
            h
            <input
              name="timeMinutes"
              type="number"
              max={59}
              min={0}
              step={5}
              defaultValue={defaultMinutes}
            />
            min
          </span>
        </label>

        <label>
          Meal type
          <select name="mealType" defaultValue={recipe?.mealType} required>
            {mealTypeList.map((mealType) => (
              <option key={mealType.id} value={mealType.id}>
                {mealType.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Kitchen equipment
          <Multiselect
            name="equipment"
            options={equipmentList.map(({ id, label }) => ({
              id,
              label,
              defaultSelected: recipe?.equipment.includes(id),
            }))}
          />
        </label>

        <IngredientsEditor
          className={styles.full}
          dataRef={recipeIngredientsRef}
        />

        <DirectionsEditor
          className={styles.full}
          name="directions"
          defaultDirections={recipe?.directions}
        />
      </div>

      <Button type="submit" theme="primary" style={{ marginLeft: "auto" }}>
        Save
      </Button>
    </form>
  );
}
