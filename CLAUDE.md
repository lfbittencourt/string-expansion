# Claude Code Project Notes

## Package Manager

This project uses **Yarn** instead of npm.

Use:
- `yarn install` (not `npm install`)
- `yarn test` (not `npm test`)
- `yarn build` (not `npm run build`)
- `yarn lint` (not `npm run lint`)

## Code Style

This project uses **ESLint** with Airbnb TypeScript configuration for code quality and consistency.

### Linting

- Always run `yarn lint` before committing
- Fix auto-fixable issues with `yarn lint:fix`
- Configuration: `eslint-config-airbnb-typescript`

### Key Style Rules

**Operators:**
- Use `+= 1` instead of `++` (no-plusplus rule)
- Place operators at the beginning of continued lines

**Imports/Exports:**
- Prefer default exports for single-export files
- Use object destructuring when appropriate
- Add blank lines between class members

**Methods:**
- Methods that don't use `this` should include `// eslint-disable-next-line class-methods-use-this` if they conceptually belong to the class

**Formatting:**
- Use consistent spacing and indentation (handled by ESLint)
- Break long lines appropriately
- Add blank lines between logical sections

### Before Committing

```bash
yarn lint      # Check for issues
yarn test      # Verify all tests pass
yarn build     # Ensure TypeScript compiles
```

## Git Workflow

### Commits

- Organize changes into **atomic commits** - each commit should be a logical unit of work
- Commits should not be too granular (avoid commits for single-line changes unless critical)
- Each commit should:
  - Have a clear, descriptive message
  - Be able to pass tests independently when possible
  - Group related changes together (e.g., implementation + tests for a feature)
- Use conventional commit format when applicable
- Always include co-authorship attribution when working with Claude Code

### Branching

- Create feature branches for non-trivial changes
- Use descriptive branch names (e.g., `issue-6-remove-chevrotain`, `feature/add-validation`)
- Keep branches focused on a single feature or fix

## Project Structure

This is a TypeScript package for expanding string patterns with groups, alternatives, and optional elements.

### Key Files

- [src/lexer.ts](src/lexer.ts) - Lexer for tokenizing patterns
- [src/parser.ts](src/parser.ts) - Recursive descent parser
- [src/pattern-to-tree.ts](src/pattern-to-tree.ts) - Entry point for parsing
- [src/logical.ts](src/logical.ts) - And/Or AST node classes
- [src/expand-tree.ts](src/expand-tree.ts) - Tree expansion logic

### Grammar

```
tree: element+
element: optionableEscapedToken | optionableText | optionableGroup
optionableEscapedToken: Backslash escapable (QuestionMark)?
optionableText: Text (QuestionMark)?
optionableGroup: LeftParenthesis (PlusSign)? tree (Pipe tree)* RightParenthesis (QuestionMark)?
```

### Testing

Comprehensive test suite in [tests/](tests/) directory:
- Run all tests: `yarn test`
- Tests cover: basic patterns, groups, inclusive groups, escaping, edge cases

### Build

- TypeScript compilation: `yarn build`
- Output directory: `dist/`
