"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

import { Button } from "components/Button";
import { Multiselect } from "components/Multiselect";
import { PageTitle, PageContent } from "components/PageStructure";
import { formDataToObject } from "global/formData";
import { allergyList, unitTypeList } from "global/meals";
import { postJson } from "global/postJson";
import { FormSubmitHandler } from "global/types";

import styles from "./NewIngredientPage.module.css";

export default function NewIngredientPage() {
  const router = useRouter();

  const onSubmit: FormSubmitHandler = useCallback(
    async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const ingredient = formDataToObject(formData, ["allergens"]);

      // submit the data
      const response = await postJson("/api/ingredients/create", ingredient);
      if (!response.ok) {
        console.error(response);
        alert("Request unsuccessful. Please try again.");
        return;
      }
      router.push("/ingredients");
    },
    [router]
  );

  return (
    <main>
      <PageTitle>
        <h1>New ingredient</h1>
      </PageTitle>
      <PageContent>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.table}>
            <label>
              Ingredient name
              <input type="text" name="name" required />
            </label>
            <label>
              Unit type
              <select name="unitType">
                {unitTypeList.map((ut) => (
                  <option key={ut.id} value={ut.id}>
                    {ut.label}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.full}>
              Allergens
              <Multiselect name="allergens" options={allergyList} />
            </label>
          </div>
          <Button type="submit">Create</Button>
        </form>
      </PageContent>
    </main>
  );
}
