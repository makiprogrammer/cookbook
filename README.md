# Simple cook book implementation

This project contains a NextJs full-stack application for managing
recipes and their ingredients. The recipe search is customizable to satisfy
user's kitchen equipment, allergies and preferences.

## First application start

To start the application, you should have a Postgres database already
set up. Create an `.env` according to `.env.example` file and configure
the database connection. You should configure sufficient permissions
for the database user as well. Don't create any tables, the application
will handle those for you.

Install the dependencies using `npm i` and build the application with
`npm run build`. This will activate Prisma which will generate TypeScript
types and synchronize the [schema](/prisma/schema.prisma) with the database.

After successful build stage, the app can be started using `npm run start`.

To view the application during development, use `npm run dev`. In this case
you have to synchronize database manually using `npm run sync-db`.
See [other commands](/package.json) or [developer documentation](/DOCUMENTATION.md).

## Application overview for users

An user can set their allergies, kitchen equipment and other preferences
in the `My Profile` page. These settings are then attached to recipe search.

The recipe search is located at `Explore` page. This contains a filter form
for searching the recipes. The user can get to recipe detail page
or even edit every property of the recipe.

In `Ingredients` page, a subset of all ingredients are listed. You can add
a new ingredient available for all recipes and specify its unit type.
Recipe creation page is accessible through `Explore` page.