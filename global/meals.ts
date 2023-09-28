import {
  KitchenEquipment,
  MealType,
  RecipeIngredient,
  Unit,
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

export const allUnitsMap: Record<Unit, string> = {
  GRAM: "g",
  MILLILITER: "ml",
  PIECE: "piece(s)",
};

export async function useIngredients(recipe: {
  ingredients: RecipeIngredient[];
}) {
  const rawIngredients = await prisma.ingredient.findMany({
    where: { id: { in: recipe.ingredients.map((i) => i.ingredientId) } },
  });
  const rawIngredientsMap = Object.fromEntries(
    rawIngredients.map((raw) => [raw.id, raw])
  );
  return rawIngredientsMap;
}
