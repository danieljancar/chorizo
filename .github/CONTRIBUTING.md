# Contributing to Chorizo

Thank you for your interest in contributing to Chorizo. To ensure a smooth contribution process and maintain the quality of our codebase, we have set specific guidelines, especially for commit messages and versioning.

## Semantic Release and Commit Message Guidelines

We use semantic release for automated version management and changelog generation. This requires commit messages to adhere to a specific format, enabling the automatic determination of version numbers and the generation of meaningful changelogs.

### Commit Message Format

Every commit message should be structured as follows:

1. **Type**: This describes the nature of the change. Common types include:

   - `feat` (new feature)
   - `fix` (bug fix)
   - `docs` (changes in documentation)
   - `style` (formatting, missing semi colons, etc; no code change)
   - `refactor` (refactoring production code)
   - `test` (adding tests, refactoring tests; no production code change)
   - `chore` (updating build tasks, package manager configs, etc; no production code change)

2. **Scope** (optional): This refers to the part of the codebase affected by the change, e.g., `login`, `user-dashboard`.

3. **Subject**: A brief description of the change, in the imperative mood.

4. **Body** (optional): A more detailed explanation of the changes. This is where you should explain the reasoning behind the changes if necessary.

5. **Footer** (optional): This should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit closes.

Example:

```
feat: add new login page

This commit adds a new login page to the application, allowing users to log in to their accounts.

BREAKING CHANGE: Users can no longer log in using their email address. Instead, they have to use their username.
```

### Commit Message Conventions

- Use the present tense ("add feature" not "added feature")
- Use the imperative mood ("move cursor to..." not "moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

## Pull Requests

1. **Squashing Commits**: Before submitting a PR, squash your commits into a single commit with a meaningful commit message as per the above guidelines.

2. **Pull Request Description**: Provide a clear description in your PR. Link the PR to any relevant issues.

3. **Review and Merge**: Once a PR is submitted, the maintainers will review it. If all criteria are met, it will be merged into the main codebase.

## Reporting Issues

- **Check for Existing Issues**: Before creating a new issue, make sure it hasn't been reported already.
- **Use Descriptive Titles**: Issue titles should be concise yet descriptive.
- **Detail in Comments**: Include details about the issue, steps to reproduce, expected behavior, screenshots, etc.

## Labels in Issues

- **Categorize with Labels**: Use appropriate labels like `bug`, `feature`, `documentation`, `help wanted` to help categorize and prioritize the issue.

Your contributions are vital to keeping Chorizo robust and reliable. By following these guidelines, we can ensure a smooth and efficient development process. Thank you for your contributions!
