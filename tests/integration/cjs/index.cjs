const expand = require('string-expansion');

const result = expand('(a|b)c');

if (result.length !== 2 || !result.includes('ac') || !result.includes('bc')) {
  console.error('CJS test failed:', result);
  process.exit(1);
}

console.log('CJS integration test passed');
