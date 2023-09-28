import { Icon } from "components/Icon";
import { PageTitle, PageContent } from "components/PageStructure";
import { mealIconType, useMealTypes, useKitchenEquipment } from "global/meals";
import { prisma } from "global/prisma";

import styles from "./RecipePage.module.css";

export default async function RecipePage({
  params,
}: {
  params: { id: string };
}) {
  const recipe = await prisma.recipe.findFirstOrThrow({
    where: { id: Number(params.id) },
    include: { ingredients: true },
  });
  const ingredients = await prisma.ingredient.findMany({
    where: { id: { in: recipe.ingredients.map((i) => i.ingredientId) } },
  });
  const { mealTypes } = useMealTypes();
  const { equipment } = useKitchenEquipment();

  return (
    <main className={styles.root}>
      <PageTitle className={styles.title}>
        <h1>{recipe.name}</h1>
        {recipe.description && <p>{recipe.description}</p>}
      </PageTitle>

      <PageContent>
        <section className={styles.properties}>
          <span>
            <Icon type={mealIconType[recipe.mealType]} />
            {mealTypes[recipe.mealType]}
          </span>
          <span>
            <Icon type="users" />
            {recipe.servings} serving(s)
          </span>
          <span>
            <Icon type="clock" />
            {recipe.totalTime} min cook time
          </span>
        </section>
        <section>
          <p className={styles.equipment}>
            <span style={{ fontWeight: "bold" }}>Equipment needed: </span>
            {recipe.equipment.map((eq) => equipment[eq]).join(", ")}
          </p>
        </section>

        <div className={styles.table}>
          <section className={styles.section}>
            <h2>Ingredients</h2>
            <ul style={{ listStyle: "initial" }} className={styles.list}>
              {ingredients.map((ingredient) => (
                <li key={ingredient.id}>{ingredient.name}</li>
              ))}
            </ul>
          </section>
          <section className={styles.section}>
            <h2>Directions</h2>
            <ol style={{ listStyle: "decimal" }} className={styles.list}>
              {recipe.directions.map((direction, index) => (
                <li key={index}>{direction}</li>
              ))}
            </ol>
          </section>
        </div>
      </PageContent>
    </main>
  );
}
