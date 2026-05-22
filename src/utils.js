function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }
function isEven(n) { return n % 2 === 0; }
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}
module.exports = { add, multiply, isEven, capitalize, chunk };
