import { PageContent, PageTitle } from "components/PageStructure";
import { useIngredients } from "global/meals";
import { prisma } from "global/prisma";

import { RecipeEditor } from "../RecipeEditor";

export default async function RecipeEditPage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await prisma.recipe.findFirstOrThrow({
    where: { id: Number(params.id) },
    include: { ingredients: true },
  });
  const { rawIngredientsMap } = await useIngredients(recipe.ingredients);
  const recipeIngredients = recipe.ingredients.map((ri) => ({
    ...ri,
    _name: rawIngredientsMap[ri.ingredientId].name,
  }));

  return (
    <main>
      <PageTitle>
        <h1>Edit recipe</h1>
      </PageTitle>
      <PageContent>
        <RecipeEditor recipe={recipe} recipeIngredients={recipeIngredients} />
      </PageContent>
    </main>
  );
}
