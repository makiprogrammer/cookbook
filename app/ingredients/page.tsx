import Link from "next/link";

import { Button } from "components/Button";
import { PageTitle, PageContent } from "components/PageStructure";
import { unitTypeNames } from "global/meals";
import { prisma } from "global/prisma";

import styles from "./IngredientsPage.module.css";

export default async function IngredientsPage() {
  const ingredients = await prisma.ingredient.findMany({ take: 50 });

  return (
    <main>
      <PageTitle className={styles.title}>
        <h1>Ingredients</h1>
        <Link href="/ingredients/new" className="right">
          <Button>Add Ingredient</Button>
        </Link>
      </PageTitle>
      <PageContent>
        <ul className={styles.list}>
          {ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              <span>{ingredient.name}</span>
              <span className="right">
                {unitTypeNames[ingredient.unitType]}
              </span>
            </li>
          ))}
        </ul>
      </PageContent>
    </main>
  );
}
