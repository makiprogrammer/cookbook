# Developer documentation

The project uses Next.js version 13 with utilization of the modern
[App router](https://nextjs.org/docs/app). In the `/app` directory,
the client routes are stored in the filesystem itself in tree-like
structure. Folders specify routes and files (leaves) named `route.ts`
or `page.tsx` specify the actual route behavior.
For more information, please refer to the
[Next Project Structure documentation](https://nextjs.org/docs/getting-started/project-structure).

## Project Architecture

As noted above, the server-client architecture is covered by Next.js
written in TypeScript. The Next.js server utilizes [Prisma](https://www.prisma.io/)
for type-safe operations with the [Postgres](https://www.postgresql.org/)
database. The Postgres database is not part of this project, you need to
set it up manually.

The Prisma database schema is located in file `prisma/schema.prisma`.
Prisma uses the `DATABASE_URL` environment variable (authentication included),
so make sure it's properly configured (see start-up guide in [README](/README.md)).
Prisma is responsible for syncing the schema with the actual database
and for executing all queries. The type-safety provides an additional benefit.
The Prisma client is accessible only from the client-side, so the app uses
either React server components or REST API to communicate with client-side.
Usually, when no input is required from the end user, the data is passed
already pre-rendered from the server. Otherwise, the api in `app/api` directories
are used.

## Directories

- `app` directory contains all route logic and React components and pages
- `app/api` directory contains the server logic and exposes the REST APIs
  for the client-server communication outside of React server components
- `components` directory contains universal reusable React components
  like buttons, icons, page layouts, multiselect, etc.
- `global` directory contains utility functions, constants and custom React
  hooks; some are used by both client and server side. Special file
  `global/meals.ts` contains constants related to core logic like enums
  and lists, mapping enum keys to text labels. Currently, only static English
  labels are supported.
- `prisma` directory contains the Prisma database schema and seeding utility

## Scripts

Because this project uses `npm` as package manager, all relevant scripts
are configured in the `package.json` file.

- `npm run sync-db`: synchronizes the prisma schema located in `prisma/schema.prisma`
  with the actual database (generates tables and relations). This process may
  require interactivity when conflicts or unsafe operations are detected.
- `npm run seeds`: seeds the database with demo data, so developers
  don't have to create entries manually
- `npm run dev`: compiles parts of the application for testing and
  [fast-refresh](https://nextjs.org/docs/architecture/fast-refresh)
  functionality
- `npm run build` with `npm run start`: compiles and starts the application
  in production configuration
