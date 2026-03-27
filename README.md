# String Expansion

Expand string patterns into all possible combinations.

```js
import expand from 'string-expansion';
// or
const expand = require('string-expansion');

expand('(Mary|John) Smith(son)?');
// => ['Mary Smith', 'Mary Smithson', 'John Smith', 'John Smithson']
```

## Use cases

- **Name variant matching** — nicknames, maiden names, spelling alternatives
- **Search query expansion** — generate all query strings from one compact pattern
- **Test data generation** — produce exhaustive input sets from a compact definition
- **Localization** — cover spelling variants like `colo(u?)r` or `program(me?)`

## Installation

```bash
npm install string-expansion
# or
yarn add string-expansion
```

## API

```ts
expand(pattern: string): string[]
```

Parses `pattern` and returns an array of all matching strings. Throws an
`Error` if the pattern is invalid.

Results are returned in **expansion order**, not sorted. Duplicate strings are
not removed — `(a|a)` returns `['a', 'a']`. The output size grows
exponentially with the number of alternatives and optional elements, so use
with care in large patterns.

## Syntax

### Literals

Plain text is returned as-is:

```
a => ['a']
```

### Optional characters

Append `?` to make the preceding character optional:

```
ab? => ['a', 'ab']
```

### Groups

Parentheses group alternatives separated by `|`:

```
(a|b) => ['a', 'b']
(a)   => ['a']
```

### Optional groups

Append `?` to a group to include the empty string as an option:

```
(a|b)? => ['', 'a', 'b']
(ab)?  => ['', 'ab']
```

### Nested groups

Groups can be nested arbitrarily:

```
(a(b|c)) => ['ab', 'ac']
```

### Inclusive groups

Prefix the group with `+` to also output every combination of its options:

```
(+a|b) => ['a', 'b', 'ab']
```

With three or more options, each option appears individually plus all of them
concatenated in order — not every pairwise combination:

```
(+a|b|c) => ['a', 'b', 'c', 'abc']
```

Optional inclusive groups include the empty string:

```
(+a|b)? => ['', 'a', 'b', 'ab']
```

Inclusive groups can be nested:

```
(+a|(+b|c)) => ['a', 'ab', 'abc', 'ac', 'b', 'bc', 'c']
```

### Escaping

Prefix any special character with `\` to treat it as a literal:

```
\(a\|b\) => ['(a|b)']
```

Special characters: `( ) | + ? \`

### Complex patterns

All features compose freely:

```
Mary( Eli(z|s)abeth)?(+ Simmons| Smith(son)?) => [
  'Mary Elisabeth Simmons',
  'Mary Elisabeth Simmons Smith',
  'Mary Elisabeth Simmons Smithson',
  'Mary Elisabeth Smith',
  'Mary Elisabeth Smithson',
  'Mary Elizabeth Simmons',
  'Mary Elizabeth Simmons Smith',
  'Mary Elizabeth Simmons Smithson',
  'Mary Elizabeth Smith',
  'Mary Elizabeth Smithson',
  'Mary Simmons',
  'Mary Simmons Smith',
  'Mary Simmons Smithson',
  'Mary Smith',
  'Mary Smithson',
]
```
