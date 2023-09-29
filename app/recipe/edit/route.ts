import { NextRequest, NextResponse } from "next/server";

import { prisma } from "global/prisma";

import { validateRecipeEditorValues } from "./recipeValidator";

export interface RecipeEditResponse {
  recipe?: {
    id: number;
  };
  error?: unknown;
}

export async function POST(request: NextRequest) {
  const suspectedRecipe = await request.json();

  try {
    const { recipe: recipeWithId, recipeIngredients } =
      validateRecipeEditorValues(suspectedRecipe);
    const { id, ...recipe } = recipeWithId;
    const databaseRecipe = id
      ? await prisma.recipe.update({
          where: { id },
          data: recipe,
        })
      : await prisma.recipe.create({
          data: recipe,
        });
    const recipeId = databaseRecipe.id;

    // handle recipe ingredients
    await prisma.recipeIngredient.deleteMany({
      where: { recipeId },
    });
    const recipeIngredientData = recipeIngredients.map((ri) => ({
      ...ri,
      recipeId,
    }));
    await prisma.recipeIngredient.createMany({
      data: recipeIngredientData,
    });

    return NextResponse.json({
      recipe: { id: recipeId },
    } as RecipeEditResponse);
  } catch (error) {
    console.error(error);
    console.log(suspectedRecipe);
    return NextResponse.json({ error } as RecipeEditResponse, { status: 400 });
  }
}
