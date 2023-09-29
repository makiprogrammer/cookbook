import { Recipe } from "@prisma/client";
import Link from "next/link";

import { Icon } from "components/Icon";
import { formatTimeSpan } from "global/format";
import { mealIconType, mealTypeNames } from "global/meals";

import styles from "./RecipeCard.module.css";

export interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipe/${recipe.id}`} className={styles.root}>
      <button>
        <h3>{recipe.name}</h3>
        <ul className={styles.properties}>
          <li>
            <Icon type={mealIconType[recipe.mealType]} />
            {mealTypeNames[recipe.mealType]}
          </li>
          <li>
            <Icon type="clock" />
            {formatTimeSpan({ minutes: recipe.totalTime })} cook time
          </li>
        </ul>
      </button>
    </Link>
  );
}
