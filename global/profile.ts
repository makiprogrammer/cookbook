import { KitchenEquipment, Allergen, CalorieIntake } from "@prisma/client";

import { equipmentListIds } from "./meals";

export interface ProfileSettings {
  equipment: KitchenEquipment[];
  allergies: Allergen[];
  calorieIntake: CalorieIntake;
}

export const profileSettingsKey = "profileSettings";
export const defaultProfileSettings: ProfileSettings = {
  allergies: [],
  calorieIntake: CalorieIntake.MEDIUM,
  equipment: [...equipmentListIds],
};
