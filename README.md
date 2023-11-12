#### React application that fetches and renders the list of dashboards available to a DHIS2 user

#### Live demo
https://frontend-test-rust-five.vercel.app/
#### Getting Started

#### First, clone the repository
```bash
git clone https://github.com/herberthk/Frontend-test.git
```

#### Next, install dependencies:

```bash
npm install
# or
yarn add
# or
pnpm install
```
#### Configure environment variables
Create `.env` file and put in environment variables available in `.env.example` file

#### Generate environment variables types
```bash
npm run gen-env
# or
yarn gen-env
# or
pnpm gen-env
```

#### Run development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

#### Run integration tests
```bash
npm run test
# or
yarn test
# or
pnpm test
```

#### Run lint
```bash
npm run lint
# or
yarn lint
# or
pnpm lint
```

#### Tech stack
- Next.js 14 
- Typescript
- Zustand (for state management)
- Mantine UI (For UI components)
- Playwright (For integration tests)
- Eslint (For strict linting and formatting rules)

#### Screenshot
![screenshot](/screenshots/dashboards.png)

#### Decision made
- Mantine UI (Provides variety of UI components and hooks for React and easy to use)
- Zustand (It is Redux alternative that is easy to setup and use, it is also compatible with redux extensions)
- Playwright (It is cypress alternative that is more performant with easy to use API)