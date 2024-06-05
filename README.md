# Ego Gala Comics

A full stack web app built to broadcast @ego-gala's comics to the world!
🏢 → 📡 → 🛰️ → 🧑‍💻

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Node Version

This application currently uses Node v16.18.0, enforced by `.nvmrc`.

When it's time to upgrade to a new version, be sure to update:

1. The `.nvmrc` file.
2. The `"engine"` field in `package.json`.
3. The "Project Settings" page in Vercel.

**Note:** Node v16.18.0 has recently reached End-of-Life.

Deployments (to Vercel) created on or after February 6th, 2024 will fail to build, so we'll need to upgrade to version 18.x by then.

### Install Dependencies

Run:

```bash
npm install
```

### Environment Variables

Duplicate the `.env.example` file:

```bash
touch .env
cp .env.example .env
```

Get the values for each variable from a project admin, and fill 'em in!

#### Development vs Production

When working in your development environment, comment out the first two environment variables.

When undefined:

- `MONGODB_URI` defaults to: `'mongodb://localhost/ego_gala_comics'`
- `NEXT_PUBLIC_API_URL` defaults to: `'http://localhost:3000'`

### Editor Config

This application was developed with VS Code, and this doc assumes you're using VS Code too.

It's okay if you're not, but you are wrong. You must accept this before moving forward.

```bash
⏳ Accepting...
⏳ Accepting...
⏳ Accepting...
✅ Acceptance complete.

🚀 Moving forward.
```

Make sure that you have the VS Code extensions for ESLint and Prettier installed and configured if you want to experience all of the 🌞 and 🌈 that come from automatic ESLint and Prettier fixes on save.

**Production builds will fail if there are lint errors in your code.**

If you're unsure whether or not your linter is working as expected, run:

```bash
npm run lint
```

on the command line.

If you observe linter errors in the CLI output that are not visibly linted in your editor...

...you Dance on the Edge of Doom™️. Fix it, or perish!

### Install MongoDB

[Install MongoDB (Community Edition)](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/).

Murphy's Law usually applies to MongoDB installs. Muscle through. 💪

### Seed Your Dev DB

#### Adding Records

To seed your Dev DB with the seed data stored in `src/db/seedData.json`, make sure that `MONGOD_URI` is commented out in your `.env` file.

Then run:

```bash
npm run db-seed
```

Running the same command with `MONGOD_URI` set to the production DB instance will add a duplicate set of seed data to the production DB. (Obviously, don't do this.)

#### Deleting Records

Perhaps you've decided to update the seed data in `src/db/seedData.json`.

Before re-seeding the database, make sure to delete all of the records that currently exist.

To delete all records in the database, run:

```bash
npm run db-delete-all
```

### Run the Application

Run

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Make Changes

Edit code and save.

The page should auto-update in your browser on save. ✨

## Moar

Most of this is default documentation from `create-next-app`, with a few extra notes.

### Routing

- Both Client and API routes are handled by the built-in [Next.js routing system](https://nextjs.org/docs/pages/building-your-application/routing).

- [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

- The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Learn More About Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Learn More about Deployment on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
