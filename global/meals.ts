import {
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

export function useMealTypes() {
  const mealTypes: Record<MealType, string> = {
    DRINK: "Drink",
    BREAKFAST: "Breakfast",
    APPETIZER: "Appetizer",
    SOUP: "Soup",
    MAIN: "Main course",
    DESSERT: "Dessert",
    SNACK: "Snack",
    OTHER: "Other",
  };
  const mealTypesList = Object.entries(mealTypes).map(([key, label]) => ({
    key,
    label,
  }));
  return { mealTypes, mealTypesList };
}

export function useKitchenEquipment() {
  const equipment: Record<KitchenEquipment, string> = {
    OVEN: "oven",
    STOVE: "stove",
    MICROWAVE: "microwave",
    GRILL: "grill",
    FRYER: "fryer",
    BLENDER: "blender",
    PAN: "pan",
  };
  const equipmentList = Object.entries(equipment).map(([id, label]) => ({
    id: id as KitchenEquipment,
    label,
  }));
  return { equipment, equipmentList };
}

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
