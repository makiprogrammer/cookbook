import { PageContent, PageTitle } from "components/PageStructure";

import { RecipeEditor } from "../RecipeEditor";

export default function RecipeCreatePage() {
  return (
    <main>
      <PageTitle>
        <h1>Create a new recipe</h1>
      </PageTitle>
      <PageContent>
        <RecipeEditor />
      </PageContent>
    </main>
  );
}
