import {
  Allergen,
  CalorieIntake,
  Ingredient,
  KitchenEquipment,
  MealType,
  RecipeIngredient,
  Unit,
  UnitType,
} from "@prisma/client";

import { IconType } from "components/Icon";

import { prisma } from "./prisma";

export const mealIconType: Record<MealType, IconType> = {
  DRINK: "coffee",
  BREAKFAST: "sunrise",
  APPETIZER: "flag",
  SOUP: "droplet",
  MAIN: "star",
  DESSERT: "star",
  SNACK: "feather",
  OTHER: "star",
};

export const mealTypeNames: Record<MealType, string> = {
  DRINK: "Drink",
  BREAKFAST: "Breakfast",
  APPETIZER: "Appetizer",
  SOUP: "Soup",
  MAIN: "Main course",
  DESSERT: "Dessert",
  SNACK: "Snack",
  OTHER: "Other",
};
export const mealTypeList = Object.entries(mealTypeNames).map(
  ([id, label]) => ({
    id: id as MealType,
    label,
  })
);
export const mealTypeListIds = mealTypeList.map((mt) => mt.id);

export const equipmentNames: Record<KitchenEquipment, string> = {
  OVEN: "oven",
  STOVE: "stove",
  MICROWAVE: "microwave",
  GRILL: "grill",
  FRYER: "fryer",
  BLENDER: "blender",
  PAN: "pan",
};
export const equipmentList = Object.entries(equipmentNames).map(
  ([id, label]) => ({ id: id as KitchenEquipment, label })
);
export const equipmentListIds = equipmentList.map((eq) => eq.id);

export const unitNames: Record<Unit, string> = {
  GRAM: "g",
  MILLILITER: "ml",
  PIECE: "piece(s)",
  CUP: "cup(s)",
  TABLESPOON: "tablespoon(s)",
  TEASPOON: "teaspoon(s)",
};

export const unitsOfType: Record<UnitType, Unit[]> = {
  WEIGHT: [Unit.GRAM],
  VOLUME: [Unit.MILLILITER, Unit.CUP, Unit.TABLESPOON, Unit.TEASPOON],
  COUNT: [Unit.PIECE],
  NONE: [],
};

export const unitTypeNames: Record<UnitType, string> = {
  WEIGHT: "weight",
  VOLUME: "volume",
  COUNT: "count",
  NONE: "none",
};
export const unitTypeList = Object.entries(unitTypeNames).map(
  ([id, label]) => ({ id: id as UnitType, label })
);
export const unitTypeListIds = unitTypeList.map((ut) => ut.id);

export const allergyNames: Record<Allergen, string> = {
  GLUTEN: "gluten",
  DAIRY: "dairy",
  EGGS: "eggs",
  SOY: "soy",
  FISH: "fish",
  SHELLFISH: "shellfish",
  PEANUT: "peanut",
  TREE_NUTS: "tree nuts",
  SESAME: "sesame",
};
export const allergyList = Object.entries(allergyNames).map(([id, label]) => ({
  id: id as Allergen,
  label,
}));
export const allergyListIds = allergyList.map((a) => a.id);

export const calorieIntakeNames: Record<CalorieIntake, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};
export const calorieIntakeList = Object.entries(calorieIntakeNames).map(
  ([id, label]) => ({ id: id as CalorieIntake, label })
);
export const calorieIntakeListIds = calorieIntakeList.map((ci) => ci.id);

/** An object mapping raw ingredient id with the `Ingredient` object. */
export type IngredientMapping = Record<string, Ingredient>;

export async function useIngredients(recipeIngredients: RecipeIngredient[]) {
  const rawIngredients = await prisma.ingredient.findMany({
    where: { id: { in: recipeIngredients.map((i) => i.ingredientId) } },
  });
  const rawIngredientsMap: IngredientMapping = Object.fromEntries(
    rawIngredients.map((raw) => [raw.id, raw])
  );
  return { rawIngredientsMap };
}
