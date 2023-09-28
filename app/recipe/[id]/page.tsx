import Link from "next/link";

import { Button } from "components/Button";
import { Icon } from "components/Icon";
import { PageTitle, PageContent } from "components/PageStructure";
import { formatTimeSpan } from "global/format";
import {
  mealIconType,
  useMealTypes,
  useKitchenEquipment,
  unitNames,
  useIngredients,
} from "global/meals";
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

  const { rawIngredientsMap } = await useIngredients(recipe.ingredients);

  const { mealTypes } = useMealTypes();
  const { equipment } = useKitchenEquipment();

  return (
    <main className={styles.root}>
      <PageTitle className={styles.title}>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          <h1>{recipe.name}</h1>
          <Link
            href={`/recipe/edit/${recipe.id}`}
            style={{ marginLeft: "auto" }}
          >
            <Button icon="edit" theme="white">
              Edit
            </Button>
          </Link>
        </div>
        {recipe.description && <p>{recipe.description}</p>}
      </PageTitle>

      <PageContent>
        <ul className={styles.properties} aria-label="Properties">
          <li>
            <Icon type={mealIconType[recipe.mealType]} />
            {mealTypes[recipe.mealType]}
          </li>
          <li>
            <Icon type="users" />
            {recipe.servings} serving(s)
          </li>
          <li>
            <Icon type="clock" />
            {formatTimeSpan({ minutes: recipe.totalTime })} cook time
          </li>
        </ul>
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
              {recipe.ingredients.map((ing) => (
                <li key={ing.ingredientId}>
                  {rawIngredientsMap[ing.ingredientId].name} ({ing.amount}{" "}
                  {unitNames[ing.unit]})
                </li>
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
