"use client";

import { Button } from "components/Button";
import { Multiselect } from "components/Multiselect";
import { formDataToObject } from "global/formData";
import { allergyList, calorieIntakeList, equipmentList } from "global/meals";
import {
  ProfileSettings,
  defaultProfileSettings,
  profileSettingsKey,
} from "global/profile";
import { FormSubmitHandler } from "global/types";
import useLocalStorage from "global/useLocalStorage";

import styles from "./ProfilePage.module.css";

export default function ProfileEditor() {
  const [profileSettings, setProfileSettings] =
    useLocalStorage<ProfileSettings>(
      profileSettingsKey,
      defaultProfileSettings
    );

  const { allergies, equipment, calorieIntake } = profileSettings ?? {};

  const onSubmit: FormSubmitHandler = (e) => {
    e.preventDefault(); // disable form action
    const formData = new FormData(e.currentTarget);
    const newSettings = formDataToObject(formData, [
      "equipment",
      "allergies",
    ]) as unknown as ProfileSettings;
    setProfileSettings(newSettings);
    alert("Settings saved!");
  };

  if (!profileSettings) return null;

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.table}>
        <label>
          Preferred calorie intake
          <select name="calorieIntake" defaultValue={calorieIntake}>
            {calorieIntakeList.map((ci) => (
              <option key={ci.id} value={ci.id}>
                {ci.label}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.full}>
          Allergies
          <Multiselect
            name="allergies"
            options={allergyList.map(({ id, label }) => ({
              id,
              label,
              defaultSelected: allergies?.includes(id),
            }))}
          />
        </label>

        <label className={styles.full}>
          Kitchen equipment
          <Multiselect
            name="equipment"
            options={equipmentList.map(({ id, label }) => ({
              id,
              label,
              defaultSelected: equipment?.includes(id),
            }))}
          />
        </label>
      </div>

      <Button type="submit" theme="primary" style={{ marginLeft: "auto" }}>
        Save
      </Button>
    </form>
  );
}
