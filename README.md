# String Expansion

This package expands strings using nested `And` and `Or` objects into all
possible combinations.

## Installation

Using `yarn`:

```bash
yarn install github:lfbittencourt/string-expansion
```

Using `npm`:

```bash
npm install github:lfbittencourt/string-expansion
```

## Usage

```javascript
import expand from 'string-expansion';

const result = expand('(a|b)');

console.log(result); // ['a', 'b']
```

## Syntax

The syntax is similar to regular expressions and its composed by just a few
different tokens.

Optional characters are followed by a `?`:

```
ab? => ['a', 'ab']
```

Groups are used to group options. The group is defined by parentheses and the
options are separated by `|`:

```
(a|b) => ['a', 'b']
```

Optional groups are followed by a `?`:

```
(a|b)? => ['a', 'b', '']
```

Groups can be nested:

```
(a(b|c)) => ['ab', 'ac']
```

Finally, you can mix all of them into complex patterns:

```
Mary( Eli(z|s)abeth)?( Simmons)? Smith(son)? => [
  'Mary Elizabeth Simmons Smithson',
  'Mary Elizabeth Simmons Smith',
  'Mary Elizabeth Smithson',
  'Mary Elizabeth Smith',
  'Mary Elisabeth Simmons Smithson',
  'Mary Elisabeth Simmons Smith',
  'Mary Elisabeth Smithson',
  'Mary Elisabeth Smith',
  'Mary Simmons Smithson',
  'Mary Simmons Smith',
  'Mary Smithson',
  'Mary Smith'
]
```
