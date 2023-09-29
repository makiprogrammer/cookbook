"use client";

import { Recipe } from "@prisma/client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  RecipeSearchRequest,
  RecipeSearchResponse,
} from "app/api/recipes/search/route";
import { Button } from "components/Button";
import { PageTitle } from "components/PageStructure";
import { RecipeCard } from "components/RecipeCard";
import { formDataToObject } from "global/formData";
import { postJson } from "global/postJson";
import { defaultProfileSettings, profileSettingsKey } from "global/profile";
import { useDebounceCallback } from "global/useDebounceCallback";
import useLocalStorage from "global/useLocalStorage";

import { ExploreForm } from "./ExploreForm";
import styles from "./ExplorePage.module.css";

export default function ExplorePage() {
  // const recipes = await prisma.recipe.findMany();
  const formRef = useRef<HTMLFormElement>(null);
  const [profileSettings] = useLocalStorage(
    profileSettingsKey,
    defaultProfileSettings
  );

  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>();
  const noRecipesFound = filteredRecipes && filteredRecipes.length === 0;

  const fetchSearchResults = useCallback(async () => {
    // collect data from form
    if (!formRef.current || !profileSettings) return;
    const formData = new FormData(formRef.current);
    const data = formDataToObject(formData);

    // fetch results
    const body: RecipeSearchRequest = {
      form: data as RecipeSearchRequest["form"],
      profileSettings, // attach profile for personalized results
    };
    const response = await postJson("/api/recipes/search", body);
    if (!response.ok) return;
    const json: RecipeSearchResponse = await response.json();
    setFilteredRecipes(json.recipes);
  }, [profileSettings]);

  const onFormChange = useDebounceCallback(fetchSearchResults);

  // fetch results once profile settings are loaded
  useEffect(() => {
    fetchSearchResults();
  }, [fetchSearchResults, profileSettings]);

  return (
    <main className={styles.root}>
      <PageTitle className={styles.header}>
        <div className={styles.title}>
          <h1>Explore meals and recipes</h1>
          <Link href="/recipe/edit/new">
            <Button icon="plus" theme="primary">
              Add recipe
            </Button>
          </Link>
        </div>

        <ExploreForm
          onChange={onFormChange}
          onSubmit={(e) => {
            e.preventDefault();
            fetchSearchResults();
          }}
          formRef={formRef}
        />
      </PageTitle>

      <div className={styles.content}>
        {noRecipesFound && (
          <i>No recipes found. Try changing your search criteria.</i>
        )}

        <ul className={styles.list}>
          {filteredRecipes?.map((recipe) => (
            <li key={recipe.id}>
              <RecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
