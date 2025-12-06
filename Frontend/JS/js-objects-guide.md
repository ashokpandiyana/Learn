# Complete JavaScript Objects Guide - Interview Ready

## Table of Contents
1. [Object Creation](#object-creation)
2. [Object Static Methods](#object-static-methods)
3. [Object Prototype Methods](#object-prototype-methods)
4. [Property Descriptors](#property-descriptors)
5. [Getters & Setters](#getters--setters)
6. [Advanced Concepts](#advanced-concepts)
7. [Interview Gotchas](#interview-gotchas)

---

## Object Creation

### 1. Object Literal
```javascript
const obj = { name: "John", age: 30 };
```

### 2. Object Constructor
```javascript
const obj = new Object();
obj.name = "John";
```

### 3. Object.create()
```javascript
const proto = { greet() { console.log("Hello"); } };
const obj = Object.create(proto);
// obj inherits from proto
```

### 4. Constructor Function
```javascript
function Person(name) {
  this.name = name;
}
const person = new Person("John");
```

### 5. Class Syntax (ES6+)
```javascript
class Person {
  constructor(name) {
    this.name = name;
  }
}
```

---

## Object Static Methods

### **Object.keys(obj)**
Returns array of object's own enumerable property names.
```javascript
const obj = { a: 1, b: 2, c: 3 };
Object.keys(obj); // ['a', 'b', 'c']
```

### **Object.values(obj)**
Returns array of object's own enumerable property values.
```javascript
Object.values(obj); // [1, 2, 3]
```

### **Object.entries(obj)**
Returns array of [key, value] pairs.
```javascript
Object.entries(obj); // [['a', 1], ['b', 2], ['c', 3]]
```

### **Object.assign(target, ...sources)**
Copies enumerable properties from sources to target (shallow copy).
```javascript
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source); // { a: 1, b: 2, c: 3 }
```

**Interview Tip:** It's a shallow copy, nested objects are referenced!
```javascript
const obj1 = { nested: { value: 1 } };
const obj2 = Object.assign({}, obj1);
obj2.nested.value = 2;
console.log(obj1.nested.value); // 2 (not 1!)
```

### **Object.create(proto, [propertiesObject])**
Creates new object with specified prototype.
```javascript
const proto = { greet() { return "Hello"; } };
const obj = Object.create(proto);
obj.greet(); // "Hello"

// With property descriptors
const obj2 = Object.create(proto, {
  name: {
    value: "John",
    writable: true,
    enumerable: true,
    configurable: true
  }
});
```

### **Object.defineProperty(obj, prop, descriptor)**
Defines new property or modifies existing one.
```javascript
const obj = {};
Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: false,      // can't be changed
  enumerable: true,     // shows in for...in
  configurable: false   // can't be deleted or reconfigured
});

obj.name = "Jane"; // Silently fails (throws in strict mode)
console.log(obj.name); // "John"
```

### **Object.defineProperties(obj, props)**
Defines multiple properties at once.
```javascript
Object.defineProperties(obj, {
  firstName: { value: "John", writable: true },
  lastName: { value: "Doe", writable: true }
});
```

### **Object.getOwnPropertyDescriptor(obj, prop)**
Returns property descriptor for own property.
```javascript
const descriptor = Object.getOwnPropertyDescriptor(obj, 'name');
// { value: 'John', writable: false, enumerable: true, configurable: false }
```

### **Object.getOwnPropertyDescriptors(obj)**
Returns all own property descriptors.
```javascript
Object.getOwnPropertyDescriptors(obj);
```

### **Object.getOwnPropertyNames(obj)**
Returns array of all own properties (including non-enumerable).
```javascript
const obj = Object.create({}, {
  visible: { value: 1, enumerable: true },
  hidden: { value: 2, enumerable: false }
});
Object.getOwnPropertyNames(obj); // ['visible', 'hidden']
Object.keys(obj); // ['visible'] - only enumerable
```

### **Object.getOwnPropertySymbols(obj)**
Returns array of symbol properties.
```javascript
const sym = Symbol('key');
const obj = { [sym]: 'value' };
Object.getOwnPropertySymbols(obj); // [Symbol(key)]
```

### **Object.freeze(obj)**
Freezes object - no modifications possible.
```javascript
const obj = { name: "John" };
Object.freeze(obj);
obj.name = "Jane"; // Fails silently (throws in strict mode)
obj.age = 30; // Can't add properties
delete obj.name; // Can't delete properties
```

**Interview Trap:** Freeze is shallow!
```javascript
const obj = { nested: { value: 1 } };
Object.freeze(obj);
obj.nested.value = 2; // This works! Nested object isn't frozen
```

### **Object.seal(obj)**
Seals object - can't add/delete properties, but can modify existing ones.
```javascript
const obj = { name: "John" };
Object.seal(obj);
obj.name = "Jane"; // Works
obj.age = 30; // Fails
delete obj.name; // Fails
```

### **Object.preventExtensions(obj)**
Prevents adding new properties.
```javascript
const obj = { name: "John" };
Object.preventExtensions(obj);
obj.age = 30; // Fails
obj.name = "Jane"; // Works
delete obj.name; // Works
```

### **Object.isFrozen(obj)**
```javascript
Object.isFrozen(obj); // true/false
```

### **Object.isSealed(obj)**
```javascript
Object.isSealed(obj); // true/false
```

### **Object.isExtensible(obj)**
```javascript
Object.isExtensible(obj); // true/false
```

### **Object.getPrototypeOf(obj)**
Returns prototype of object.
```javascript
const proto = { greet: () => "Hello" };
const obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true
```

### **Object.setPrototypeOf(obj, prototype)**
Sets prototype of object (⚠️ performance impact).
```javascript
const proto = { greet: () => "Hello" };
const obj = {};
Object.setPrototypeOf(obj, proto);
```

### **Object.is(value1, value2)**
Compares values (like === but with special cases).
```javascript
Object.is(25, 25); // true
Object.is(NaN, NaN); // true (unlike NaN === NaN)
Object.is(0, -0); // false (unlike 0 === -0)
Object.is({}, {}); // false (different references)
```

### **Object.hasOwn(obj, prop)** (ES2022)
Better alternative to hasOwnProperty.
```javascript
const obj = { name: "John" };
Object.hasOwn(obj, 'name'); // true
Object.hasOwn(obj, 'toString'); // false (inherited)
```

### **Object.fromEntries(entries)**
Creates object from [key, value] pairs (opposite of Object.entries).
```javascript
const entries = [['a', 1], ['b', 2]];
Object.fromEntries(entries); // { a: 1, b: 2 }
```

---

## Object Prototype Methods

### **obj.hasOwnProperty(prop)**
Check if property exists on object itself (not inherited).
```javascript
const obj = { name: "John" };
obj.hasOwnProperty('name'); // true
obj.hasOwnProperty('toString'); // false
```

**Interview Tip:** Use `Object.hasOwn()` instead in modern code!

### **obj.isPrototypeOf(object)**
Check if object exists in another object's prototype chain.
```javascript
const proto = {};
const obj = Object.create(proto);
proto.isPrototypeOf(obj); // true
```

### **obj.propertyIsEnumerable(prop)**
Check if property is enumerable.
```javascript
const obj = {};
Object.defineProperty(obj, 'hidden', {
  value: 1,
  enumerable: false
});
obj.propertyIsEnumerable('hidden'); // false
```

### **obj.toString()**
Returns string representation.
```javascript
const obj = { name: "John" };
obj.toString(); // "[object Object]"

// Override for custom behavior
obj.toString = function() { return this.name; };
obj.toString(); // "John"
```

### **obj.valueOf()**
Returns primitive value of object.
```javascript
const obj = { value: 42 };
obj.valueOf(); // { value: 42 }

// Custom valueOf
obj.valueOf = function() { return this.value; };
obj.valueOf(); // 42
```

### **obj.toLocaleString()**
Returns localized string representation.
```javascript
const date = new Date();
date.toLocaleString(); // "11/26/2025, 10:30:00 AM" (varies by locale)
```

---

## Property Descriptors

Every property has 4 attributes in its descriptor:

### **Data Descriptors**
```javascript
{
  value: any,           // The value
  writable: boolean,    // Can be changed?
  enumerable: boolean,  // Shows in for...in, Object.keys?
  configurable: boolean // Can be deleted or reconfigured?
}
```

### **Accessor Descriptors**
```javascript
{
  get: function,        // Getter function
  set: function,        // Setter function
  enumerable: boolean,
  configurable: boolean
}
```

**Interview Question:** Can a property have both value and get/set?
**Answer:** No! A descriptor must be either data or accessor, not both.

---

## Getters & Setters

### Using Object Literal
```javascript
const obj = {
  _age: 0,
  get age() {
    return this._age;
  },
  set age(value) {
    if (value < 0) throw new Error("Age cannot be negative");
    this._age = value;
  }
};

obj.age = 25; // Calls setter
console.log(obj.age); // Calls getter, returns 25
```

### Using defineProperty
```javascript
Object.defineProperty(obj, 'fullName', {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  set(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }
});
```

---

## Advanced Concepts

### Prototype Chain
```javascript
const animal = {
  eats: true,
  walk() { console.log("Animal walks"); }
};

const rabbit = Object.create(animal);
rabbit.jumps = true;

rabbit.eats; // true (inherited)
rabbit.hasOwnProperty('eats'); // false
rabbit.hasOwnProperty('jumps'); // true
```

### Property Lookup Order
1. Own properties
2. Prototype properties
3. Prototype's prototype
4. ... until `null`

### for...in vs Object.keys()
```javascript
const parent = { inherited: true };
const child = Object.create(parent);
child.own = true;

// for...in includes inherited enumerable properties
for (let key in child) {
  console.log(key); // "own", "inherited"
}

// Object.keys() only own enumerable properties
Object.keys(child); // ["own"]
```

### Property Existence Check
```javascript
const obj = { name: "John", age: undefined };

// Different ways to check
'name' in obj; // true (checks own + inherited)
'toString' in obj; // true (inherited from Object.prototype)

obj.hasOwnProperty('name'); // true (own only)
Object.hasOwn(obj, 'name'); // true (modern way)

obj.age !== undefined; // false! (but property exists)
'age' in obj; // true (better way)
```

### Shallow vs Deep Copy
```javascript
// Shallow copy methods
const shallow1 = Object.assign({}, obj);
const shallow2 = { ...obj };

// Deep copy (simple objects only)
const deep = JSON.parse(JSON.stringify(obj));
// ⚠️ Loses: functions, undefined, Symbol, Date, RegExp

// Deep copy with structuredClone (modern)
const deepClone = structuredClone(obj);
```

---

## Interview Gotchas

### 1. Property Order
```javascript
const obj = { z: 1, a: 2, 1: 3, 0: 4 };
Object.keys(obj); // ["0", "1", "z", "a"]
// Order: integer keys (sorted) → string keys (insertion order)
```

### 2. Computed Property Names
```javascript
const key = 'dynamicKey';
const obj = {
  [key]: 'value',
  [`${key}_2`]: 'value2'
};
// { dynamicKey: 'value', dynamicKey_2: 'value2' }
```

### 3. Object Property Shorthand
```javascript
const name = "John";
const age = 30;
const obj = { name, age }; // { name: "John", age: 30 }
```

### 4. Method Shorthand
```javascript
const obj = {
  // Old way
  greet: function() { return "Hello"; },
  
  // Shorthand
  sayHi() { return "Hi"; }
};
```

### 5. Delete Operator
```javascript
const obj = { name: "John", age: 30 };
delete obj.age; // Returns true
console.log(obj); // { name: "John" }

// Can't delete non-configurable properties
Object.defineProperty(obj, 'locked', {
  value: 'secret',
  configurable: false
});
delete obj.locked; // Returns false (throws in strict mode)
```

### 6. Object Reference vs Value
```javascript
const obj1 = { a: 1 };
const obj2 = obj1; // Same reference
obj2.a = 2;
console.log(obj1.a); // 2

const obj3 = { a: 1 };
console.log(obj1 === obj3); // false (different references)
```

### 7. null Prototype Object
```javascript
const obj = Object.create(null);
// No inherited properties at all!
obj.toString(); // TypeError - no toString method
```

### 8. Optional Chaining & Nullish Coalescing
```javascript
const obj = { user: { name: "John" } };
obj.user?.name; // "John"
obj.admin?.name; // undefined (no error)

const value = obj.missing ?? "default"; // "default"
```

### 9. Object Mutation in Functions
```javascript
function modify(obj) {
  obj.name = "Changed"; // Mutates original
  obj = { name: "New" }; // Reassignment (doesn't affect original)
}

const original = { name: "Original" };
modify(original);
console.log(original.name); // "Changed"
```

### 10. Common Interview Question: Flatten Object
```javascript
function flattenObject(obj, prefix = '') {
  return Object.keys(obj).reduce((acc, key) => {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      Object.assign(acc, flattenObject(obj[key], newKey));
    } else {
      acc[newKey] = obj[key];
    }
    return acc;
  }, {});
}

const nested = { a: { b: { c: 1 } }, d: 2 };
flattenObject(nested); // { 'a.b.c': 1, d: 2 }
```

---

## Quick Reference Table

| Method | Returns | Mutates | Inherited Properties |
|--------|---------|---------|---------------------|
| `Object.keys()` | Array | No | No |
| `Object.values()` | Array | No | No |
| `Object.entries()` | Array | No | No |
| `Object.assign()` | Object | Yes (target) | No |
| `Object.freeze()` | Object | Yes | N/A |
| `Object.seal()` | Object | Yes | N/A |
| `for...in` | N/A | No | Yes |
| `Object.create()` | Object | No | Sets prototype |
| `Object.hasOwn()` | Boolean | No | No |

---

## Performance Tips

1. **Avoid `Object.setPrototypeOf()`** - very slow
2. **Use `Object.create()` for prototype setup**
3. **`Object.hasOwn()` > `hasOwnProperty()`**
4. **Freeze/seal are permanent** - use carefully
5. **Property access is fast** - don't over-optimize

---

## Modern Features (ES2020+)

```javascript
// Optional chaining
obj?.prop?.nested;

// Nullish coalescing
const value = obj.prop ?? "default";

// Object.fromEntries
const obj = Object.fromEntries([['a', 1], ['b', 2]]);

// Object.hasOwn (ES2022)
Object.hasOwn(obj, 'prop');

// structuredClone (deep copy)
const clone = structuredClone(obj);
```

---

## Practice Interview Questions

1. **What's the difference between `Object.freeze()` and `Object.seal()`?**
2. **How do you deep clone an object?**
3. **What's the difference between `in` operator and `hasOwnProperty()`?**
4. **Explain the prototype chain.**
5. **What happens when you delete a non-configurable property?**
6. **How does property enumeration work?**
7. **What's the difference between `Object.keys()` and `for...in`?**
8. **How do you prevent object modification?**
9. **What are property descriptors?**
10. **How does `this` work in object methods?**

Master these concepts and you'll be interview-ready! 🚀