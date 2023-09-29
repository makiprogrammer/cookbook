import { NextRequest, NextResponse } from "next/server";
import { InferType, array, object, string } from "yup";

import { allergyListIds, unitTypeListIds } from "global/meals";
import { prisma } from "global/prisma";

const ingredientCreateSchema = object({
  name: string().required(),
  unitType: string().required().oneOf(unitTypeListIds),
  allergens: array().ensure().of(string().required().oneOf(allergyListIds)),
});

export type IngredientCreateRequest = InferType<typeof ingredientCreateSchema>;
export type IngredientCreateResponse = {
  error?: unknown;
  ok?: boolean;
};

export async function POST(request: NextRequest) {
  const suspectedIngredient = await request.json();

  try {
    const casted = ingredientCreateSchema.validateSync(suspectedIngredient);

    await prisma.ingredient.create({
      data: casted,
    });

    return NextResponse.json({ ok: true } as IngredientCreateResponse);
  } catch (error) {
    console.error(error);
    console.log(suspectedIngredient);
    return NextResponse.json({ error } as IngredientCreateResponse, {
      status: 400,
    });
  }
}
