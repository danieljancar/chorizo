# Formatting with Prettier

We use [Prettier](https://prettier.io/) to format our code. Prettier is an opinionated code formatter that enforces a
consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into
account, wrapping code when necessary.

> **Note:** We also have a Github Action that runs Prettier on every pull request and commits the new formats if
> necessary. Still, it's a good practice to run Prettier locally before pushing your changes or even having it running
> automatically in your IDE.

## Table of Contents

- [Setup](#setup)
  - [Prettier](#prettier)
    - [Usage](#usage)
    - [Integration with IDEs](#integration-with-ides)
  - [Husky](#husky)
    - [No verify](#no-verify)

## Setup

### Prettier

You should have Prettier installed as a development dependency in your project. If you don't, you can install it by
running

```bash
npm i
# or
npm install prettier --save-dev
```

#### Usage

You can run Prettier on your entire project by running

```bash
npm run prettier
```

#### Integration with IDEs

Prettier has integrations with most of the popular IDEs. You can find the instructions to install it in your
IDE [here](https://prettier.io/docs/en/editors.html). Make sure to choose our configuration in the `node_modules` /
our `.prettierrc` file.

### Husky

We also use Husky to run Prettier on every commit (pre-commit hook). This way, we ensure that every commit is formatted
correctly. If you don't have Husky installed, you can install it by running

```bash
npm i
```

#### No verify

If you want to commit without running Husky, you can use the `--no-verify` flag. For example:

```bash
git commit -m "Your commit message" --no-verify
```

> **Note:** We don't recommend using this flag. It's better to have your code validated and formatted before committing.
