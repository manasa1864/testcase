const { add, multiply, isEven, capitalize, chunk } = require('../src/utils');
let p = 0;
function ok(cond, msg) {
  if (cond) { console.log('  ✓', msg); p++; }
  else { console.error('  ✗ FAIL:', msg); process.exit(1); }
}
ok(add(2, 3) === 5, 'add(2,3)=5');
ok(multiply(3, 4) === 12, 'multiply(3,4)=12');
ok(isEven(4), 'isEven(4)');
ok(!isEven(3), '!isEven(3)');
ok(capitalize('hello') === 'Hello', 'capitalize');
ok(chunk([1,2,3,4], 2).length === 2, 'chunk');
console.log(`\n  ${p}/6 passed ✓`);
