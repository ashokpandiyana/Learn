# Complete JavaScript Arrays Guide - Interview Ready

## Table of Contents
1. [Array Creation](#array-creation)
2. [Array Properties](#array-properties)
3. [Mutating Methods](#mutating-methods)
4. [Non-Mutating Methods](#non-mutating-methods)
5. [Iteration Methods](#iteration-methods)
6. [Search & Test Methods](#search--test-methods)
7. [Transformation Methods](#transformation-methods)
8. [Static Methods](#static-methods)
9. [Advanced Concepts](#advanced-concepts)
10. [Interview Gotchas](#interview-gotchas)

---

## Array Creation

### 1. Array Literal
```javascript
const arr = [1, 2, 3];
const empty = [];
const mixed = [1, "hello", true, null, { key: "value" }];
```

### 2. Array Constructor
```javascript
const arr = new Array(3); // [empty × 3] - sparse array with length 3
const arr2 = new Array(1, 2, 3); // [1, 2, 3]
const arr3 = Array(5); // Same as new Array(5)
```

**Interview Trap:**
```javascript
Array(3); // [empty × 3] - length is 3
Array(3, 2); // [3, 2] - creates array with elements
```

### 3. Array.of()
Creates array from arguments (fixes constructor issue).
```javascript
Array.of(3); // [3] - not an empty array!
Array.of(1, 2, 3); // [1, 2, 3]
```

### 4. Array.from()
Creates array from iterable or array-like object.
```javascript
Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']
Array.from([1, 2, 3], x => x * 2); // [2, 4, 6]
Array.from({ length: 3 }, (_, i) => i); // [0, 1, 2]

// Array-like object
const arrayLike = { 0: 'a', 1: 'b', length: 2 };
Array.from(arrayLike); // ['a', 'b']
```

### 5. Spread Operator
```javascript
const arr = [...[1, 2, 3]];
const copy = [...original];
const merged = [...arr1, ...arr2];
```

---

## Array Properties

### **length**
Get or set the number of elements.
```javascript
const arr = [1, 2, 3];
arr.length; // 3

// Setting length
arr.length = 5; // [1, 2, 3, empty × 2]
arr.length = 2; // [1, 2] - truncates array!
arr.length = 0; // [] - empties array
```

**Interview Question:** How to empty an array?
```javascript
// Method 1: Set length to 0
arr.length = 0;

// Method 2: Reassignment (creates new array)
arr = [];

// Method 3: Using splice
arr.splice(0, arr.length);

// Method 4: Using pop in loop
while(arr.length) arr.pop();
```

---

## Mutating Methods
**⚠️ These modify the original array**

### **push(...items)**
Adds elements to end. Returns new length.
```javascript
const arr = [1, 2];
arr.push(3); // Returns 3
arr.push(4, 5); // Returns 5
// arr is now [1, 2, 3, 4, 5]
```

### **pop()**
Removes last element. Returns removed element.
```javascript
const arr = [1, 2, 3];
const last = arr.pop(); // Returns 3
// arr is now [1, 2]
```

### **unshift(...items)**
Adds elements to beginning. Returns new length.
```javascript
const arr = [2, 3];
arr.unshift(1); // Returns 3
arr.unshift(-1, 0); // Returns 5
// arr is now [-1, 0, 1, 2, 3]
```

### **shift()**
Removes first element. Returns removed element.
```javascript
const arr = [1, 2, 3];
const first = arr.shift(); // Returns 1
// arr is now [2, 3]
```

**Performance Note:** `shift()` and `unshift()` are O(n), `push()` and `pop()` are O(1).

### **splice(start, deleteCount, ...items)**
Adds/removes elements. Returns array of removed elements.
```javascript
const arr = [1, 2, 3, 4, 5];

// Remove elements
arr.splice(2, 2); // Returns [3, 4], arr is [1, 2, 5]

// Insert elements
arr.splice(1, 0, 'a', 'b'); // Returns [], arr is [1, 'a', 'b', 2, 5]

// Replace elements
arr.splice(0, 2, 'x'); // Returns [1, 'a'], arr is ['x', 'b', 2, 5]

// Remove from end (negative start)
arr.splice(-1, 1); // Removes last element

// Remove everything from index
arr.splice(2); // Removes from index 2 to end
```

**Interview Tricks:**
```javascript
// Insert at specific position without deleting
arr.splice(2, 0, 'new'); // Insert 'new' at index 2

// Remove element by value
const index = arr.indexOf(value);
if (index > -1) arr.splice(index, 1);
```

### **sort([compareFunction])**
Sorts array in place. Returns sorted array.
```javascript
const arr = [3, 1, 4, 1, 5];
arr.sort(); // [1, 1, 3, 4, 5]

// ⚠️ Default sort converts to strings!
const nums = [1, 2, 10, 21];
nums.sort(); // [1, 10, 2, 21] - Wrong!

// Correct numeric sort
nums.sort((a, b) => a - b); // [1, 2, 10, 21] - ascending
nums.sort((a, b) => b - a); // [21, 10, 2, 1] - descending

// Sort objects
const users = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 }
];
users.sort((a, b) => a.age - b.age);

// String sort (case-insensitive)
const words = ['Zebra', 'apple', 'Banana'];
words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
```

**Interview Question:** Compare function rules:
- Return negative: a comes first
- Return positive: b comes first
- Return 0: keep original order

### **reverse()**
Reverses array in place. Returns reversed array.
```javascript
const arr = [1, 2, 3];
arr.reverse(); // [3, 2, 1]
```

### **fill(value, start, end)**
Fills array with static value.
```javascript
const arr = [1, 2, 3, 4, 5];
arr.fill(0); // [0, 0, 0, 0, 0]
arr.fill(9, 2, 4); // [0, 0, 9, 9, 0]

// Create array filled with value
Array(5).fill(1); // [1, 1, 1, 1, 1]
```

**Interview Trap:**
```javascript
// Objects are referenced!
const arr = Array(3).fill({});
arr[0].name = "John";
console.log(arr); // All objects have name: "John"!

// Correct way
const arr = Array(3).fill(null).map(() => ({}));
```

### **copyWithin(target, start, end)**
Copies part of array to another location in same array.
```javascript
const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3); // [4, 5, 3, 4, 5]

const arr2 = [1, 2, 3, 4, 5];
arr2.copyWithin(2, 0, 2); // [1, 2, 1, 2, 5]
```

---

## Non-Mutating Methods
**✅ These return new arrays without modifying original**

### **concat(...values)**
Merges arrays/values.
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = arr1.concat(arr2); // [1, 2, 3, 4]
const merged2 = arr1.concat(arr2, 5, [6, 7]); // [1, 2, 3, 4, 5, 6, 7]

// Modern alternative: spread
const merged3 = [...arr1, ...arr2];
```

### **slice(start, end)**
Returns shallow copy of portion.
```javascript
const arr = [1, 2, 3, 4, 5];
arr.slice(1, 3); // [2, 3]
arr.slice(2); // [3, 4, 5] - from index to end
arr.slice(-2); // [4, 5] - last 2 elements
arr.slice(); // [1, 2, 3, 4, 5] - shallow copy

// Copy array
const copy = arr.slice();
```

### **join(separator)**
Joins elements into string.
```javascript
const arr = ['Hello', 'World'];
arr.join(' '); // "Hello World"
arr.join(', '); // "Hello, World"
arr.join(''); // "HelloWorld"
[1, 2, 3].join('-'); // "1-2-3"
```

### **toString()**
Converts to string (comma-separated).
```javascript
[1, 2, 3].toString(); // "1,2,3"
[['a'], ['b']].toString(); // "a,b"
```

### **toLocaleString()**
Locale-specific string conversion.
```javascript
const arr = [1234.5, new Date()];
arr.toLocaleString(); // "1,234.5, 11/26/2025, 10:30:00 AM"
```

### **flat(depth)**
Flattens nested arrays.
```javascript
const arr = [1, [2, 3], [4, [5, 6]]];
arr.flat(); // [1, 2, 3, 4, [5, 6]] - default depth 1
arr.flat(2); // [1, 2, 3, 4, 5, 6]
arr.flat(Infinity); // Flattens completely

// Remove empty slots
[1, 2, , 4, 5].flat(); // [1, 2, 4, 5]
```

### **flatMap(callback)**
Maps then flattens by 1 level.
```javascript
const arr = [1, 2, 3];
arr.flatMap(x => [x, x * 2]); // [1, 2, 2, 4, 3, 6]

// Same as:
arr.map(x => [x, x * 2]).flat();

// Practical example: split sentences into words
const sentences = ["Hello world", "How are you"];
sentences.flatMap(s => s.split(' ')); 
// ["Hello", "world", "How", "are", "you"]
```

### **toReversed()** (ES2023)
Returns reversed copy (non-mutating).
```javascript
const arr = [1, 2, 3];
const reversed = arr.toReversed(); // [3, 2, 1]
// arr is still [1, 2, 3]
```

### **toSorted([compareFunction])** (ES2023)
Returns sorted copy (non-mutating).
```javascript
const arr = [3, 1, 2];
const sorted = arr.toSorted(); // [1, 2, 3]
// arr is still [3, 1, 2]
```

### **toSpliced(start, deleteCount, ...items)** (ES2023)
Returns spliced copy (non-mutating).
```javascript
const arr = [1, 2, 3, 4];
const spliced = arr.toSpliced(1, 2, 'a', 'b'); 
// [1, 'a', 'b', 4]
// arr is still [1, 2, 3, 4]
```

### **with(index, value)** (ES2023)
Returns copy with element replaced.
```javascript
const arr = [1, 2, 3];
const updated = arr.with(1, 10); // [1, 10, 3]
// arr is still [1, 2, 3]
```

---

## Iteration Methods
**These iterate over arrays**

### **forEach(callback(element, index, array))**
Executes function for each element. Returns undefined.
```javascript
const arr = [1, 2, 3];
arr.forEach((num, index) => {
  console.log(`${index}: ${num}`);
});

// ⚠️ Can't break or return early!
// Use for...of or some() if you need to break
```

**Interview Gotcha:** forEach doesn't return anything!
```javascript
const result = [1, 2, 3].forEach(x => x * 2); 
console.log(result); // undefined
```

### **map(callback(element, index, array))**
Creates new array with transformed elements.
```javascript
const arr = [1, 2, 3];
const doubled = arr.map(x => x * 2); // [2, 4, 6]

const users = [
  { firstName: 'John', lastName: 'Doe' },
  { firstName: 'Jane', lastName: 'Smith' }
];
const fullNames = users.map(u => `${u.firstName} ${u.lastName}`);
// ["John Doe", "Jane Smith"]
```

**Interview Tip:** map always returns array of same length!

### **filter(callback(element, index, array))**
Creates new array with elements that pass test.
```javascript
const arr = [1, 2, 3, 4, 5];
const even = arr.filter(x => x % 2 === 0); // [2, 4]

// Remove falsy values
const clean = [0, 1, false, 2, '', 3].filter(Boolean); // [1, 2, 3]

// Filter objects
const adults = users.filter(u => u.age >= 18);
```

### **reduce(callback(accumulator, current, index, array), initialValue)**
Reduces array to single value.
```javascript
const arr = [1, 2, 3, 4, 5];

// Sum
const sum = arr.reduce((acc, num) => acc + num, 0); // 15

// Product
const product = arr.reduce((acc, num) => acc * num, 1); // 120

// Max value
const max = arr.reduce((acc, num) => Math.max(acc, num), -Infinity);

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana'];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
// { apple: 2, banana: 2, orange: 1 }

// Flatten array
const nested = [[1, 2], [3, 4], [5]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
// [1, 2, 3, 4, 5]

// Group by property
const people = [
  { name: 'John', age: 25 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 30 }
];
const grouped = people.reduce((acc, person) => {
  (acc[person.age] = acc[person.age] || []).push(person);
  return acc;
}, {});
// { 25: [{John}, {Jane}], 30: [{Bob}] }
```

**Interview Trap:** Always provide initial value!
```javascript
[].reduce((acc, x) => acc + x); // TypeError!
[].reduce((acc, x) => acc + x, 0); // 0 - Safe
```

### **reduceRight(callback, initialValue)**
Same as reduce but from right to left.
```javascript
const arr = ['a', 'b', 'c'];
arr.reduce((acc, char) => acc + char, ''); // "abc"
arr.reduceRight((acc, char) => acc + char, ''); // "cba"
```

---

## Search & Test Methods

### **find(callback(element, index, array))**
Returns first element that passes test.
```javascript
const arr = [1, 2, 3, 4, 5];
arr.find(x => x > 3); // 4
arr.find(x => x > 10); // undefined

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];
users.find(u => u.id === 2); // { id: 2, name: 'Jane' }
```

### **findIndex(callback)**
Returns index of first element that passes test.
```javascript
const arr = [1, 2, 3, 4, 5];
arr.findIndex(x => x > 3); // 3
arr.findIndex(x => x > 10); // -1
```

### **findLast(callback)** (ES2023)
Returns last element that passes test.
```javascript
const arr = [1, 2, 3, 4, 5];
arr.findLast(x => x > 2); // 5
```

### **findLastIndex(callback)** (ES2023)
Returns index of last element that passes test.
```javascript
const arr = [1, 2, 3, 4, 5];
arr.findLastIndex(x => x > 2); // 4
```

### **indexOf(searchElement, fromIndex)**
Returns first index of element, or -1.
```javascript
const arr = [1, 2, 3, 2, 1];
arr.indexOf(2); // 1
arr.indexOf(2, 2); // 3 - search from index 2
arr.indexOf(10); // -1

// Check if element exists
arr.indexOf(2) !== -1; // true
arr.includes(2); // Better way
```

**Interview Note:** Uses strict equality (===).
```javascript
[NaN].indexOf(NaN); // -1 (NaN !== NaN)
[NaN].includes(NaN); // true - includes handles NaN correctly!
```

### **lastIndexOf(searchElement, fromIndex)**
Returns last index of element.
```javascript
const arr = [1, 2, 3, 2, 1];
arr.lastIndexOf(2); // 3
arr.lastIndexOf(2, 2); // 1 - search backwards from index 2
```

### **includes(searchElement, fromIndex)**
Tests if array includes element.
```javascript
const arr = [1, 2, 3];
arr.includes(2); // true
arr.includes(4); // false
arr.includes(2, 2); // false - starts from index 2

// Works with NaN
[NaN].includes(NaN); // true
[NaN].indexOf(NaN); // -1
```

### **some(callback)**
Tests if at least one element passes test.
```javascript
const arr = [1, 2, 3, 4, 5];
arr.some(x => x > 3); // true
arr.some(x => x > 10); // false

// Check if array has any even numbers
arr.some(x => x % 2 === 0); // true

// Empty array always returns false
[].some(x => true); // false
```

### **every(callback)**
Tests if all elements pass test.
```javascript
const arr = [2, 4, 6, 8];
arr.every(x => x % 2 === 0); // true
arr.every(x => x > 5); // false

// Empty array always returns true
[].every(x => false); // true
```

**Interview Pattern:** Early exit
```javascript
// some() stops at first true
// every() stops at first false
```

### **at(index)**
Returns element at index (supports negative indices).
```javascript
const arr = [1, 2, 3, 4, 5];
arr.at(0); // 1
arr.at(-1); // 5 - last element
arr.at(-2); // 4 - second to last

// Old way vs new way
arr[arr.length - 1]; // 5
arr.at(-1); // 5 - cleaner
```

---

## Transformation Methods

### **keys()**
Returns iterator of array indices.
```javascript
const arr = ['a', 'b', 'c'];
const iterator = arr.keys();
for (let key of iterator) {
  console.log(key); // 0, 1, 2
}

// Convert to array
[...arr.keys()]; // [0, 1, 2]
Array.from(arr.keys()); // [0, 1, 2]
```

### **values()**
Returns iterator of array values.
```javascript
const arr = ['a', 'b', 'c'];
const iterator = arr.values();
for (let value of iterator) {
  console.log(value); // 'a', 'b', 'c'
}

[...arr.values()]; // ['a', 'b', 'c']
```

### **entries()**
Returns iterator of [index, value] pairs.
```javascript
const arr = ['a', 'b', 'c'];
for (let [index, value] of arr.entries()) {
  console.log(index, value);
}
// 0 'a'
// 1 'b'
// 2 'c'

[...arr.entries()]; // [[0, 'a'], [1, 'b'], [2, 'c']]
```

---

## Static Methods

### **Array.isArray(value)**
Tests if value is an array.
```javascript
Array.isArray([1, 2, 3]); // true
Array.isArray('array'); // false
Array.isArray({ length: 2 }); // false
Array.isArray(null); // false

// Only reliable way to check arrays
typeof [1, 2, 3]; // "object" - not helpful!
[1, 2, 3] instanceof Array; // true - but can fail across iframes
```

### **Array.of(...elements)**
Creates array from arguments.
```javascript
Array.of(1, 2, 3); // [1, 2, 3]
Array.of(7); // [7] - not empty array
Array.of(); // []

// Compare to constructor
Array(7); // [empty × 7]
Array.of(7); // [7]
```

### **Array.from(arrayLike, mapFn, thisArg)**
Creates array from iterable/array-like.
```javascript
// From string
Array.from('hello'); // ['h', 'e', 'l', 'l', 'o']

// From Set
Array.from(new Set([1, 2, 2, 3])); // [1, 2, 3]

// From Map
const map = new Map([[1, 'a'], [2, 'b']]);
Array.from(map); // [[1, 'a'], [2, 'b']]

// With mapping function
Array.from([1, 2, 3], x => x * 2); // [2, 4, 6]

// Create range
Array.from({ length: 5 }, (_, i) => i); // [0, 1, 2, 3, 4]
Array.from({ length: 5 }, (_, i) => i + 1); // [1, 2, 3, 4, 5]

// NodeList to Array
const divs = document.querySelectorAll('div');
Array.from(divs);
[...divs]; // Alternative
```

---

## Advanced Concepts

### Sparse Arrays
Arrays with empty slots.
```javascript
const sparse = [1, , 3]; // [1, empty, 3]
sparse.length; // 3
sparse[1]; // undefined

// Creating sparse arrays
const arr1 = new Array(3); // [empty × 3]
const arr2 = [1, 2, 3];
delete arr2[1]; // [1, empty, 3]

// Sparse arrays in methods
[1, , 3].map(x => x * 2); // [2, empty, 6] - skips empty
[1, , 3].forEach(x => console.log(x)); // Logs 1, 3 - skips empty

// Removing empty slots
const dense = sparse.filter(() => true); // [1, 3]
const dense2 = [...sparse]; // [1, undefined, 3] - fills with undefined
```

### Array-Like Objects
Objects with length property.
```javascript
const arrayLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

// Convert to array
Array.from(arrayLike); // ['a', 'b', 'c']
[...arrayLike]; // Error - not iterable
Array.prototype.slice.call(arrayLike); // ['a', 'b', 'c']

// Arguments object
function test() {
  const args = Array.from(arguments);
  // or
  const args2 = [...arguments];
  // or
  const args3 = Array.prototype.slice.call(arguments);
}
```

### Multi-dimensional Arrays
```javascript
// 2D array
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

matrix[0][0]; // 1
matrix[1][2]; // 6

// Create 2D array
const rows = 3, cols = 4;
const grid = Array.from({ length: rows }, 
  () => Array.from({ length: cols }, () => 0)
);

// Flatten 2D array
const flat = matrix.flat(); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
const flat2 = matrix.reduce((acc, row) => acc.concat(row), []);
```

### Array Destructuring
```javascript
const arr = [1, 2, 3, 4, 5];

// Basic
const [first, second] = arr; // first = 1, second = 2

// Skip elements
const [a, , c] = arr; // a = 1, c = 3

// Rest operator
const [head, ...tail] = arr; // head = 1, tail = [2, 3, 4, 5]

// Default values
const [x, y, z = 10] = [1, 2]; // x = 1, y = 2, z = 10

// Swapping
let a = 1, b = 2;
[a, b] = [b, a]; // a = 2, b = 1

// Nested
const nested = [[1, 2], [3, 4]];
const [[a, b], [c, d]] = nested;
```

### Performance Considerations
```javascript
// Fast: O(1)
arr.push(item);
arr.pop();
arr[index];
arr.length;

// Slow: O(n)
arr.shift();
arr.unshift(item);
arr.splice(0, 1);

// For large arrays
// Use push/pop instead of shift/unshift when possible

// Iteration performance
// for loop > for...of > forEach > map/filter/reduce
```

---

## Interview Gotchas

### 1. Array Copy - Shallow vs Deep
```javascript
// Shallow copy
const arr = [[1, 2], [3, 4]];
const copy1 = arr.slice();
const copy2 = [...arr];
const copy3 = Array.from(arr);

copy1[0][0] = 99;
console.log(arr[0][0]); // 99 - nested arrays are referenced!

// Deep copy
const deepCopy = JSON.parse(JSON.stringify(arr));
const deepCopy2 = structuredClone(arr); // Modern way
```

### 2. Array Equality
```javascript
[1, 2, 3] === [1, 2, 3]; // false - different references

// Compare arrays
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}

// Or using JSON (simple values only)
JSON.stringify([1, 2, 3]) === JSON.stringify([1, 2, 3]); // true
```

### 3. Modifying Array During Iteration
```javascript
const arr = [1, 2, 3, 4, 5];

// ⚠️ Wrong - skips elements
arr.forEach((num, i) => {
  if (num % 2 === 0) arr.splice(i, 1);
});

// ✅ Correct - iterate backwards
for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] % 2 === 0) arr.splice(i, 1);
}

// Or use filter
const filtered = arr.filter(num => num % 2 !== 0);
```

### 4. Array Methods on Empty Arrays
```javascript
[].reduce((acc, x) => acc + x); // TypeError - no initial value
[].reduce((acc, x) => acc + x, 0); // 0 - safe

[].some(x => true); // false
[].every(x => false); // true - counterintuitive!

[].map(x => x * 2); // []
[].filter(x => true); // []
```

### 5. sort() Gotcha
```javascript
// ⚠️ Sorts as strings by default!
[1, 2, 10, 21].sort(); // [1, 10, 2, 21]

// ✅ Numeric sort
[1, 2, 10, 21].sort((a, b) => a - b); // [1, 2, 10, 21]

// ⚠️ Mutates original!
const original = [3, 1, 2];
const sorted = original.sort();
console.log(original); // [1, 2, 3] - mutated!

// ✅ Non-mutating
const sorted = [...original].sort();
// or
const sorted = original.toSorted(); // ES2023
```

### 6. Array vs Object Bracket Notation
```javascript
const arr = [1, 2, 3];
arr['key'] = 'value'; // Valid but don't do this!
arr.length; // 3 - doesn't include 'key'
console.log(arr); // [1, 2, 3, key: 'value']

// Arrays are objects
typeof [1, 2, 3]; // "object"
```

### 7. Holey Arrays
```javascript
// Avoid creating holes
const arr = [];
arr[99] = 1; // Creates 99 empty slots!
arr.length; // 100

// Better
const arr = Array(100).fill(0);
arr[99] = 1;
```

### 8. forEach Can't Be Stopped
```javascript
// ⚠️ Can't break out of forEach
[1, 2, 3, 4, 5].forEach(num => {
  if (num === 3) return; // Only skips this iteration
  console.log(num);
}); // Logs: 1, 2, 4, 5

// ✅ Use for...of if you need to break
for (const num of arr) {
  if (num === 3) break; // Exits loop
  console.log(num);
} // Logs: 1, 2
```

### 9. Reference vs Value
```javascript
const arr1 = [1, 2, 3];
const arr2 = arr1; // Same reference
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4]

// Create copy
const arr3 = [...arr1];
arr3.push(5);
console.log(arr1); // [1, 2, 3, 4] - unchanged
```

### 10. Array Length Manipulation
```javascript
const arr = [1, 2, 3, 4, 5];

// Truncate
arr.length = 3; // [1, 2, 3]

// Extend (creates empty slots)
arr.length = 5; // [1, 2, 3, empty × 2]

// Empty array
arr.length = 0; // []
```

---

## Common Interview Patterns

### 1. Remove Duplicates
```javascript
// Using Set
const unique = [...new Set(arr)];

// Using filter
const unique = arr.filter((item, index) => arr.indexOf(item) === index);

// For objects (by property)
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 1, name: 'John' }
];
const unique = [...new Map(users.map(u => [u.id, u])).values()];
```

### 2. Chunk Array
```javascript
function chunk(arr, size) {
  return Array.from(
    { length: Math.ceil(arr.length / size) },
    (_, i) => arr.slice(i * size, i * size + size)
  );
}
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
```

### 3. Flatten Nested Array
```javascript
// Using flat
arr.flat(Infinity);

// Recursive
function flatten(arr) {
  return arr.reduce((acc, item) =>
    Array.isArray(item) ? acc.concat(flatten(item)) : acc.concat(item),
    []
  );
}
```

### 4. Array Intersection
```javascript
const intersection = arr1.filter(x => arr2.includes(x));

// Remove duplicates
const intersection = [...new Set(arr1)].filter(x => arr2.includes(x));
```

### 5. Array Difference
```javascript
const difference = arr1.filter(x => !arr2.includes(x));
```

### 6. Group By
```javascript
const groupBy = (arr, key) =>
  arr.reduce((acc, item) => {
    (acc[item[key]] = acc[item[key]] || []).push(item);
    return acc;
  }, {});

// ES2024 - Array.prototype.group()
const grouped = arr.group(item => item.category);
```

### 7. Array Shuffle
```javascript
function shuffle(arr) {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
```

### 8. Array Rotation
```javascript
// Rotate right
function rotateRight(arr, k) {
  k = k % arr.length;
  return [...arr.slice(-k), ...arr.slice(0, -k)];
}

// Rotate left
function rotateLeft(arr, k) {
  k = k % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
}
```

---

## Quick Reference Table

| Method | Mutates | Returns | Time Complexity |
|--------|---------|---------|-----------------|
| `push()` | Yes | Length | O(1) |
| `pop()` | Yes | Element | O(1) |
| `shift()` | Yes | Element | O(n) |
| `unshift()` | Yes | Length | O(n) |
| `splice()` | Yes | Array | O(n) |
| `sort()` | Yes | Array | O(n log n) |
| `reverse()` | Yes | Array | O(n) |
| `fill()` | Yes | Array | O(n) |
| `slice()` | No | Array | O(n) |
| `concat()` | No | Array | O(n) |
| `map()` | No | Array | O(n) |
| `filter()` | No | Array | O(n) |
| `reduce()` | No | Any | O(n) |
| `find()` | No | Element | O(n) |
| `indexOf()` | No | Number | O(n) |
| `includes()` | No | Boolean | O(n) |

---

## Modern ES2023/2024 Features

```javascript
// Change array by copy (non-mutating versions)
arr.toReversed(); // Returns reversed copy
arr.toSorted(); // Returns sorted copy
arr.toSpliced(1, 2); // Returns spliced copy
arr.with(index, value); // Returns copy with replaced element

// findLast and findLastIndex
arr.findLast(x => x > 5);
arr.findLastIndex(x => x > 5);

// Array grouping (ES2024)
const grouped = arr.group(item => item.category);
const groupedMap = arr.groupToMap(item => item.category);
```

---

## Practice Questions

1. **Difference between `map()` and `forEach()`?**
2. **How to empty an array? (multiple ways)**
3. **Why does `[1, 2, 10].sort()` return `[1, 10, 2]`?**
4. **What's the difference between `slice()` and `splice()`?**
5. **How to remove duplicates from an array?**
6. **What does `some()` vs `every()` return for empty arrays?**
7. **How to flatten a nested array?**
8. **What's the difference between `indexOf()` and `includes()` with NaN?**
9. **How to deep clone an array?**
10. **What's the time complexity of `shift()` vs `pop()`?**

Master these concepts and you'll crush any array interview question! 🚀