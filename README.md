# String Expansion

This package expands strings using nested `And` and `Or` objects into all
possible combinations.

## Installation

Using `yarn`:

```bash
yarn install string-expansion
```

Using `npm`:

```bash
npm install string-expansion
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

### Literals

Literal strings output themselves:

```
a => ['a']
```

### Optional characters

Optional characters are followed by a `?`:

```
ab? => ['a', 'ab']
```

### Groups

Groups are used to group options. The group is defined by parentheses and the
options are separated by `|`:

```
(a|b) => ['a', 'b']
```

Groups can have a single option:

```
(a) => ['a']
```

### Optional groups

Optional groups are followed by a `?`:

```
(a|b)? => ['a', 'b', '']
```

You can use a single-option group combined with the optional character `?` to
make more than one character optional:

```
(ab)? => ['ab', '']
```

### Nested groups

Groups can be nested:

```
(a(b|c)) => ['ab', 'ac']
```

### Inclusive groups

You can also use inclusive groups (or simply igroups) by using a plus sign (`+`)
before the options. Different from the standard groups, igroups also output an
option that concatenates all of its options:

```
(+a|b) => ['a', 'b', 'ab']
```

As with standard groups, igroups can be optional:

```
(+a|b)? => ['a', 'b', 'ab', '']
```

Igroups can also be nested:

```
(+a|(+b|c)) => ['a', 'ab', 'abc', 'ac', 'b', 'bc', 'c']
```

### Complex patterns

Finally, you can mix all of them into complex patterns:

```
Mary( Eli(z|s)abeth)?( Simmons)? Smith(son)? => [
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
