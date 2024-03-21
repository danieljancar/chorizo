# Workflow

We follow a pretty simple, open-source and semantic workflow. We
use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure that the commit messages are
consistent and easy to understand. This allows us to automatically generate the changelog and release notes.

## Table of Contents

- [Commit Messages](#commit-messages)
- [Branching](#branching)
- [Issues](#issues)
- [Pull Requests](#pull-requests)

### Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure that the commit messages are
consistent and easy to understand. This allows us to automatically generate the changelog and release notes.

The commit message should in most cases be structured as follows:

```
<type>[optional scope]: <description>
```

Find out more in our [CONTRIBUTING.md](../.github/CONTRIBUTING.md) about the available types and scopes and how to use
them.

### Branching

We use the normal Github flow for branching. We have a `master` branch that is always stable and a `develop` branch that
is used for development. We create feature branches from `develop` and merge them back into `develop` when they are
ready to be reviewed.

### Issues

We use [GitHub Issues](https://guides.github.com/features/issues/) to track bugs, features, and other tasks. Always use
a descriptive title and a clear description of the issue, we already have some templates to help you with that.

After creating an issue, our bot will automatically assign the `triage` label if your an open-source contributor, also
our team will review, add labels and assign the issue to the right person.

> **We love open-source contributors!** If you're interested in solving yours or other issues, feel free to do so. We
> will take your implementation into consideration and review it. Just make sure to follow
> our [CONTRIBUTING.md](../.github/CONTRIBUTING.md) and other guidelines.

### Pull Requests

We
use [GitHub Pull Requests](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests)
to review and merge code. Always use a descriptive title and a clear description of the changes, we already have some
templates to help you with that.

If you're an open-source contributor, our bot will automatically assign the `triage` label to your pull request, also
our team will review, add labels, assign the pull request to the right person and hopefully merge it.
