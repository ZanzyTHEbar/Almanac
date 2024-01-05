# Almanac

<!-- TODO: Add docs and details -->
Almanac is a an open-source, cross-platform, and easy-to-use gardening calendar app built with SolidJS and Tauri.

## Usage

```bash
pnpm install # or npm install or yarn install
```

## Available Scripts

> [!WARNING]\
> You _must_ use `pnpm` to run the non-dev and build scripts. If you use `npm` or `yarn` the scripts will not work. You can modify the scripts in `package.json` to use `npm` or `yarn` if you prefer.

In the project directory, you can run:

### `pnpm dev`

> [!IMPORTANT]\
> Works with any package manager with no modifications.

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `pnpm build`

> [!IMPORTANT]\
> Works with any package manager with no modifications.

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `pnpm preview`

> [!IMPORTANT]\
> Works with any package manager with no modifications.

Locally preview production build without having to deploy it. This is useful for testing your production build before deploying it.

---

> [!IMPORTANT]\
> The following commands require changes to the `package.json` file to work with `npm` or `yarn`.

### `pnpm lint`

Lint the project using ESLint. This will check for any syntax errors and coding style errors.

### `pnpm format`

Format the project using Prettier. This will format all the files in the project. This will also run `pnpm lint` to check for any syntax errors and coding style errors.

### `pnpm doc-gen`

Generate the documentation for the project using JSDoc. This will generate the documentation in the `docs` folder.

### `pnpm update-deps`

Update all the dependencies in the project to their latest versions. This will also update the `package-lock.json` file.

You will be prompted to select which dependencies you want to update. You can also choose to update all dependencies.

### `pnpm typecheck`

Typecheck the project using TypeScript. This will check for any type errors.

## Deployment

`COMING SOON`

We will be using github actions to build and deploy using cloudflare.
