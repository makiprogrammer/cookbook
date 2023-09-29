import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seedIngredients() {
  await prisma.ingredient.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "egg",
      unitType: "COUNT",
      allergens: ["EGGS"],
    },
  });
  await prisma.ingredient.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "chicken breast",
      unitType: "WEIGHT",
    },
  });
  await prisma.ingredient.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      name: "potatoes",
      unitType: "WEIGHT",
    },
  });
}

async function seedRecipes() {
  await prisma.recipe.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Scrambled Eggs",
      description: "A simple recipe for scrambled eggs.",
      directions: [
        "Crack the eggs into a bowl.",
        "Whisk the eggs with a fork until single consistency.",
        "Add salt and pepper to taste.",
        "Heat a pan on medium heat. Add butter to the pan and let it melt.",
        "Pour the eggs into the pan. Stir the eggs until cooked.",
        "Remove from heat.",
      ],
      equipment: ["PAN"],
      totalTime: 5,
      mealType: "BREAKFAST",
      servings: 1,
    },
  });
  await prisma.recipe.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Beef Steak with Potatoes and Broccoli",
      description:
        "Simpler than it sounds. I hereby test a long text which should be wrapped and, of course, multiple lines. Maybe 2 or so. On mobile screens, even more.",
      directions: [
        "Preheat oven to 200 degrees Celsius.",
        "Cut potatoes into wedges.",
        "Place potatoes on a baking tray and drizzle with olive oil. Season with salt and pepper.",
        "Bake potatoes for 30 minutes.",
        "Season steak with salt and pepper.",
        "Heat a pan on high heat. Add butter to the pan and let it melt.",
        "Add steak to the pan and cook for 3 minutes on each side.",
        "Remove steak from pan and let it rest.",
        "Add broccoli to the pan and cook for 5 minutes.",
        "Remove broccoli from pan.",
        "Slice steak.",
        "Serve steak with potatoes and broccoli.",
      ],
      equipment: ["PAN", "OVEN"],
      totalTime: 50,
      mealType: "MAIN",
      servings: 3,
    },
  });

  await prisma.recipeIngredient.upsert({
    where: { recipeId_ingredientId: { recipeId: 2, ingredientId: 2 } },
    update: {},
    create: {
      recipeId: 2,
      ingredientId: 2,
      amount: 200,
      unit: "GRAM",
    },
  });
  await prisma.recipeIngredient.upsert({
    where: { recipeId_ingredientId: { recipeId: 2, ingredientId: 3 } },
    update: {},
    create: {
      recipeId: 2,
      ingredientId: 3,
      amount: 300,
      unit: "GRAM",
    },
  });
}

async function main() {
  await seedIngredients();
  await seedRecipes();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
