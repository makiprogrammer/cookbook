import { MealType, Recipe } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { InferType, array, object, string } from "yup";

import {
  allergyListIds,
  calorieIntakeListIds,
  equipmentListIds,
  mealTypeListIds,
} from "global/meals";
import { prisma } from "global/prisma";

export type MealTypeExtended = MealType | "_ALL";

const recipeSearchRequestSchema = object({
  form: object({
    search: string(),
    mealType: string()
      .required()
      .oneOf([...mealTypeListIds, "_ALL"] as MealTypeExtended[]),
  }),
  profileSettings: object({
    equipment: array()
      .required()
      .of(string().required().oneOf(equipmentListIds)),
    allergies: array().required().of(string().required().oneOf(allergyListIds)),
    calorieIntake: string().required().oneOf(calorieIntakeListIds),
  }),
});

export type RecipeSearchRequest = InferType<typeof recipeSearchRequestSchema>;
export type RecipeSearchResponse = { error?: unknown; recipes?: Recipe[] };

function validateSearchObject(object: unknown): RecipeSearchRequest {
  return recipeSearchRequestSchema.validateSync(object, {
    stripUnknown: true,
  });
}

export async function POST(request: NextRequest) {
  const suspectedSearch = await request.json();

  try {
    const { form, profileSettings } = validateSearchObject(suspectedSearch);
    const { equipment: availableEquipment, allergies } = profileSettings;

    const missingEquipment = equipmentListIds.filter(
      (eq) => !availableEquipment.includes(eq)
    );

    const recipes = await prisma.recipe.findMany({
      take: 20,
      where: {
        // filter by name
        ...(form.search
          ? { name: { contains: form.search, mode: "insensitive" } }
          : {}),

        // filter by meal type
        ...(form.mealType !== "_ALL" ? { mealType: form.mealType } : {}),

        // filter by kitchen equipment
        ...(missingEquipment?.length
          ? { NOT: { equipment: { hasSome: missingEquipment } } }
          : {}),

        // filter by allergies
        ...(allergies?.length
          ? {
              ingredients: {
                every: {
                  ingredient: {
                    NOT: { allergens: { hasSome: allergies } },
                  },
                },
              },
            }
          : {}),
      },
    });

    return NextResponse.json({ recipes } as RecipeSearchResponse);
  } catch (error) {
    console.error(error);
    console.log(suspectedSearch);
    return NextResponse.json({ error } as RecipeSearchResponse, {
      status: 400,
    });
  }
}
