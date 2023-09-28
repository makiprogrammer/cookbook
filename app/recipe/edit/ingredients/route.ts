import { Ingredient } from "@prisma/client";
import { NextRequest } from "next/server";

import { prisma } from "global/prisma";

export interface IngredientSearchResponse {
  search: string | null | undefined;
  ingredients?: Ingredient[];
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const search = params.get("search")?.trim();

  const body: IngredientSearchResponse = {
    search,
  };

  if (search)
    body.ingredients = await prisma.ingredient.findMany({
      where: {
        name: {
          contains: search,
          mode: "insensitive",
        },
      },
      take: 10,
    });

  return Response.json(body);
}
