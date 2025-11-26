# Essential CSS Concepts for Interviews: Complete Guide

## Table of Contents
1. CSS Specificity & Cascade
2. Box Model
3. Positioning
4. Display Property
5. CSS Selectors
6. Pseudo-classes & Pseudo-elements
7. CSS Units
8. Responsive Design
9. CSS Variables
10. Z-index & Stacking Context
11. CSS Methodologies
12. Modern CSS Features
13. Performance & Optimization
14. Common Interview Questions

---

## Chapter 1: CSS Specificity & Cascade

### 1.1 The Cascade

CSS stands for **Cascading** Style Sheets. When multiple rules target the same element, CSS uses these factors to determine which rule wins:

1. **Importance** (!important)
2. **Specificity** (how specific the selector is)
3. **Source Order** (last rule wins if specificity is equal)

### 1.2 Specificity Calculator

Specificity is calculated as: **(inline, IDs, classes/attributes/pseudo-classes, elements/pseudo-elements)**

```
Inline styles        = 1,0,0,0
IDs                  = 0,1,0,0
Classes/Attributes   = 0,0,1,0
Elements             = 0,0,0,1
```

**Examples:**

```css
/* Specificity: 0,0,0,1 */
p { color: red; }

/* Specificity: 0,0,1,0 */
.text { color: blue; }

/* Specificity: 0,1,0,0 */
#header { color: green; }

/* Specificity: 0,0,1,1 */
p.text { color: orange; }

/* Specificity: 0,1,1,1 */
#header p.text { color: purple; }

/* Specificity: 1,0,0,0 */
<p style="color: pink;">...</p>

/* Overrides everything */
p { color: red !important; }
```

### 1.3 Specificity Practice

```css
/* What color will the paragraph be? */

p { color: red; }                    /* 0,0,0,1 */
.container p { color: blue; }        /* 0,0,1,1 - WINS */
#main p { color: green; }            /* 0,1,0,1 - WINS */
div#main p.text { color: orange; }   /* 0,1,1,2 - WINS */

/* Answer: orange */
```

### 1.4 !important

```css
/* Avoid !important in normal code */
.button { 
  background: blue !important; 
}

/* When to use !important: */
/* 1. Utility classes */
.hidden { display: none !important; }
.text-center { text-align: center !important; }

/* 2. Overriding inline styles */
/* 3. Overriding third-party libraries */
```

**Interview Question:** *Why should you avoid !important?*
- Makes debugging harder
- Breaks the natural cascade
- Creates specificity wars
- Hard to override later

### 1.5 Inheritance

Some properties inherit from parent elements, others don't.

```css
/* Inherited properties */
color
font-family
font-size
font-weight
line-height
text-align
visibility

/* Non-inherited properties */
margin
padding
border
background
width
height
position
display
```

**Control inheritance:**

```css
.child {
  color: inherit;      /* Force inheritance */
  margin: initial;     /* Reset to default */
  padding: unset;      /* Inherit if possible, otherwise initial */
  border: revert;      /* Browser default */
}
```

### 1.6 CSS Origin Priority

1. **User agent styles** (browser defaults)
2. **User styles** (user preferences)
3. **Author styles** (your CSS)
4. **Author !important**
5. **User !important**
6. **User agent !important**

---

## Chapter 2: Box Model

### 2.1 The CSS Box Model

Every element is a rectangular box with:

```
┌─────────────────────────────────┐
│         Margin (transparent)     │
│  ┌───────────────────────────┐  │
│  │    Border                 │  │
│  │  ┌─────────────────────┐  │  │
│  │  │    Padding          │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   Content     │  │  │  │
│  │  │  │   (width x    │  │  │  │
│  │  │  │    height)    │  │  │  │
│  │  │  └───────────────┘  │  │  │
│  │  └─────────────────────┘  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### 2.2 box-sizing

**Critical property!** Changes how width/height are calculated.

```css
/* content-box (default) */
.element {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  border: 10px solid;
  /* Total width = 200 + 40 + 20 = 260px */
}

/* border-box (recommended) */
.element {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 10px solid;
  /* Total width = 200px (includes padding & border) */
}
```

**Best Practice - Use border-box globally:**

```css
*, *::before, *::after {
  box-sizing: border-box;
}
```

### 2.3 Margin Collapse

**Vertical margins collapse!** Horizontal margins don't.

```css
/* Top margin: 30px, Bottom margin: 20px */
.element1 {
  margin-bottom: 30px;
}

.element2 {
  margin-top: 20px;
}

/* Space between = 30px (not 50px!)
   The larger margin wins */
```

**Preventing margin collapse:**

```css
/* Methods to prevent collapse */
1. Add border or padding
2. Use flexbox or grid on parent
3. Add overflow: hidden to parent
4. Float the elements
5. Position: absolute
```

**Example:**

```css
.container {
  overflow: hidden; /* Prevents margin collapse */
}

.child {
  margin-top: 20px;
}
```

### 2.4 Negative Margins

```css
.element {
  margin-top: -20px;   /* Pulls element up */
  margin-left: -20px;  /* Pulls element left */
}

/* Use cases: */
/* 1. Overlapping elements */
/* 2. Breaking out of containers */
/* 3. Centering with position absolute */
```

### 2.5 Auto Margins

```css
/* Horizontal centering */
.center {
  width: 300px;
  margin: 0 auto;
}

/* Vertical centering (with flex/grid parent) */
.flex-container {
  display: flex;
}

.flex-item {
  margin: auto; /* Centers both ways */
}
```

---

## Chapter 3: Positioning

### 3.1 Position Values

```css
position: static;     /* Default: normal flow */
position: relative;   /* Relative to normal position */
position: absolute;   /* Relative to nearest positioned ancestor */
position: fixed;      /* Relative to viewport */
position: sticky;     /* Hybrid: relative + fixed */
```

### 3.2 position: static

Default value. Elements follow normal document flow.

```css
.element {
  position: static;
  /* top, right, bottom, left have no effect */
}
```

### 3.3 position: relative

Element positioned relative to its normal position.

```css
.element {
  position: relative;
  top: 10px;    /* Moves 10px down from normal position */
  left: 20px;   /* Moves 20px right from normal position */
  /* Space in normal flow is preserved! */
}
```

**Use cases:**
- Creating positioning context for absolute children
- Small adjustments without affecting layout
- Z-index stacking

### 3.4 position: absolute

Element removed from normal flow, positioned relative to nearest **positioned ancestor** (not static).

```css
.parent {
  position: relative; /* Creates positioning context */
}

.child {
  position: absolute;
  top: 0;
  right: 0;
  /* Positioned relative to .parent */
}
```

**Centering with absolute:**

```css
/* Method 1: Transform */
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Method 2: Margin auto */
.center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 200px;
  height: 100px;
  margin: auto;
}
```

**Stretching with absolute:**

```css
.fullsize {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* Fills entire parent */
}
```

### 3.5 position: fixed

Positioned relative to viewport. Stays in place when scrolling.

```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  /* Stays at top when scrolling */
}

/* Common: Sticky header */
.sticky-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

/* Remember: Fixed elements are removed from flow
   Add padding-top to body to prevent content overlap */
body {
  padding-top: 60px; /* Height of fixed header */
}
```

### 3.6 position: sticky

**Most misunderstood!** Acts relative until scroll threshold, then fixed.

```css
.sticky {
  position: sticky;
  top: 20px; /* Sticks 20px from top of container */
  /* Must specify threshold: top, bottom, left, or right */
}
```

**Important requirements:**
1. Must specify threshold (top/bottom/left/right)
2. Parent must have scrollable overflow
3. Element must have room to move within parent
4. Parent can't have overflow: hidden

**Example: Sticky table header**

```css
.table-container {
  overflow-y: auto;
  height: 400px;
}

thead th {
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
}
```

### 3.7 Positioning Interview Questions

**Q: What's the difference between absolute and fixed?**
```css
/* Absolute: relative to positioned ancestor */
/* Fixed: relative to viewport */

.absolute {
  position: absolute; /* Scrolls with page */
}

.fixed {
  position: fixed; /* Doesn't scroll */
}
```

**Q: How to center an absolute element?**
```css
/* Answer 1: Transform */
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);

/* Answer 2: Margin auto */
position: absolute;
top: 0; left: 0; right: 0; bottom: 0;
margin: auto;
width: fit-content; /* or specific width */
```

---

## Chapter 4: Display Property

### 4.1 Display Values

```css
display: block;         /* Full width, new line */
display: inline;        /* Width of content, same line */
display: inline-block;  /* Inline with block properties */
display: none;          /* Removes from DOM */
display: flex;          /* Flex container */
display: grid;          /* Grid container */
display: inline-flex;   /* Inline flex container */
display: inline-grid;   /* Inline grid container */
display: contents;      /* Element disappears, children remain */
display: table;         /* Acts like <table> */
display: list-item;     /* Acts like <li> */
```

### 4.2 Block vs Inline

**Block elements:**
```css
/* Full width, starts new line */
div, p, h1-h6, ul, ol, li, section, article, header, footer, form

.block {
  display: block;
  width: 100%;        /* Takes full width */
  margin: 10px 0;     /* All margins work */
  padding: 10px;      /* All padding works */
}
```

**Inline elements:**
```css
/* Only as wide as content, same line */
span, a, strong, em, img, input, button

.inline {
  display: inline;
  width: 200px;           /* ❌ Doesn't work */
  height: 100px;          /* ❌ Doesn't work */
  margin: 10px 0;         /* ❌ Vertical margin doesn't work */
  margin: 0 10px;         /* ✅ Horizontal margin works */
  padding: 10px;          /* ⚠️ Works but may overlap */
}
```

### 4.3 inline-block

Best of both worlds!

```css
.inline-block {
  display: inline-block;
  width: 200px;        /* ✅ Works */
  height: 100px;       /* ✅ Works */
  margin: 10px;        /* ✅ All margins work */
  padding: 10px;       /* ✅ All padding works */
  /* Sits on same line as other inline elements */
}
```

**Use cases:**
- Navigation items
- Buttons in a row
- Image galleries
- Cards that wrap

**Gotcha: Whitespace gap**
```html
<div class="item">1</div>
<div class="item">2</div>
<!-- Space between divs creates gap! -->
```

**Solutions:**
```css
/* Solution 1: Remove HTML whitespace */
<div class="item">1</div><div class="item">2</div>

/* Solution 2: Font size on parent */
.parent {
  font-size: 0;
}
.item {
  font-size: 16px;
}

/* Solution 3: Use Flexbox instead */
.parent {
  display: flex;
}
```

### 4.4 display: none vs visibility: hidden

```css
/* display: none */
.hidden {
  display: none;
  /* Completely removed from layout
     No space reserved
     Not accessible to screen readers */
}

/* visibility: hidden */
.invisible {
  visibility: hidden;
  /* Space still reserved
     Invisible but affects layout
     Not accessible to screen readers */
}

/* opacity: 0 */
.transparent {
  opacity: 0;
  /* Space reserved
     Invisible but affects layout
     Still accessible to screen readers
     Still receives events (clicks, etc.) */
}
```

**Interview question: Which to use?**
```css
/* Toggle content: display: none */
.modal { display: none; }
.modal.open { display: block; }

/* Fade animation: opacity */
.fade {
  opacity: 0;
  transition: opacity 0.3s;
}
.fade.show {
  opacity: 1;
}

/* Accessibility: visibility or opacity */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
```

### 4.5 display: contents

Element's box disappears, but children remain.

```css
.wrapper {
  display: contents;
  /* The .wrapper box doesn't exist in layout
     Children behave as if they're direct children of grandparent */
}
```

**Use case: Grid/Flex subgrid behavior**

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.group {
  display: contents; /* Group doesn't break grid layout */
}

.item {
  /* Items in .group participate in grid directly */
}
```

---

## Chapter 5: CSS Selectors

### 5.1 Basic Selectors

```css
/* Universal selector */
* { margin: 0; }

/* Type selector */
p { color: blue; }

/* Class selector */
.button { padding: 10px; }

/* ID selector */
#header { height: 60px; }

/* Attribute selector */
[type="text"] { border: 1px solid #ccc; }
```

### 5.2 Combinators

```css
/* Descendant (space) - all descendants */
.parent .child { color: red; }

/* Child (>) - direct children only */
.parent > .child { color: blue; }

/* Adjacent sibling (+) - immediate next sibling */
h2 + p { margin-top: 0; }

/* General sibling (~) - all following siblings */
h2 ~ p { color: gray; }
```

**Visual:**

```html
<div class="parent">
  <div class="child">Direct child</div>
  <div>
    <div class="child">Descendant (not direct child)</div>
  </div>
</div>

<style>
/* Selects both */
.parent .child { }

/* Selects only first */
.parent > .child { }
</style>
```

### 5.3 Attribute Selectors

```css
/* Has attribute */
[disabled] { opacity: 0.5; }

/* Exact value */
[type="text"] { }

/* Contains value */
[class*="btn"] { }    /* class contains "btn" */

/* Starts with */
[class^="btn"] { }    /* class starts with "btn" */

/* Ends with */
[class$="btn"] { }    /* class ends with "btn" */

/* Space-separated list contains */
[class~="active"] { } /* class="btn active" matches */

/* Hyphen-separated starts with */
[lang|="en"] { }      /* lang="en-US" matches */
```

**Practical examples:**

```css
/* External links */
a[href^="http"] { }
a[href^="https://external.com"] { }

/* Email links */
a[href^="mailto:"] { }

/* File types */
a[href$=".pdf"]::after { content: " (PDF)"; }
a[href$=".doc"]::after { content: " (DOC)"; }

/* Form inputs */
input[type="text"],
input[type="email"],
input[type="password"] { }

/* Custom data attributes */
[data-status="active"] { }
[data-priority="high"] { }
```

### 5.4 Pseudo-classes

**User interaction:**

```css
:hover          /* Mouse over */
:active         /* Being clicked */
:focus          /* Has keyboard focus */
:focus-visible  /* Focus via keyboard (not mouse) */
:focus-within   /* Contains focused element */
```

**Form states:**

```css
:disabled       /* Disabled input */
:enabled        /* Enabled input */
:checked        /* Checked checkbox/radio */
:indeterminate  /* Indeterminate checkbox */
:valid          /* Valid form input */
:invalid        /* Invalid form input */
:required       /* Required input */
:optional       /* Optional input */
:read-only      /* Read-only input */
:read-write     /* Editable input */
:placeholder-shown  /* Shows placeholder */
```

**Structural:**

```css
:first-child    /* First child of parent */
:last-child     /* Last child of parent */
:nth-child(n)   /* Nth child */
:nth-last-child(n)  /* Nth from end */
:only-child     /* Only child of parent */

:first-of-type  /* First of its type */
:last-of-type   /* Last of its type */
:nth-of-type(n) /* Nth of its type */
:only-of-type   /* Only one of its type */

:empty          /* No children (even text) */
:not(selector)  /* Not matching selector */
:is(selector)   /* Matches any selector in list */
:where(selector) /* Same as :is() but 0 specificity */
:has(selector)  /* Contains matching element */
```

**:nth-child() patterns:**

```css
/* Specific */
:nth-child(3) { }        /* 3rd child */

/* Even/odd */
:nth-child(even) { }     /* 2, 4, 6, 8... */
:nth-child(odd) { }      /* 1, 3, 5, 7... */

/* Formula: an+b */
:nth-child(2n) { }       /* Every 2nd: 2, 4, 6, 8... */
:nth-child(2n+1) { }     /* Every 2nd starting at 1: 1, 3, 5, 7... */
:nth-child(3n) { }       /* Every 3rd: 3, 6, 9, 12... */
:nth-child(3n+1) { }     /* Every 3rd starting at 1: 1, 4, 7, 10... */
:nth-child(n+3) { }      /* 3rd and after: 3, 4, 5, 6... */
:nth-child(-n+3) { }     /* First 3: 1, 2, 3 */

/* Combination */
:nth-child(even):hover { }
```

**Modern pseudo-classes:**

```css
/* :is() - Specificity of highest argument */
:is(h1, h2, h3) { }
/* Same as: h1, h2, h3 { } */

/* :where() - Always 0 specificity */
:where(h1, h2, h3) { }
/* Easier to override */

/* :has() - Parent selector! */
.card:has(img) { }           /* Card that contains img */
.article:has(> h2) { }       /* Article with direct h2 child */
form:has(:invalid) { }       /* Form with invalid input */

/* :not() - Exclusion */
button:not(.primary) { }     /* All buttons except .primary */
li:not(:first-child) { }     /* All li except first */
input:not([type="submit"]) { }
```

### 5.5 Pseudo-elements

```css
::before        /* Insert before content */
::after         /* Insert after content */
::first-letter  /* First letter */
::first-line    /* First line */
::selection     /* Selected text */
::placeholder   /* Placeholder text */
::marker        /* List bullet/number */
::backdrop      /* Dialog/fullscreen backdrop */
```

**::before and ::after:**

```css
.element::before {
  content: '';           /* Required! */
  display: block;
  width: 100px;
  height: 100px;
  background: red;
}

/* Common uses: */
/* 1. Icons */
.icon::before {
  content: '★';
}

/* 2. Decorative elements */
.heading::after {
  content: '';
  display: block;
  width: 50px;
  height: 2px;
  background: currentColor;
  margin-top: 10px;
}

/* 3. Clearfix */
.clearfix::after {
  content: '';
  display: table;
  clear: both;
}

/* 4. Overlays */
.overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
}
```

---

## Chapter 6: CSS Units

### 6.1 Absolute Units

```css
px   /* Pixels - most common */
cm   /* Centimeters */
mm   /* Millimeters */
in   /* Inches */
pt   /* Points (1/72 of an inch) */
pc   /* Picas (12 points) */
```

**When to use px:**
- Borders (1px, 2px)
- Box shadows
- When exact size matters
- Small, precise measurements

### 6.2 Relative Units

**Font-relative:**

```css
em   /* Relative to parent font-size */
rem  /* Relative to root (html) font-size */
ex   /* Relative to x-height of font */
ch   /* Relative to width of "0" character */
```

**Viewport-relative:**

```css
vw   /* 1% of viewport width */
vh   /* 1% of viewport height */
vmin /* 1% of smaller viewport dimension */
vmax /* 1% of larger viewport dimension */
```

**Percentage:**

```css
%    /* Relative to parent property */
```

### 6.3 em vs rem

**em - relative to parent font-size:**

```css
/* Compounds! Each level multiplies */
.parent {
  font-size: 16px;
}

.child {
  font-size: 2em;    /* 32px (16 × 2) */
  padding: 1em;      /* 32px (based on own font-size) */
}

.grandchild {
  font-size: 1.5em;  /* 48px (32 × 1.5) - Compounds! */
}
```

**rem - relative to root font-size:**

```css
html {
  font-size: 16px;   /* Base size */
}

.element {
  font-size: 2rem;   /* 32px (16 × 2) */
  margin: 1rem;      /* 16px (16 × 1) */
}

.nested {
  font-size: 1.5rem; /* 24px (16 × 1.5) - No compounding! */
}
```

**Best practice:**

```css
/* Use rem for most things */
.button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  margin: 1rem 0;
}

/* Use em for properties relative to font-size */
.heading {
  font-size: 2rem;
  margin-bottom: 0.5em; /* Relative to heading's font-size */
}
```

### 6.4 Viewport Units

```css
/* Full viewport height */
.hero {
  height: 100vh;
}

/* Half viewport width */
.sidebar {
  width: 50vw;
}

/* Responsive font size */
h1 {
  font-size: 5vw;        /* Scales with viewport */
  font-size: clamp(2rem, 5vw, 4rem); /* Better: with limits */
}

/* Square that fits viewport */
.square {
  width: 50vmin;
  height: 50vmin;
}
```

**Mobile viewport height issue:**

```css
/* Problem: 100vh includes browser UI on mobile */
.fullscreen {
  height: 100vh;  /* Too tall on mobile! */
}

/* Solution 1: Use svh (small viewport height) */
.fullscreen {
  height: 100svh; /* Stable height */
}

/* Solution 2: Use dvh (dynamic viewport height) */
.fullscreen {
  height: 100dvh; /* Adjusts with browser UI */
}

/* Solution 3: JavaScript fallback */
.fullscreen {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
```

### 6.5 Percentage Units

```css
/* Width - relative to parent width */
.child {
  width: 50%;  /* Half of parent width */
}

/* Height - relative to parent height */
/* Only works if parent has explicit height! */
.child {
  height: 50%;  /* Needs parent height */
}

/* Padding/Margin - relative to parent WIDTH (not height!) */
.element {
  padding: 10%;     /* 10% of parent WIDTH */
  margin-top: 5%;   /* 5% of parent WIDTH */
}

/* Font-size - relative to parent font-size */
.text {
  font-size: 120%; /* 1.2 times parent font-size */
}

/* Position - relative to nearest positioned ancestor */
.absolute {
  position: absolute;
  top: 10%;    /* 10% from top */
  left: 50%;   /* 50% from left */
}
```

### 6.6 Modern CSS Functions

```css
/* calc() - calculations */
width: calc(100% - 80px);
font-size: calc(1rem + 2vw);
padding: calc(1em + 5%);

/* clamp() - min, preferred, max */
font-size: clamp(1rem, 2.5vw, 2rem);
/* Never smaller than 1rem
   Prefers 2.5vw
   Never larger than 2rem */

width: clamp(300px, 50%, 800px);

/* min() - smallest value */
width: min(100%, 1200px);
/* Takes full width up to 1200px */

/* max() - largest value */
width: max(50%, 300px);
/* At least 300px, or 50% if larger */
```

### 6.7 Unit Recommendations

```css
/* Font sizes */
html { font-size: 16px; }        /* Base in px */
body { font-size: 1rem; }        /* Use rem */
h1 { font-size: 2.5rem; }        /* Use rem */

/* Spacing */
margin: 1rem;                    /* Use rem */
padding: 0.5rem 1rem;            /* Use rem */
gap: 1.5rem;                     /* Use rem */

/* Layout */
width: 100%;                     /* Percentages */
max-width: 1200px;               /* Fixed max in px */
height: 100vh;                   /* Viewport units */

/* Borders & Shadows */
border: 1px solid;               /* px for small values */
box-shadow: 0 2px 4px;           /* px */

/* Media queries */
@media (min-width: 768px) { }    /* px or em */
```

---

## Chapter 7: Responsive Design

### 7.1 Mobile-First Approach

```css
/* Base styles (mobile) */
.container {
  padding: 1rem;
  font-size: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 1.125rem;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    padding: 3rem;
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

### 7.2 Common Breakpoints

```css
/* Mobile first breakpoints */
/* xs: 0-575px (default, no media query) */

/* Small devices (sm) */
@media (min-width: 576px) { }

/* Medium devices (md) */
@media (min-width: 768px) { }

/* Large devices (lg) */
@media (min-width: 992px) { }

/* Extra large (xl) */
@media (min-width: 1200px) { }

/* Extra extra large (xxl) */
@media (min-width: 1400px) { }
```

**Best practice: Use em in media queries**

```css
/* More accessible - respects user font-size */
@media (min-width: 48em) { }    /* 768px */
@media (min-width: 64em) { }    /* 1024px */
@media (min-width: 75em) { }    /* 1200px */
```

### 7.3 Media Query Features

```css
/* Width */
@media (min-width: 768px) { }
@media (max-width: 767px) { }
@media (width >= 768px) { }     /* New syntax */

/* Height */
@media (min-height: 600px) { }

/* Orientation */
@media (orientation: landscape) { }
@media (orientation: portrait) { }

/* Aspect ratio */
@media (aspect-ratio: 16/9) { }
@media (min-aspect-ratio: 16/9) { }

/* Resolution */
@media (min-resolution: 2dppx) { }  /* Retina displays */
@media (-webkit-min-device-pixel-ratio: 2) { }

/* Dark mode */
@media (prefers-color-scheme: dark) { }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) { }

/* Hover capability */
@media (hover: hover) { }           /* Can hover */
@media (hover: none) { }            /* Touch only */

/* Pointer precision */
@media (pointer: fine) { }          /* Mouse */
@media (pointer: coarse) { }        /* Touch */
```

### 7.4 Container Queries (Modern)

Query based on container size, not viewport!

```css
.container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card-title {
    font-size: 2rem;
  }
}

/* Allows truly reusable components! */
```

### 7.5 Responsive Typography

```css
/* Method 1: Breakpoints */
body {
  font-size: 16px;
}

@media (min-width: 768px) {
  body {
    font-size: 18px;
  }
}

/* Method 2: Viewport units */
body {
  font-size: clamp(1rem, 2vw, 1.5rem);
}

/* Method 3: Fluid typography */
h1 {
  font-size: calc(1.5rem + 1.5vw);
}
```

### 7.6 Responsive Images

```css
/* Make images responsive */
img {
  max-width: 100%;
  height: auto;
}

/* Background images */
.hero {
  background-image: url('mobile.jpg');
  background-size: cover;
  background-position: center;
}

@media (min-width: 768px) {
  .hero {
    background-image: url('desktop.jpg');
  }
}
```

**HTML responsive images:**

```html
<!-- Picture element -->
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Description">
</picture>

<!-- Srcset -->
<img srcset="small.jpg 500w, medium.jpg 1000w, large.jpg 1500w"
     sizes="(min-width: 768px) 50vw, 100vw"
     src="medium.jpg" alt="Description">
```

---

## Chapter 8: CSS Variables (Custom Properties)

### 8.1 Defining Variables

```css
/* Global variables */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size-base: 1rem;
  --spacing-unit: 8px;
  --border-radius: 4px;
}

/* Scoped variables */
.dark-theme {
  --bg-color: #1a1a1a;
  --text-color: #ffffff;
}

.light-theme {
  --bg-color: #ffffff;
  --text-color: #000000;
}
```

### 8.2 Using Variables

```css
/* var() function */
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
  border-radius: var(--border-radius);
}

/* With fallback */
.element {
  color: var(--text-color, black);
  /* Uses black if --text-color not defined */
}

/* Nested variables */
:root {
  --spacing-sm: calc(var(--spacing-unit) * 0.5);
  --spacing-md: var(--spacing-unit);
  --spacing-lg: calc(var(--spacing-unit) * 2);
}
```

### 8.3 Dynamic Variables with JavaScript

```javascript
// Get variable
const color = getComputedStyle(document.documentElement)
  .getPropertyValue('--primary-color');

// Set variable
document.documentElement.style
  .setProperty('--primary-color', '#ff0000');

// Toggle theme
function toggleTheme() {
  const root = document.documentElement;
  const isDark = root.classList.contains('dark-theme');
  
  root.classList.toggle('dark-theme', !isDark);
  root.classList.toggle('light-theme', isDark);
}
```

### 8.4 Practical Use Cases

**Theme system:**

```css
:root {
  --color-primary: #007bff;
  --color-success: #28a745;
  --color-danger: #dc3545;
  --color-warning: #ffc107;
  
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #212529;
  --text-secondary: #6c757d;
}

[data-theme="dark"] {
  --bg-primary: #212529;
  --bg-secondary: #343a40;
  --text-primary: #f8f9fa;
  --text-secondary: #adb5bd;
}
```

**Responsive spacing:**

```css
:root {
  --spacing: 1rem;
}

@media (min-width: 768px) {
  :root {
    --spacing: 1.5rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --spacing: 2rem;
  }
}

.container {
  padding: var(--spacing);
  gap: var(--spacing);
}
```

**Component variations:**

```css
.button {
  --button-bg: var(--color-primary);
  --button-color: white;
  
  background: var(--button-bg);
  color: var(--button-color);
}

.button.secondary {
  --button-bg: var(--color-secondary);
}

.button.outline {
  --button-bg: transparent;
  --button-color: var(--color-primary);
  border: 2px solid var(--color-primary);
}
```

---

## Chapter 9: Z-index & Stacking Context

### 9.1 Understanding Z-index

```css
/* Higher z-index appears on top */
.element-1 {
  position: relative;
  z-index: 1;
}

.element-2 {
  position: relative;
  z-index: 2;  /* Appears above element-1 */
}

/* z-index only works on positioned elements! */
.static {
  z-index: 999;  /* ❌ No effect (position: static) */
}
```

### 9.2 Stacking Context

A stacking context is created by:

```css
/* 1. Root element (html) */

/* 2. Positioned + z-index */
position: relative;
z-index: 1;

/* 3. Flex/Grid items with z-index */
.flex-container { display: flex; }
.flex-item { z-index: 1; }

/* 4. Opacity < 1 */
opacity: 0.99;

/* 5. Transform */
transform: translateZ(0);
transform: rotate(0deg);

/* 6. Filter */
filter: blur(5px);

/* 7. Isolation */
isolation: isolate;

/* 8. Will-change */
will-change: transform;

/* 9. Many others... */
```

### 9.3 Stacking Order (within context)

From back to front:

1. Background and borders of the stacking context
2. Negative z-index children
3. Block-level children (normal flow)
4. Floated children
5. Inline children (normal flow)
6. z-index: 0 or z-index: auto
7. Positive z-index children

### 9.4 Common Z-index Scale

```css
:root {
  --z-negative: -1;
  --z-normal: 1;
  --z-tooltip: 10;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-notification: 700;
}

/* Usage */
.modal {
  z-index: var(--z-modal);
}
```

### 9.5 Z-index Problems & Solutions

**Problem 1: Z-index not working**

```css
/* ❌ Doesn't work */
.element {
  z-index: 999;  /* No position! */
}

/* ✅ Fixed */
.element {
  position: relative;
  z-index: 999;
}
```

**Problem 2: Child can't exceed parent**

```css
/* Parent creates stacking context */
.parent {
  position: relative;
  z-index: 1;
}

.child {
  position: relative;
  z-index: 9999;  /* ❌ Still behind other elements at z-index: 2 */
}

/* Solution: Move child outside or adjust parent */
.parent {
  position: relative;
  /* Remove z-index or use higher value */
}
```

---

## Chapter 10: CSS Methodologies

### 10.1 BEM (Block Element Modifier)

```css
/* Block: Standalone component */
.card { }

/* Element: Part of block */
.card__header { }
.card__body { }
.card__footer { }

/* Modifier: Variation of block/element */
.card--featured { }
.card--large { }
.card__header--blue { }
```

**Example:**

```html
<div class="card card--featured">
  <header class="card__header card__header--blue">
    <h2 class="card__title">Title</h2>
  </header>
  <div class="card__body">
    <p class="card__text">Content</p>
  </div>
  <footer class="card__footer">
    <button class="card__button card__button--primary">Click</button>
  </footer>
</div>
```

```css
.card {
  border: 1px solid #ddd;
  border-radius: 4px;
}

.card--featured {
  border-color: #007bff;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.card__header {
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.card__header--blue {
  background: #007bff;
  color: white;
}

.card__body {
  padding: 1rem;
}

.card__button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
}

.card__button--primary {
  background: #007bff;
  color: white;
}
```

### 10.2 Utility-First (Tailwind-style)

```css
/* Utility classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }

.p-4 { padding: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }

.bg-blue { background: #007bff; }
.text-white { color: white; }
```

**Usage:**

```html
<div class="flex items-center justify-between p-4 bg-blue text-white">
  <h1 class="text-2xl font-bold">Title</h1>
  <button class="px-4 py-2 bg-white text-blue rounded">Click</button>
</div>
```

### 10.3 SMACSS (Scalable and Modular Architecture)

Five categories:

```css
/* 1. Base - element defaults */
body { font-family: sans-serif; }
a { color: blue; }

/* 2. Layout - major sections */
.l-header { }
.l-sidebar { }
.l-main { }

/* 3. Module - reusable components */
.card { }
.button { }
.form { }

/* 4. State - current state */
.is-active { }
.is-hidden { }
.is-loading { }

/* 5. Theme - colors/fonts */
.theme-dark { }
.theme-light { }
```

---

## Chapter 11: Modern CSS Features

### 11.1 CSS Grid (Advanced)

```css
/* Subgrid */
.parent {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.child {
  display: grid;
  grid-column: span 2;
  grid-template-columns: subgrid;
}
```

### 11.2 Container Queries

```css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    flex-direction: row;
  }
}
```

### 11.3 :has() Selector

```css
/* Parent selectors! */
.card:has(img) {
  /* Card with image */
}

.form:has(:invalid) {
  /* Form with invalid input */
}

li:has(+ li.active) {
  /* Li before active li */
}
```

### 11.4 Cascade Layers

```css
@layer base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
}

@layer components {
  .button { padding: 1rem; }
}

@layer utilities {
  .text-center { text-align: center !important; }
}
```

### 11.5 aspect-ratio

```css
.video {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.square {
  aspect-ratio: 1;
}
```

### 11.6 gap for Flexbox

```css
.flex-container {
  display: flex;
  gap: 1rem;  /* Works in flexbox now! */
}
```

---

## Chapter 12: Performance & Optimization

### 12.1 Reduce Reflows

```css
/* ❌ Causes reflow */
.element {
  width: 300px;
  margin: 10px;
}

/* ✅ Better */
.element {
  transform: scale(1.1);  /* Composite only */
}
```

### 12.2 Use will-change Sparingly

```css
/* Only for animated elements */
.animated-element {
  will-change: transform;
}

/* Remove after animation */
element.addEventListener('animationend', () => {
  element.style.willChange = 'auto';
});
```

### 12.3 Optimize Selectors

```css
/* ❌ Slow - reads right to left */
body div.container ul li a { }

/* ✅ Fast - specific class */
.nav-link { }
```

### 12.4 Reduce CSS Size

```css
/* Use shorthand */
/* ❌ Verbose */
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
margin-left: 20px;

/* ✅ Shorthand */
margin: 10px 20px;
```

---

## Chapter 13: Common Interview Questions

### Q1: How does specificity work?

**Answer:** Specificity determines which CSS rule applies when multiple rules target the same element. Calculated as (inline, IDs, classes, elements). Higher specificity wins. If equal, last rule wins.

### Q2: What's the difference between display: none and visibility: hidden?

**Answer:** 
- `display: none` removes element from layout entirely
- `visibility: hidden` hides element but space is preserved
- `opacity: 0` hides visually but element remains interactive

### Q3: Explain the box model.

**Answer:** Every element has content, padding, border, and margin. `box-sizing: border-box` includes padding and border in width/height calculation, making layouts easier.

### Q4: What are pseudo-elements and pseudo-classes?

**Answer:**
- Pseudo-classes (`:hover`, `:nth-child`) select elements in specific states
- Pseudo-elements (`::before`, `::after`) create virtual elements not in DOM

### Q5: How do you center an element?

**Answer:**
```css
/* Horizontal (block) */
margin: 0 auto;
width: fit-content;

/* Flexbox/Grid */
display: flex;
justify-content: center;
align-items: center;

/* Absolute positioning */
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```

### Q6: What's the difference between em and rem?

**Answer:**
- `em`: Relative to parent font-size (compounds)
- `rem`: Relative to root font-size (consistent)
- Use `rem` for most things, `em` for properties relative to element's font-size

### Q7: How does position: sticky work?

**Answer:** Acts as `position: relative` until scroll threshold is reached, then acts as `position: fixed` within its container. Requires threshold value (top/bottom/left/right) and scrollable parent.

### Q8: Explain CSS Grid vs Flexbox.

**Answer:**
- Grid: Two-dimensional (rows AND columns), layout-first
- Flexbox: One-dimensional (row OR column), content-first
- Use both together: Grid for page layout, Flexbox for components

### Q9: What creates a stacking context?

**Answer:** Root element, positioned elements with z-index, opacity < 1, transform, filter, flex/grid items with z-index, and several other properties.

### Q10: How do you handle browser compatibility?

**Answer:**
- Use feature detection (@supports)
- Progressive enhancement
- Vendor prefixes (automated with tools)
- Fallback properties
- Test in multiple browsers
- Use Can I Use website

---

## Additional Study Topics

### Must-Know Concepts
✅ Specificity calculation
✅ Box model & box-sizing
✅ Position (all values)
✅ Display types
✅ Flexbox fundamentals
✅ Grid fundamentals
✅ Responsive design
✅ Media queries
✅ CSS units (especially rem/em)
✅ Pseudo-classes & pseudo-elements
✅ CSS variables
✅ Z-index & stacking context
✅ Transitions & animations
✅ Transform property

### Good to Know
- BEM or other methodology
- Preprocessors (SASS basics)
- Modern features (:has, container queries)
- Performance optimization
- Accessibility considerations
- Cross-browser issues
- CSS architecture patterns

### Practice Tips
1. Build real projects
2. Solve CodePen challenges
3. Recreate designs from Dribbble
4. Practice whiteboard CSS
5. Explain concepts out loud
6. Review common interview questions
7. Build without frameworks first

---

## Resources

**Learn:**
- MDN Web Docs
- CSS-Tricks
- Web.dev

**Practice:**
- CodePen
- CSS Battle
- Frontend Mentor

**Tools:**
- Can I Use (compatibility)
- CSS Specificity Calculator
- Cubic-bezier.com

Good luck with your interviews! 🚀