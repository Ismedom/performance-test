const numbers = [1, 2, 3];

// Using map() - returns nested arrays
const withMap = numbers.map((n) => [n, n * 2]);
// Result: [[1, 2], [2, 4], [3, 6]]

// Using flatMap() - automatically flattens
const withFlatMap = [
  [1, 2],
  [2, 4],
  [3, 6, [4, 3]],
].flatMap((n) => n);
// Result: [1, 2, 2, 4, 3, 6, [4, 3]] - only flattens one level

// To flatten all levels, use flat() with depth Infinity
const fullyFlattened = [
  [1, 2],
  [2, 4],
  [3, 6, [4, 3]],
].flat(Infinity);
// Result: [1, 2, 2, 4, 3, 6, 4, 3]

console.log("flatMap result:", withFlatMap);
console.log("fullyFlattened result:", fullyFlattened);
