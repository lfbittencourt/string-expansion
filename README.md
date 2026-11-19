# String Expansion

Expand string patterns into all possible combinations. Especially useful for name spelling variations.

```ts
import expand from 'string-expansion';

expand('(Mary|John) Smith(son)?');
// => ['Mary Smithson', 'Mary Smith', 'John Smithson', 'John Smith']
```

Also available as CommonJS:

```js
const expand = require('string-expansion');
```

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

## Syntax

The syntax is similar to regular expressions and its composed by just a few
different tokens.

### Literals

Literal strings output themselves:

```ts
expand('a');
// => ['a']
```

### Optional characters

Optional characters are followed by a `?`:

```ts
expand('ab?');
// => ['ab', 'a']
```

### Groups

Groups are used to group options. The group is defined by parentheses and the
options are separated by `|`:

```ts
expand('(a|b)');
// => ['a', 'b']
```

Groups can have a single option:

```ts
expand('(a)');
// => ['a']
```

### Optional groups

Optional groups are followed by a `?`:

```ts
expand('(a|b)?');
// => ['a', 'b', '']
```

You can use a single-option group combined with the optional character `?` to
make more than one character optional:

```ts
expand('(ab)?');
// => ['ab', '']
```

### Nested groups

Groups can be nested:

```ts
expand('(a(b|c))');
// => ['ab', 'ac']
```

### Inclusive groups

You can also use inclusive groups (or simply igroups) by using a plus sign (`+`)
before the options. Different from the standard groups, igroups also output an
option that concatenates all of its options:

```ts
expand('(+a|b)');
// => ['a', 'b', 'ab']
```

As with standard groups, igroups can be optional:

```ts
expand('(+a|b)?');
// => ['a', 'b', 'ab', '']
```

Igroups can also be nested:

```ts
expand('(+a|(+b|c))');
// => ['a', 'b', 'c', 'bc', 'ab', 'ac', 'abc']
```

### Escaping

You can escape special characters by using a backslash (`\`):

```ts
expand('\\(a\\|b\\)');
// => ['(a|b)']
```

Special characters: `( ) | + ? \`

### Complex patterns

Finally, you can mix all of them into complex patterns:

```ts
expand('Mary( Eli(z|s)abeth)?(+ Simmons| Smith(son)?)');
// => [
//   'Mary Elizabeth Simmons',
//   'Mary Elizabeth Smithson',
//   'Mary Elizabeth Smith',
//   'Mary Elizabeth Simmons Smithson',
//   'Mary Elizabeth Simmons Smith',
//   'Mary Elisabeth Simmons',
//   'Mary Elisabeth Smithson',
//   'Mary Elisabeth Smith',
//   'Mary Elisabeth Simmons Smithson',
//   'Mary Elisabeth Simmons Smith',
//   'Mary Simmons',
//   'Mary Smithson',
//   'Mary Smith',
//   'Mary Simmons Smithson',
//   'Mary Simmons Smith',
// ]
```
