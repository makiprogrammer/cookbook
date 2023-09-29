import { KitchenEquipment, MealType, Recipe, Unit } from "@prisma/client";
import { array, number, object, string } from "yup";

import { RecipeIngredientBase } from "./RecipeEditor";

let recipeEditSchema = object({
  id: number(),
  name: string().required(),
  description: string(),

  mealType: string().required().oneOf(Object.keys(MealType)),
  servings: number().required().min(1),
  totalTime: number().required().min(0),

  equipment: array().of(string().oneOf(Object.keys(KitchenEquipment))),
  ingredients: array()
    .required()
    .of(
      object({
        ingredientId: number().required(),
        amount: number().required().min(0),
        unit: string().required().oneOf(Object.keys(Unit)),
      } as Record<keyof RecipeIngredientBase, any>)
    ),
  directions: array().required().of(string().required()),
});

export function validateRecipeEditorValues(object: any) {
  object.id = Number(object.id) ?? undefined;
  const casted = recipeEditSchema.validateSync(object, { stripUnknown: true });
  const { mealType, equipment, ingredients, ...rest } = casted;

  const recipe = {
    ...rest,
    mealType: mealType as MealType,
    equipment: equipment as KitchenEquipment[],
  };
  const recipeIngredients = ingredients.map((ing) => ({
    ingredientId: Number(ing.ingredientId),
    amount: Number(ing.amount),
    unit: ing.unit as Unit,
  }));

  return { recipe, recipeIngredients };
}
