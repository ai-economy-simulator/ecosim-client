# AI Economy Simulator

Can we simulate macroeconomic factors using microeconomy of individual ventures?

If AI is too smart now, can it do this?

## Development Setup

1. Fork and Clone the repository locally.

1. Install `Node.js v20`, preferable using Node Version Manager (`nvm`). After installing `nvm`, you can run `nvm install --lts`. Execute `nvm use --lts` to switch to the correct version.

1. Run `npm i` to install all the required dependencies.

1. Run `npm run dev`. Once the server starts, open localhost with the correct port in the browser. Most probably, it would be `http://localhost:3000`.

1. To link the client to the server create a `.env.local` file in the root directly with the environment variables in the below format.

```
NEXT_PUBLIC_GAMESERVER_URL='ws://localhost:2567'
```

## Contributing Guidelines

1. Raise PRs only to the `main` branch.

1. There is a pre-commit hook for `prettier`. Please honor it, and report a bug if it does not execute automatically.

1. Resolve all merge conflicts unless states otherwise.
