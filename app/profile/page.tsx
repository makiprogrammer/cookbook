import { PageContent, PageTitle } from "components/PageStructure";

import ProfileEditor from "./ProfileEditor";

export default function ProfilePage() {
  return (
    <main>
      <PageTitle>
        <h1>Edit profile and preferences</h1>
      </PageTitle>
      <PageContent>
        <ProfileEditor />
      </PageContent>
    </main>
  );
}
