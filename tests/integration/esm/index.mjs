import expand from 'string-expansion';

const result = expand('(a|b)c');

if (result.length !== 2 || !result.includes('ac') || !result.includes('bc')) {
  console.error('ESM test failed:', result);
  process.exit(1);
}

console.log('ESM integration test passed');
