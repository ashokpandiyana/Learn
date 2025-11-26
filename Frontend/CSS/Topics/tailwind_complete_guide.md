# Complete Tailwind CSS Guide: From Beginner to Advanced

## Latest Version Information
**Current Version:** Tailwind CSS v3.4+ (Check [tailwindcss.com](https://tailwindcss.com) for latest)

**Latest Features:**
- ✨ JIT (Just-In-Time) mode (standard since v3)
- ✨ Modern arbitrary values
- ✨ Container queries
- ✨ Dynamic breakpoints
- ✨ CSS variables support
- ✨ Extended color palette
- ✨ Advanced typography

---

## Table of Contents
1. Introduction to Tailwind CSS
2. Installation & Setup
3. Core Concepts
4. Layout Utilities
5. Spacing & Sizing
6. Typography
7. Colors & Backgrounds
8. Borders & Effects
9. Flexbox & Grid
10. Responsive Design
11. Dark Mode
12. States & Variants
13. Customization
14. Components & Patterns
15. Advanced Techniques
16. Best Practices

---

## Chapter 1: Introduction to Tailwind CSS

### 1.1 What is Tailwind CSS?

Tailwind is a **utility-first CSS framework** that provides low-level utility classes to build custom designs without writing CSS.

**Traditional CSS:**
```css
/* styles.css */
.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
}
```

**Tailwind CSS:**
```html
<button class="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold">
  Click me
</button>
```

### 1.2 Why Use Tailwind?

**Advantages:**
✅ No context switching (HTML + CSS in one place)
✅ Consistent design system built-in
✅ No naming classes (no more "btn-primary-large-v2")
✅ Smaller CSS bundle (with purge/JIT)
✅ Rapid prototyping
✅ Mobile-first responsive design
✅ Easy to customize
✅ Great developer experience

**Disadvantages:**
❌ HTML can look cluttered
❌ Learning curve for utility classes
❌ Repetition (solved with components)
❌ Need build process

### 1.3 Tailwind vs Other Frameworks

```
Bootstrap/Material UI:
- Component-based
- Pre-designed components
- Less flexibility
- Opinionated design

Tailwind:
- Utility-based
- Build your own components
- Maximum flexibility
- Your design, their system
```

---

## Chapter 2: Installation & Setup

### 2.1 Via CDN (Quick Start)

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <h1 class="text-3xl font-bold text-blue-600">
    Hello Tailwind!
  </h1>
</body>
</html>
```

**Note:** CDN is for development only. Use build process for production.

### 2.2 Via npm (Recommended)

```bash
# Install Tailwind
npm install -D tailwindcss

# Initialize config
npx tailwindcss init
```

**tailwind.config.js:**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**CSS file (styles.css):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Build:**
```bash
npx tailwindcss -i ./src/styles.css -o ./dist/output.css --watch
```

### 2.3 With Vite

```bash
npm create vite@latest my-project
cd my-project
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**postcss.config.js:**
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

### 2.4 With Next.js

```bash
npx create-next-app@latest my-app --typescript --tailwind
```

Tailwind is already configured!

---

## Chapter 3: Core Concepts

### 3.1 Utility-First Philosophy

Instead of writing custom CSS, you compose utilities:

```html
<!-- Traditional approach -->
<div class="card">
  <h2 class="card-title">Title</h2>
  <p class="card-description">Description</p>
</div>

<style>
.card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.card-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}
</style>

<!-- Tailwind approach -->
<div class="bg-white rounded-lg p-6 shadow-md">
  <h2 class="text-2xl font-bold mb-2">Title</h2>
  <p class="text-gray-600">Description</p>
</div>
```

### 3.2 Design System

Tailwind includes a comprehensive design system:

**Spacing Scale (0.25rem = 4px increments):**
```
0  = 0px
1  = 0.25rem (4px)
2  = 0.5rem (8px)
3  = 0.75rem (12px)
4  = 1rem (16px)
5  = 1.25rem (20px)
6  = 1.5rem (24px)
8  = 2rem (32px)
10 = 2.5rem (40px)
12 = 3rem (48px)
16 = 4rem (64px)
20 = 5rem (80px)
24 = 6rem (96px)
32 = 8rem (128px)
```

**Color Palette:**
```
50  - Lightest
100
200
300
400
500 - Base
600
700
800
900
950 - Darkest
```

### 3.3 Class Naming Convention

```
{property}{side?}-{value}

Examples:
p-4        → padding: 1rem (all sides)
pt-4       → padding-top: 1rem
px-4       → padding-left and padding-right: 1rem
py-4       → padding-top and padding-bottom: 1rem

m-4        → margin: 1rem
mt-4       → margin-top: 1rem
mx-auto    → margin-left and margin-right: auto

text-center    → text-align: center
font-bold      → font-weight: 700
bg-blue-500    → background-color: #3b82f6
```

### 3.4 Arbitrary Values

Use square brackets for custom values:

```html
<!-- Custom values -->
<div class="w-[137px]">Custom width</div>
<div class="bg-[#1da1f2]">Custom color</div>
<div class="p-[13px]">Custom padding</div>
<div class="top-[117px]">Custom position</div>

<!-- CSS variables -->
<div class="bg-[var(--my-color)]">Variable color</div>

<!-- Calculations -->
<div class="w-[calc(100%-4rem)]">Calculated width</div>
```

---

## Chapter 4: Layout Utilities

### 4.1 Container

Centers content with max-width:

```html
<div class="container mx-auto">
  <!-- Centered content with responsive max-width -->
</div>

<!-- With padding -->
<div class="container mx-auto px-4">
  Content
</div>
```

**Breakpoint max-widths:**
```
Default: 100%
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### 4.2 Display

```html
<!-- Block -->
<div class="block">Block element</div>

<!-- Inline Block -->
<span class="inline-block">Inline block</span>

<!-- Inline -->
<span class="inline">Inline</span>

<!-- Flex -->
<div class="flex">Flex container</div>

<!-- Inline Flex -->
<div class="inline-flex">Inline flex</div>

<!-- Grid -->
<div class="grid">Grid container</div>

<!-- Hidden -->
<div class="hidden">Not displayed</div>
```

### 4.3 Position

```html
<!-- Static (default) -->
<div class="static">Static</div>

<!-- Relative -->
<div class="relative top-4 left-4">
  Relative positioning
</div>

<!-- Absolute -->
<div class="relative">
  <div class="absolute top-0 right-0">
    Absolute child
  </div>
</div>

<!-- Fixed -->
<div class="fixed top-0 left-0 right-0">
  Fixed header
</div>

<!-- Sticky -->
<div class="sticky top-0">
  Sticky header
</div>
```

**Position utilities:**
```html
<!-- All sides -->
<div class="absolute inset-0">Full size</div>

<!-- Individual sides -->
<div class="absolute top-4 right-4">Top right</div>
<div class="absolute bottom-0 left-0">Bottom left</div>

<!-- Negative values -->
<div class="relative -top-4">Negative offset</div>
```

### 4.4 Top / Right / Bottom / Left

```html
<div class="absolute top-0">top: 0</div>
<div class="absolute top-1">top: 0.25rem</div>
<div class="absolute top-1/2">top: 50%</div>
<div class="absolute top-full">top: 100%</div>

<!-- Auto -->
<div class="absolute left-auto">left: auto</div>

<!-- Negative -->
<div class="relative -top-4">Negative margin effect</div>
```

### 4.5 Z-Index

```html
<div class="z-0">z-index: 0</div>
<div class="z-10">z-index: 10</div>
<div class="z-20">z-index: 20</div>
<div class="z-30">z-index: 30</div>
<div class="z-40">z-index: 40</div>
<div class="z-50">z-index: 50</div>
<div class="z-auto">z-index: auto</div>

<!-- Custom -->
<div class="z-[999]">z-index: 999</div>
```

### 4.6 Overflow

```html
<!-- Overflow -->
<div class="overflow-auto">Auto scroll</div>
<div class="overflow-hidden">Hide overflow</div>
<div class="overflow-visible">Show overflow</div>
<div class="overflow-scroll">Always scroll</div>

<!-- Overflow X/Y -->
<div class="overflow-x-auto">Horizontal scroll</div>
<div class="overflow-y-auto">Vertical scroll</div>

<!-- Overflow scrolling -->
<div class="overscroll-contain">Prevent scroll chaining</div>
```

---

## Chapter 5: Spacing & Sizing

### 5.1 Padding

```html
<!-- All sides -->
<div class="p-4">padding: 1rem</div>
<div class="p-8">padding: 2rem</div>

<!-- Horizontal (x-axis) -->
<div class="px-4">padding-left & padding-right: 1rem</div>

<!-- Vertical (y-axis) -->
<div class="py-4">padding-top & padding-bottom: 1rem</div>

<!-- Individual sides -->
<div class="pt-4">padding-top: 1rem</div>
<div class="pr-4">padding-right: 1rem</div>
<div class="pb-4">padding-bottom: 1rem</div>
<div class="pl-4">padding-left: 1rem</div>

<!-- Different values -->
<div class="pt-4 pr-6 pb-4 pl-6">
  Custom padding each side
</div>
```

### 5.2 Margin

```html
<!-- All sides -->
<div class="m-4">margin: 1rem</div>

<!-- Horizontal/Vertical -->
<div class="mx-4">margin-left & margin-right: 1rem</div>
<div class="my-4">margin-top & margin-bottom: 1rem</div>

<!-- Auto (centering) -->
<div class="mx-auto">margin: 0 auto (centered)</div>

<!-- Negative margins -->
<div class="-mt-4">margin-top: -1rem</div>
<div class="-ml-4">margin-left: -1rem</div>

<!-- Individual sides -->
<div class="mt-4">margin-top: 1rem</div>
<div class="mr-4">margin-right: 1rem</div>
<div class="mb-4">margin-bottom: 1rem</div>
<div class="ml-4">margin-left: 1rem</div>
```

### 5.3 Space Between

Gap between children:

```html
<!-- Horizontal spacing -->
<div class="flex space-x-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Vertical spacing -->
<div class="flex flex-col space-y-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Negative space -->
<div class="flex -space-x-4">
  <div>Overlapping</div>
  <div>Items</div>
</div>
```

### 5.4 Width

```html
<!-- Fixed widths -->
<div class="w-64">width: 16rem (256px)</div>
<div class="w-96">width: 24rem (384px)</div>

<!-- Fractions -->
<div class="w-1/2">width: 50%</div>
<div class="w-1/3">width: 33.333%</div>
<div class="w-2/3">width: 66.666%</div>
<div class="w-1/4">width: 25%</div>
<div class="w-3/4">width: 75%</div>

<!-- Full & Screen -->
<div class="w-full">width: 100%</div>
<div class="w-screen">width: 100vw</div>

<!-- Auto & Min/Max content -->
<div class="w-auto">width: auto</div>
<div class="w-min">width: min-content</div>
<div class="w-max">width: max-content</div>
<div class="w-fit">width: fit-content</div>

<!-- Min/Max width -->
<div class="min-w-0">min-width: 0</div>
<div class="min-w-full">min-width: 100%</div>
<div class="max-w-xs">max-width: 20rem</div>
<div class="max-w-sm">max-width: 24rem</div>
<div class="max-w-md">max-width: 28rem</div>
<div class="max-w-lg">max-width: 32rem</div>
<div class="max-w-xl">max-width: 36rem</div>
<div class="max-w-2xl">max-width: 42rem</div>
<div class="max-w-7xl">max-width: 80rem</div>

<!-- Custom -->
<div class="w-[137px]">width: 137px</div>
```

### 5.5 Height

```html
<!-- Fixed heights -->
<div class="h-64">height: 16rem</div>
<div class="h-96">height: 24rem</div>

<!-- Full & Screen -->
<div class="h-full">height: 100%</div>
<div class="h-screen">height: 100vh</div>

<!-- Dynamic viewport (new in v3.4+) -->
<div class="h-dvh">height: 100dvh (dynamic)</div>
<div class="h-svh">height: 100svh (small)</div>
<div class="h-lvh">height: 100lvh (large)</div>

<!-- Min/Max height -->
<div class="min-h-screen">min-height: 100vh</div>
<div class="max-h-96">max-height: 24rem</div>
```

---

## Chapter 6: Typography

### 6.1 Font Family

```html
<p class="font-sans">Sans-serif font</p>
<p class="font-serif">Serif font</p>
<p class="font-mono">Monospace font</p>
```

### 6.2 Font Size

```html
<p class="text-xs">0.75rem (12px)</p>
<p class="text-sm">0.875rem (14px)</p>
<p class="text-base">1rem (16px)</p>
<p class="text-lg">1.125rem (18px)</p>
<p class="text-xl">1.25rem (20px)</p>
<p class="text-2xl">1.5rem (24px)</p>
<p class="text-3xl">1.875rem (30px)</p>
<p class="text-4xl">2.25rem (36px)</p>
<p class="text-5xl">3rem (48px)</p>
<p class="text-6xl">3.75rem (60px)</p>
<p class="text-7xl">4.5rem (72px)</p>
<p class="text-8xl">6rem (96px)</p>
<p class="text-9xl">8rem (128px)</p>

<!-- Custom -->
<p class="text-[32px]">32px</p>
```

### 6.3 Font Weight

```html
<p class="font-thin">100</p>
<p class="font-extralight">200</p>
<p class="font-light">300</p>
<p class="font-normal">400</p>
<p class="font-medium">500</p>
<p class="font-semibold">600</p>
<p class="font-bold">700</p>
<p class="font-extrabold">800</p>
<p class="font-black">900</p>
```

### 6.4 Text Alignment

```html
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
<p class="text-justify">Justified text</p>
```

### 6.5 Text Color

```html
<!-- Gray scale -->
<p class="text-black">Black</p>
<p class="text-white">White</p>
<p class="text-gray-500">Gray</p>

<!-- Colors -->
<p class="text-red-500">Red</p>
<p class="text-blue-500">Blue</p>
<p class="text-green-500">Green</p>
<p class="text-yellow-500">Yellow</p>
<p class="text-purple-500">Purple</p>
<p class="text-pink-500">Pink</p>

<!-- Opacity -->
<p class="text-black/50">50% opacity</p>
<p class="text-blue-500/75">75% opacity</p>

<!-- Custom -->
<p class="text-[#1da1f2]">Custom color</p>
```

### 6.6 Text Decoration

```html
<p class="underline">Underlined text</p>
<p class="overline">Overlined text</p>
<p class="line-through">Strikethrough</p>
<p class="no-underline">No decoration</p>

<!-- Decoration style -->
<p class="underline decoration-solid">Solid underline</p>
<p class="underline decoration-double">Double underline</p>
<p class="underline decoration-dotted">Dotted underline</p>
<p class="underline decoration-dashed">Dashed underline</p>
<p class="underline decoration-wavy">Wavy underline</p>

<!-- Decoration color -->
<p class="underline decoration-blue-500">Blue underline</p>

<!-- Decoration thickness -->
<p class="underline decoration-1">1px underline</p>
<p class="underline decoration-2">2px underline</p>
<p class="underline decoration-4">4px underline</p>
```

### 6.7 Text Transform

```html
<p class="uppercase">UPPERCASE TEXT</p>
<p class="lowercase">lowercase text</p>
<p class="capitalize">Capitalize Each Word</p>
<p class="normal-case">Normal case</p>
```

### 6.8 Line Height

```html
<p class="leading-none">line-height: 1</p>
<p class="leading-tight">line-height: 1.25</p>
<p class="leading-snug">line-height: 1.375</p>
<p class="leading-normal">line-height: 1.5</p>
<p class="leading-relaxed">line-height: 1.625</p>
<p class="leading-loose">line-height: 2</p>

<!-- Fixed -->
<p class="leading-3">line-height: 0.75rem</p>
<p class="leading-10">line-height: 2.5rem</p>
```

### 6.9 Letter Spacing

```html
<p class="tracking-tighter">letter-spacing: -0.05em</p>
<p class="tracking-tight">letter-spacing: -0.025em</p>
<p class="tracking-normal">letter-spacing: 0</p>
<p class="tracking-wide">letter-spacing: 0.025em</p>
<p class="tracking-wider">letter-spacing: 0.05em</p>
<p class="tracking-widest">letter-spacing: 0.1em</p>
```

### 6.10 Text Overflow

```html
<!-- Truncate -->
<p class="truncate">
  Very long text that will be cut off with ellipsis...
</p>

<!-- Ellipsis (requires: overflow-hidden) -->
<p class="overflow-hidden text-ellipsis">
  Long text...
</p>

<!-- Clip -->
<p class="overflow-hidden text-clip">
  Text clipped without ellipsis
</p>

<!-- Multi-line truncate -->
<p class="line-clamp-2">
  Long text that will show only 2 lines and then truncate with ellipsis...
</p>
<p class="line-clamp-3">3 line clamp</p>
```

### 6.11 Whitespace

```html
<p class="whitespace-normal">Normal whitespace</p>
<p class="whitespace-nowrap">No wrap</p>
<p class="whitespace-pre">Preserve    spaces</p>
<p class="whitespace-pre-line">Pre with line wrap</p>
<p class="whitespace-pre-wrap">Pre with wrap</p>
```

### 6.12 Word Break

```html
<p class="break-normal">Normal break</p>
<p class="break-words">Break words if needed</p>
<p class="break-all">Break all characters</p>
```

---

## Chapter 7: Colors & Backgrounds

### 7.1 Background Color

```html
<!-- Solid colors -->
<div class="bg-white">White background</div>
<div class="bg-black">Black background</div>
<div class="bg-gray-100">Light gray</div>
<div class="bg-gray-900">Dark gray</div>

<!-- Color palette -->
<div class="bg-red-500">Red</div>
<div class="bg-blue-500">Blue</div>
<div class="bg-green-500">Green</div>
<div class="bg-yellow-500">Yellow</div>
<div class="bg-purple-500">Purple</div>
<div class="bg-pink-500">Pink</div>
<div class="bg-indigo-500">Indigo</div>
<div class="bg-cyan-500">Cyan</div>
<div class="bg-teal-500">Teal</div>
<div class="bg-orange-500">Orange</div>

<!-- With opacity -->
<div class="bg-blue-500/50">50% opacity</div>
<div class="bg-black/25">25% opacity</div>

<!-- Transparent -->
<div class="bg-transparent">Transparent</div>

<!-- Custom -->
<div class="bg-[#1da1f2]">Custom color</div>
```

### 7.2 Gradient Backgrounds

```html
<!-- Linear gradients -->
<div class="bg-gradient-to-r from-blue-500 to-purple-500">
  Left to right gradient
</div>

<div class="bg-gradient-to-b from-red-500 to-yellow-500">
  Top to bottom gradient
</div>

<div class="bg-gradient-to-tr from-green-400 to-blue-500">
  Top-right diagonal
</div>

<!-- Directions -->
<!-- to-t, to-tr, to-r, to-br, to-b, to-bl, to-l, to-tl -->

<!-- Three color gradient -->
<div class="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
  Three color gradient
</div>

<!-- Multiple stops -->
<div class="bg-gradient-to-r from-blue-500 from-10% via-purple-500 via-50% to-pink-500 to-90%">
  Gradient with positions
</div>
```

### 7.3 Background Images

```html
<!-- Background image -->
<div class="bg-[url('/img/hero.jpg')]">
  Content over image
</div>

<!-- Background size -->
<div class="bg-cover">background-size: cover</div>
<div class="bg-contain">background-size: contain</div>
<div class="bg-auto">background-size: auto</div>

<!-- Background position -->
<div class="bg-center">center</div>
<div class="bg-top">top</div>
<div class="bg-bottom">bottom</div>
<div class="bg-left">left</div>
<div class="bg-right">right</div>
<div class="bg-left-top">left top</div>

<!-- Background repeat -->
<div class="bg-repeat">repeat</div>
<div class="bg-no-repeat">no-repeat</div>
<div class="bg-repeat-x">repeat-x</div>
<div class="bg-repeat-y">repeat-y</div>

<!-- Background attachment -->
<div class="bg-fixed">Fixed background</div>
<div class="bg-local">Local background</div>
<div class="bg-scroll">Scroll background</div>
```

### 7.4 Background Clip

```html
<!-- Gradient text effect -->
<h1 class="text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
  Gradient Text
</h1>

<div class="bg-clip-border">Clip to border</div>
<div class="bg-clip-padding">Clip to padding</div>
<div class="bg-clip-content">Clip to content</div>
```

### 7.5 Opacity

```html
<div class="opacity-0">0% opacity</div>
<div class="opacity-25">25% opacity</div>
<div class="opacity-50">50% opacity</div>
<div class="opacity-75">75% opacity</div>
<div class="opacity-100">100% opacity</div>

<!-- Custom -->
<div class="opacity-[0.15]">15% opacity</div>
```

---

## Chapter 8: Borders & Effects

### 8.1 Border Width

```html
<!-- All sides -->
<div class="border">1px border</div>
<div class="border-0">No border</div>
<div class="border-2">2px border</div>
<div class="border-4">4px border</div>
<div class="border-8">8px border</div>

<!-- Individual sides -->
<div class="border-t-4">Top border 4px</div>
<div class="border-r-4">Right border 4px</div>
<div class="border-b-4">Bottom border 4px</div>
<div class="border-l-4">Left border 4px</div>

<!-- Horizontal/Vertical -->
<div class="border-x-2">Left and right</div>
<div class="border-y-2">Top and bottom</div>
```

### 8.2 Border Color

```html
<div class="border-2 border-red-500">Red border</div>
<div class="border-2 border-blue-500">Blue border</div>
<div class="border-2 border-gray-300">Gray border</div>

<!-- With opacity -->
<div class="border-2 border-black/50">50% opacity</div>

<!-- Individual sides -->
<div class="border-t-2 border-t-red-500">Red top border</div>
```

### 8.3 Border Style

```html
<div class="border-2 border-solid">Solid</div>
<div class="border-2 border-dashed">Dashed</div>
<div class="border-2 border-dotted">Dotted</div>
<div class="border-2 border-double">Double</div>
<div class="border-2 border-none">None</div>
```

### 8.4 Border Radius

```html
<!-- All corners -->
<div class="rounded-none">No radius</div>
<div class="rounded-sm">0.125rem (2px)</div>
<div class="rounded">0.25rem (4px)</div>
<div class="rounded-md">0.375rem (6px)</div>
<div class="rounded-lg">0.5rem (8px)</div>
<div class="rounded-xl">0.75rem (12px)</div>
<div class="rounded-2xl">1rem (16px)</div>
<div class="rounded-3xl">1.5rem (24px)</div>
<div class="rounded-full">9999px (circle/pill)</div>

<!-- Individual corners -->
<div class="rounded-tl-lg">Top-left</div>
<div class="rounded-tr-lg">Top-right</div>
<div class="rounded-br-lg">Bottom-right</div>
<div class="rounded-bl-lg">Bottom-left</div>

<!-- Sides -->
<div class="rounded-t-lg">Top corners</div>
<div class="rounded-r-lg">Right corners</div>
<div class="rounded-b-lg">Bottom corners</div>
<div class="rounded-l-lg">Left corners</div>
```

### 8.5 Box Shadow

```html
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
<div class="shadow-2xl">2xl shadow</div>
<div class="shadow-inner">Inner shadow</div>
<div class="shadow-none">No shadow</div>

<!-- Colored shadows -->
<div class="shadow-lg shadow-blue-500/50">Blue shadow</div>
<div class="shadow-xl shadow-purple-500/30">Purple shadow</div>

<!-- Custom -->
<div class="shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]">
  Custom shadow
</div>
```

### 8.6 Drop Shadow (Filter)

```html
<div class="drop-shadow-sm">Small drop shadow</div>
<div class="drop-shadow">Default drop shadow</div>
<div class="drop-shadow-md">Medium drop shadow</div>
<div class="drop-shadow-lg">Large drop shadow</div>
<div class="drop-shadow-xl">XL drop shadow</div>
<div class="drop-shadow-2xl">2XL drop shadow</div>
<div class="drop-shadow-none">No drop shadow</div>
```

### 8.7 Outline

```html
<button class="outline outline-2 outline-blue-500">
  Outlined button
</button>

<!-- Outline offset -->
<button class="outline outline-2 outline-offset-2">
  Offset outline
</button>

<!-- Focus outline (common for accessibility) -->
<button class="focus:outline-none focus:ring-2 focus:ring-blue-500">
  Custom focus
</button>
```

### 8.8 Ring (Focus Rings)

```html
<!-- Ring width -->
<button class="ring">Default ring</button>
<button class="ring-2">2px ring</button>
<button class="ring-4">4px ring</button>

<!-- Ring color -->
<button class="ring-2 ring-blue-500">Blue ring</button>
<button class="ring-2 ring-red-500/50">Red ring with opacity</button>

<!-- Ring offset -->
<button class="ring-2 ring-blue-500 ring-offset-2">
  Ring with offset
</button>

<!-- Focus ring (most common use) -->
<input class="border-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
```

### 8.9 Divide

Add borders between children:

```html
<!-- Horizontal dividers -->
<div class="divide-y divide-gray-300">
  <div class="py-2">Item 1</div>
  <div class="py-2">Item 2</div>
  <div class="py-2">Item 3</div>
</div>

<!-- Vertical dividers -->
<div class="flex divide-x divide-gray-300">
  <div class="px-4">Item 1</div>
  <div class="px-4">Item 2</div>
  <div class="px-4">Item 3</div>
</div>

<!-- Divide style -->
<div class="divide-y divide-dashed divide-gray-400">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

---

## Chapter 9: Flexbox & Grid

### 9.1 Flexbox Basics

```html
<!-- Flex container -->
<div class="flex">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Inline flex -->
<div class="inline-flex">Inline flex container</div>

<!-- Flex direction -->
<div class="flex flex-row">Row (default)</div>
<div class="flex flex-row-reverse">Row reversed</div>
<div class="flex flex-col">Column</div>
<div class="flex flex-col-reverse">Column reversed</div>

<!-- Flex wrap -->
<div class="flex flex-wrap">Wrap items</div>
<div class="flex flex-wrap-reverse">Wrap reversed</div>
<div class="flex flex-nowrap">No wrap (default)</div>
```

### 9.2 Justify Content (Main Axis)

```html
<div class="flex justify-start">Start (default)</div>
<div class="flex justify-end">End</div>
<div class="flex justify-center">Center</div>
<div class="flex justify-between">Space between</div>
<div class="flex justify-around">Space around</div>
<div class="flex justify-evenly">Space evenly</div>
```

### 9.3 Align Items (Cross Axis)

```html
<div class="flex items-start">Start</div>
<div class="flex items-end">End</div>
<div class="flex items-center">Center</div>
<div class="flex items-baseline">Baseline</div>
<div class="flex items-stretch">Stretch (default)</div>
```

### 9.4 Align Content (Multi-line)

```html
<div class="flex flex-wrap content-start">Start</div>
<div class="flex flex-wrap content-end">End</div>
<div class="flex flex-wrap content-center">Center</div>
<div class="flex flex-wrap content-between">Between</div>
<div class="flex flex-wrap content-around">Around</div>
<div class="flex flex-wrap content-evenly">Evenly</div>
```

### 9.5 Align Self (Individual Item)

```html
<div class="flex">
  <div class="self-auto">Auto</div>
  <div class="self-start">Start</div>
  <div class="self-center">Center</div>
  <div class="self-end">End</div>
  <div class="self-stretch">Stretch</div>
</div>
```

### 9.6 Flex Grow / Shrink / Basis

```html
<!-- Flex grow -->
<div class="flex">
  <div class="flex-1">Grow equally</div>
  <div class="flex-1">Grow equally</div>
</div>

<div class="flex">
  <div class="flex-initial">No grow</div>
  <div class="flex-1">Grow to fill</div>
</div>

<!-- Flex shrink -->
<div class="flex-shrink">Can shrink</div>
<div class="flex-shrink-0">Cannot shrink</div>

<!-- Flex basis -->
<div class="flex-auto">Auto</div>
<div class="flex-initial">Initial</div>
<div class="flex-none">None</div>
```

### 9.7 Gap

```html
<!-- Gap between flex/grid items -->
<div class="flex gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Different x and y gaps -->
<div class="flex flex-wrap gap-x-4 gap-y-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Grid gap -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

### 9.8 Grid Basics

```html
<!-- Grid container -->
<div class="grid grid-cols-3">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</div>

<!-- Different column counts -->
<div class="grid grid-cols-1">1 column</div>
<div class="grid grid-cols-2">2 columns</div>
<div class="grid grid-cols-3">3 columns</div>
<div class="grid grid-cols-4">4 columns</div>
<div class="grid grid-cols-6">6 columns</div>
<div class="grid grid-cols-12">12 columns</div>

<!-- Custom columns -->
<div class="grid grid-cols-[200px_1fr_200px]">
  <div>Sidebar</div>
  <div>Content</div>
  <div>Sidebar</div>
</div>
```

### 9.9 Grid Rows

```html
<!-- Row count -->
<div class="grid grid-rows-3">
  <div>Row 1</div>
  <div>Row 2</div>
  <div>Row 3</div>
</div>

<!-- Row heights -->
<div class="grid grid-rows-[100px_1fr_100px]">
  <div>Header</div>
  <div>Content</div>
  <div>Footer</div>
</div>
```

### 9.10 Grid Column Span

```html
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-2">Spans 2 columns</div>
  <div>1</div>
  <div>1</div>
  <div class="col-span-3">Spans 3 columns</div>
  <div>1</div>
  <div class="col-span-4">Spans all 4 columns</div>
</div>

<!-- Column start/end -->
<div class="col-start-2 col-end-4">From column 2 to 4</div>
<div class="col-start-1 col-end-3">From column 1 to 3</div>
```

### 9.11 Grid Row Span

```html
<div class="grid grid-cols-3 grid-rows-3 gap-4">
  <div class="row-span-2">Spans 2 rows</div>
  <div>1</div>
  <div>1</div>
  <div>1</div>
  <div>1</div>
  <div class="row-span-3">Spans 3 rows</div>
</div>

<!-- Row start/end -->
<div class="row-start-1 row-end-3">From row 1 to 3</div>
```

### 9.12 Grid Auto Flow

```html
<div class="grid grid-flow-row">Row (default)</div>
<div class="grid grid-flow-col">Column</div>
<div class="grid grid-flow-dense">Dense packing</div>
```

---

## Chapter 10: Responsive Design

### 10.1 Breakpoint System

Tailwind uses a mobile-first breakpoint system:

```
sm:  640px   @media (min-width: 640px)
md:  768px   @media (min-width: 768px)
lg:  1024px  @media (min-width: 1024px)
xl:  1280px  @media (min-width: 1280px)
2xl: 1536px  @media (min-width: 1536px)
```

### 10.2 Responsive Utilities

```html
<!-- Padding changes at breakpoints -->
<div class="p-4 md:p-8 lg:p-12">
  Responsive padding
</div>

<!-- Text size -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">
  Responsive heading
</h1>

<!-- Display -->
<div class="block md:hidden">
  Show on mobile, hide on desktop
</div>

<div class="hidden md:block">
  Hide on mobile, show on desktop
</div>

<!-- Flex direction -->
<div class="flex flex-col md:flex-row">
  Column on mobile, row on desktop
</div>

<!-- Grid columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
```

### 10.3 Responsive Patterns

**Mobile Navigation:**

```html
<nav class="flex flex-col md:flex-row md:items-center md:space-x-4">
  <a href="#" class="py-2 md:py-0">Home</a>
  <a href="#" class="py-2 md:py-0">About</a>
  <a href="#" class="py-2 md:py-0">Services</a>
  <a href="#" class="py-2 md:py-0">Contact</a>
</nav>
```

**Responsive Container:**

```html
<div class="container mx-auto px-4 md:px-6 lg:px-8">
  Content with responsive padding
</div>
```

**Card Grid:**

```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <div class="bg-white p-4 rounded shadow">Card 1</div>
  <div class="bg-white p-4 rounded shadow">Card 2</div>
  <div class="bg-white p-4 rounded shadow">Card 3</div>
  <div class="bg-white p-4 rounded shadow">Card 4</div>
</div>
```

**Hero Section:**

```html
<section class="py-12 md:py-20 lg:py-32">
  <div class="container mx-auto px-4">
    <h1 class="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6">
      Hero Title
    </h1>
    <p class="text-lg md:text-xl lg:text-2xl">
      Hero description
    </p>
  </div>
</section>
```

---

## Chapter 11: Dark Mode

### 11.1 Dark Mode Setup

**In tailwind.config.js:**

```javascript
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
```

**Options:**
- `'media'` - Uses system preference (prefers-color-scheme)
- `'class'` - Uses class on html element (manual toggle)

### 11.2 Dark Mode Utilities

```html
<!-- Toggle dark mode by adding 'dark' class to html -->
<html class="dark">
  
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  <!-- White background in light mode, gray in dark mode -->
</div>

<!-- Text colors -->
<p class="text-gray-900 dark:text-gray-100">
  Dark text in light mode, light text in dark mode
</p>

<!-- Borders -->
<div class="border border-gray-300 dark:border-gray-700">
  Border adapts to theme
</div>

<!-- Backgrounds -->
<div class="bg-gray-100 dark:bg-gray-800">
  Background changes
</div>
```

### 11.3 Dark Mode Toggle (JavaScript)

```html
<button id="theme-toggle" class="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
  <svg class="w-6 h-6 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
    <!-- Sun icon -->
  </svg>
  <svg class="w-6 h-6 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
    <!-- Moon icon -->
  </svg>
</button>

<script>
const toggle = document.getElementById('theme-toggle');
const html = document.documentElement;

toggle.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// Load saved theme
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  html.classList.add('dark');
}
</script>
```

### 11.4 Dark Mode Component Example

```html
<!-- Card that adapts to dark mode -->
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-900/50 p-6">
  <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
    Card Title
  </h2>
  <p class="text-gray-600 dark:text-gray-300 mb-4">
    Card description text that changes color in dark mode.
  </p>
  <button class="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded">
    Button
  </button>
</div>
```

---

## Chapter 12: States & Variants

### 12.1 Hover State

```html
<!-- Color change -->
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Hover me
</button>

<!-- Scale -->
<div class="transform hover:scale-110 transition">
  Grows on hover
</div>

<!-- Shadow -->
<div class="shadow hover:shadow-lg transition">
  Shadow increases on hover
</div>

<!-- Multiple properties -->
<button class="bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1 transition px-4 py-2 rounded text-white">
  Complex hover
</button>
```

### 12.2 Focus State

```html
<!-- Input focus -->
<input class="border-2 border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 px-4 py-2 rounded">

<!-- Button focus -->
<button class="bg-blue-500 focus:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 px-4 py-2 rounded text-white">
  Focus me
</button>

<!-- Focus visible (keyboard only) -->
<button class="focus-visible:ring-2 focus-visible:ring-blue-500">
  Keyboard focus only
</button>

<!-- Focus within (child has focus) -->
<div class="border-2 focus-within:border-blue-500">
  <input>
</div>
```

### 12.3 Active State

```html
<button class="bg-blue-500 active:bg-blue-700 px-4 py-2 rounded text-white">
  Click me
</button>

<button class="transform active:scale-95 transition px-4 py-2">
  Press effect
</button>
```

### 12.4 Group Hover

Hover on parent affects children:

```html
<div class="group border p-4 rounded hover:bg-gray-50">
  <h3 class="group-hover:text-blue-600">
    Title changes when card is hovered
  </h3>
  <p class="text-gray-600 group-hover:text-gray-900">
    Description also changes
  </p>
  <button class="opacity-0 group-hover:opacity-100 transition">
    Button appears on hover
  </button>
</div>
```

### 12.5 Peer

Sibling element affects styling:

```html
<div>
  <input type="checkbox" class="peer" id="terms">
  <label class="peer-checked:text-blue-600 peer-checked:font-bold" for="terms">
    I agree to terms (changes when checked)
  </label>
</div>

<!-- Peer focus -->
<div>
  <input type="text" class="peer" placeholder="Email">
  <p class="text-gray-400 peer-focus:text-blue-600">
    Helper text changes when input is focused
  </p>
</div>
```

### 12.6 Disabled State

```html
<button class="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded" disabled>
  Disabled button
</button>

<input class="border-2 disabled:bg-gray-100 disabled:text-gray-500 px-4 py-2" disabled>
```

### 12.7 Other States

```html
<!-- Visited (links) -->
<a href="#" class="text-blue-600 visited:text-purple-600">
  Visited link
</a>

<!-- Checked (checkbox/radio) -->
<input type="checkbox" class="checked:bg-blue-500">

<!-- Required -->
<input required class="required:border-red-500">

<!-- Invalid -->
<input type="email" class="invalid:border-red-500">

<!-- Placeholder shown -->
<input placeholder="Email" class="placeholder-shown:border-gray-300">

<!-- First/Last child -->
<div class="first:rounded-t-lg last:rounded-b-lg">Item</div>

<!-- Odd/Even -->
<div class="odd:bg-gray-100 even:bg-white">Item</div>
```

---

## Chapter 13: Customization

### 13.1 Tailwind Config

**tailwind.config.js:**

```javascript
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      // Add to existing values
      colors: {
        'brand-blue': '#1da1f2',
        'brand-dark': '#14171a',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
    // Override default values
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
  },
  plugins: [],
}
```

### 13.2 Custom Colors

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // Single color
        'primary': '#3b82f6',
        
        // Color palette
        'brand': {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
      },
    },
  },
}
```

**Usage:**
```html
<div class="bg-brand-500 text-white">
  Custom brand color
</div>
```

### 13.3 Custom Fonts

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'serif': ['Merriweather', 'Georgia', 'serif'],
        'mono': ['Fira Code', 'monospace'],
        'display': ['Oswald', 'sans-serif'],
      },
    },
  },
}
```

**Usage:**
```html
<h1 class="font-display">Display Font</h1>
<p class="font-sans">Body text</p>
<code class="font-mono">Code</code>
```

### 13.4 Custom Spacing

```javascript
module.exports = {
  theme: {
    extend: {
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
}
```

### 13.5 Custom Breakpoints

```javascript
module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
  },
}
```

### 13.6 Adding Utilities

**In CSS:**

```css
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .text-shadow-none {
    text-shadow: none;
  }
}
```

**In Config (with plugin):**

```javascript
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        },
        '.text-shadow-lg': {
          'text-shadow': '4px 4px 8px rgba(0, 0, 0, 0.5)',
        },
      })
    })
  ],
}
```

### 13.7 Custom Components

```css
@layer components {
  .btn {
    @apply px-4 py-2 rounded font-semibold transition;
  }
  
  .btn-primary {
    @apply bg-blue-500 text-white hover:bg-blue-600;
  }
  
  .btn-secondary {
    @apply bg-gray-500 text-white hover:bg-gray-600;
  }
  
  .card {
    @apply bg-white rounded-lg shadow-md p-6;
  }
}
```

**Usage:**
```html
<button class="btn btn-primary">Primary Button</button>
<div class="card">Card content</div>
```

---

## Chapter 14: Components & Patterns

### 14.1 Button Patterns

```html
<!-- Primary Button -->
<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition duration-200">
  Primary Button
</button>

<!-- Outline Button -->
<button class="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold px-6 py-3 rounded-lg transition duration-200">
  Outline Button
</button>

<!-- Ghost Button -->
<button class="text-blue-500 hover:bg-blue-50 font-semibold px-6 py-3 rounded-lg transition duration-200">
  Ghost Button
</button>

<!-- Button with Icon -->
<button class="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg">
  <svg class="w-5 h-5" fill="currentColor"><!-- icon --></svg>
  With Icon
</button>

<!-- Button Sizes -->
<button class="bg-blue-500 text-white px-3 py-1.5 text-sm rounded">Small</button>
<button class="bg-blue-500 text-white px-4 py-2 rounded">Medium</button>
<button class="bg-blue-500 text-white px-6 py-3 text-lg rounded-lg">Large</button>
```

### 14.2 Card Patterns

```html
<!-- Basic Card -->
<div class="bg-white rounded-lg shadow-md p-6">
  <h3 class="text-xl font-bold mb-2">Card Title</h3>
  <p class="text-gray-600">Card description goes here.</p>
</div>

<!-- Card with Image -->
<div class="bg-white rounded-lg shadow-md overflow-hidden">
  <img src="image.jpg" class="w-full h-48 object-cover">
  <div class="p-6">
    <h3 class="text-xl font-bold mb-2">Card Title</h3>
    <p class="text-gray-600 mb-4">Description</p>
    <button class="bg-blue-500 text-white px-4 py-2 rounded">Action</button>
  </div>
</div>

<!-- Hoverable Card -->
<div class="bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 p-6 cursor-pointer">
  <h3 class="text-xl font-bold mb-2">Hoverable Card</h3>
  <p class="text-gray-600">Lifts on hover</p>
</div>
```

### 14.3 Form Patterns

```html
<!-- Form with Labels -->
<form class="space-y-4">
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      Email
    </label>
    <input 
      type="email" 
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="you@example.com"
    >
  </div>
  
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-1">
      Password
    </label>
    <input 
      type="password" 
      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
  </div>
  
  <div class="flex items-center">
    <input type="checkbox" id="remember" class="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500">
    <label for="remember" class="ml-2 text-sm text-gray-700">
      Remember me
    </label>
  </div>
  
  <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg">
    Sign In
  </button>
</form>
```

### 14.4 Navigation Patterns

```html
<!-- Horizontal Navigation -->
<nav class="bg-white shadow-md">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <div class="flex items-center space-x-8">
        <a href="#" class="text-xl font-bold text-blue-600">Logo</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 transition">Home</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 transition">About</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 transition">Services</a>
        <a href="#" class="text-gray-700 hover:text-blue-600 transition">Contact</a>
      </div>
      <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Sign Up
      </button>
    </div>
  </div>
</nav>

<!-- Mobile Navigation -->
<nav class="bg-white shadow-md">
  <div class="container mx-auto px-4">
    <div class="flex items-center justify-between h-16">
      <a href="#" class="text-xl font-bold text-blue-600">Logo</a>
      <button class="md:hidden" id="mobile-menu-button">
        <svg class="w-6 h-6" fill="currentColor">
          <!-- Menu icon -->
        </svg>
      </button>
      <div class="hidden md:flex space-x-4">
        <a href="#" class="hover:text-blue-600">Home</a>
        <a href="#" class="hover:text-blue-600">About</a>
        <a href="#" class="hover:text-blue-600">Contact</a>
      </div>
    </div>
    
    <!-- Mobile Menu -->
    <div class="md:hidden hidden" id="mobile-menu">
      <a href="#" class="block py-2 hover:bg-gray-100">Home</a>
      <a href="#" class="block py-2 hover:bg-gray-100">About</a>
      <a href="#" class="block py-2 hover:bg-gray-100">Contact</a>
    </div>
  </div>
</nav>
```

### 14.5 Modal Pattern

```html
<!-- Modal Overlay -->
<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
  <!-- Modal -->
  <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
    <!-- Modal Header -->
    <div class="flex items-center justify-between p-6 border-b">
      <h3 class="text-xl font-bold">Modal Title</h3>
      <button class="text-gray-400 hover:text-gray-600">
        <svg class="w-6 h-6" fill="currentColor">
          <!-- Close icon -->
        </svg>
      </button>
    </div>
    
    <!-- Modal Body -->
    <div class="p-6">
      <p class="text-gray-600">Modal content goes here.</p>
    </div>
    
    <!-- Modal Footer -->
    <div class="flex justify-end gap-2 p-6 border-t">
      <button class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded">
        Cancel
      </button>
      <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">
        Confirm
      </button>
    </div>
  </div>
</div>
```

### 14.6 Alert Patterns

```html
<!-- Success Alert -->
<div class="bg-green-50 border-l-4 border-green-500 p-4 rounded">
  <div class="flex items-center">
    <div class="flex-shrink-0">
      <svg class="w-5 h-5 text-green-500" fill="currentColor">
        <!-- Check icon -->
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm text-green-800">
        Success! Your changes have been saved.
      </p>
    </div>
  </div>
</div>

<!-- Error Alert -->
<div class="bg-red-50 border-l-4 border-red-500 p-4 rounded">
  <div class="flex items-center">
    <div class="flex-shrink-0">
      <svg class="w-5 h-5 text-red-500" fill="currentColor">
        <!-- X icon -->
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm text-red-800">
        Error! Something went wrong.
      </p>
    </div>
  </div>
</div>

<!-- Warning Alert -->
<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
  <div class="flex items-center">
    <div class="flex-shrink-0">
      <svg class="w-5 h-5 text-yellow-500" fill="currentColor">
        <!-- Warning icon -->
      </svg>
    </div>
    <div class="ml-3">
      <p class="text-sm text-yellow-800">
        Warning! Please review your input.
      </p>
    </div>
  </div>
</div>
```

### 14.7 Badge Patterns

```html
<span class="bg-blue-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded">
  Badge
</span>

<span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
  Danger
</span>

<span class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded">
  Success
</span>

<!-- Badge with dot -->
<span class="inline-flex items-center gap-1.5 bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded">
  <span class="w-2 h-2 bg-green-500 rounded-full"></span>
  Online
</span>
```

---

## Chapter 15: Advanced Techniques

### 15.1 Container Queries

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      // Container queries (v3.3+)
    }
  },
  plugins: [
    require('@tailwindcss/container-queries'),
  ],
}
```

```html
<div class="@container">
  <div class="@lg:text-2xl @xl:text-4xl">
    Responds to container size
  </div>
</div>
```

### 15.2 Animation

```html
<!-- Built-in animations -->
<div class="animate-spin">Spinning</div>
<div class="animate-ping">Pinging</div>
<div class="animate-pulse">Pulsing</div>
<div class="animate-bounce">Bouncing</div>

<!-- Custom animation -->
```

**tailwind.config.js:**
```javascript
module.exports = {
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      }
    }
  }
}
```

```html
<div class="animate-wiggle">Wiggling!</div>
```

### 15.3 Transitions

```html
<!-- Transition property -->
<div class="transition-all">All properties</div>
<div class="transition-colors">Colors only</div>
<div class="transition-opacity">Opacity only</div>
<div class="transition-transform">Transform only</div>

<!-- Duration -->
<div class="transition duration-75">75ms</div>
<div class="transition duration-150">150ms</div>
<div class="transition duration-300">300ms</div>
<div class="transition duration-500">500ms</div>

<!-- Timing function -->
<div class="transition ease-linear">Linear</div>
<div class="transition ease-in">Ease in</div>
<div class="transition ease-out">Ease out</div>
<div class="transition ease-in-out">Ease in-out</div>

<!-- Delay -->
<div class="transition delay-75">75ms delay</div>
<div class="transition delay-150">150ms delay</div>

<!-- Complete example -->
<button class="bg-blue-500 hover:bg-blue-600 transform hover:scale-110 transition-all duration-300 ease-in-out">
  Hover me
</button>
```

### 15.4 Transforms

```html
<!-- Scale -->
<div class="scale-50">50% size</div>
<div class="scale-100">100% size (default)</div>
<div class="scale-150">150% size</div>
<div class="hover:scale-110">Grow on hover</div>

<!-- Rotate -->
<div class="rotate-45">45 degrees</div>
<div class="rotate-90">90 degrees</div>
<div class="rotate-180">180 degrees</div>
<div class="-rotate-12">-12 degrees</div>

<!-- Translate -->
<div class="translate-x-4">Move right</div>
<div class="translate-y-4">Move down</div>
<div class="-translate-x-1/2">Move left 50%</div>

<!-- Skew -->
<div class="skew-x-12">Skew X</div>
<div class="skew-y-6">Skew Y</div>

<!-- Transform origin -->
<div class="origin-center">Center origin</div>
<div class="origin-top-left">Top-left origin</div>
```

### 15.5 Filters

```html
<!-- Blur -->
<img class="blur-sm" src="image.jpg">
<img class="blur-md" src="image.jpg">
<img class="blur-lg" src="image.jpg">

<!-- Brightness -->
<img class="brightness-50" src="image.jpg">
<img class="brightness-125" src="image.jpg">

<!-- Contrast -->
<img class="contrast-50" src="image.jpg">
<img class="contrast-150" src="image.jpg">

<!-- Grayscale -->
<img class="grayscale" src="image.jpg">

<!-- Hue rotate -->
<img class="hue-rotate-90" src="image.jpg">

<!-- Invert -->
<img class="invert" src="image.jpg">

<!-- Saturate -->
<img class="saturate-150" src="image.jpg">

<!-- Sepia -->
<img class="sepia" src="image.jpg">

<!-- Multiple filters -->
<img class="blur-sm brightness-110 contrast-125" src="image.jpg">

<!-- Hover effect -->
<img class="grayscale hover:grayscale-0 transition duration-300" src="image.jpg">
```

### 15.6 Backdrop Filters

```html
<div class="relative">
  <img src="background.jpg" class="w-full">
  <div class="absolute inset-0 backdrop-blur-sm bg-white/30">
    <p class="text-center p-4">Frosted glass effect</p>
  </div>
</div>

<!-- Backdrop blur -->
<div class="backdrop-blur-sm">Small blur</div>
<div class="backdrop-blur-md">Medium blur</div>
<div class="backdrop-blur-lg">Large blur</div>

<!-- Backdrop brightness -->
<div class="backdrop-brightness-50">Darkened</div>
<div class="backdrop-brightness-150">Brightened</div>

<!-- Backdrop contrast -->
<div class="backdrop-contrast-125">More contrast</div>

<!-- Backdrop grayscale -->
<div class="backdrop-grayscale">Grayscale background</div>
```

### 15.7 Aspect Ratio

```html
<!-- Common ratios -->
<div class="aspect-square">1:1 square</div>
<div class="aspect-video">16:9 video</div>

<!-- Custom ratio -->
<div class="aspect-[4/3]">4:3 ratio</div>
<div class="aspect-[21/9]">21:9 ultrawide</div>

<!-- Responsive video embed -->
<div class="aspect-video">
  <iframe class="w-full h-full" src="video-url"></iframe>
</div>
```

---

## Chapter 16: Best Practices

### 16.1 Organization

**Group related utilities:**

```html
<!-- ❌ Hard to read -->
<div class="bg-white shadow-md p-6 rounded-lg text-gray-800 font-semibold hover:shadow-lg transition">

<!-- ✅ Better -->
<div class="
  bg-white 
  shadow-md hover:shadow-lg 
  p-6 
  rounded-lg 
  text-gray-800 font-semibold 
  transition
">
```

### 16.2 Component Extraction

When classes repeat, extract to component:

```html
<!-- ❌ Repetitive -->
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Button 1</button>
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">Button 2</button>

<!-- ✅ Extract to component -->
<!-- React -->
<Button>Button 1</Button>
<Button>Button 2</Button>

<!-- Or use @apply -->
<style>
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded;
}
</style>
```

### 16.3 Use @apply Sparingly

```css
/* ✅ Good use cases for @apply */
@layer components {
  .btn {
    @apply px-4 py-2 rounded font-semibold transition;
  }
}

/* ❌ Don't recreate traditional CSS */
.my-custom-class {
  @apply mt-4 text-center text-blue-500 hover:underline;
}
/* Just use utilities in HTML instead */
```

### 16.4 Leverage Tailwind Config

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
      },
      spacing: {
        '128': '32rem',
      }
    }
  }
}
```

### 16.5 Performance Tips

**1. Purge unused styles in production:**

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
  ],
  // Automatically purges unused styles
}
```

**2. Use JIT mode (default in v3):**
- Generates styles on-demand
- Faster build times
- Smaller file sizes
- Arbitrary values work out of the box

**3. Optimize build:**

```bash
NODE_ENV=production npx tailwindcss -i input.css -o output.css --minify
```

### 16.6 Accessibility

```html
<!-- Use semantic HTML -->
<button>Click me</button>  <!-- Not <div class="cursor-pointer"> -->

<!-- Ensure contrast ratios -->
<div class="bg-blue-500 text-white">  <!-- Good contrast -->

<!-- Add focus states -->
<button class="focus:ring-2 focus:ring-blue-500 focus:outline-none">
  Accessible button
</button>

<!-- Screen reader only text -->
<span class="sr-only">Screen reader text</span>
```

### 16.7 Common Patterns

**Centering:**

```html
<!-- Flexbox center -->
<div class="flex items-center justify-center min-h-screen">
  Centered
</div>

<!-- Grid center -->
<div class="grid place-items-center min-h-screen">
  Centered
</div>

<!-- Absolute center -->
<div class="relative">
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    Centered
  </div>
</div>
```

**Truncate text:**

```html
<p class="truncate">
  Very long text that will be cut off...
</p>

<p class="line-clamp-3">
  Multi-line text that will be truncated after 3 lines...
</p>
```

**Aspect ratio boxes:**

```html
<div class="aspect-video bg-gray-200">
  16:9 container
</div>
```

### 16.8 Tools & Resources

**Official:**
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind Play](https://play.tailwindcss.com) - Online playground
- [Tailwind UI](https://tailwindui.com) - Official components (paid)

**Plugins:**
- @tailwindcss/typography - Beautiful typographic defaults
- @tailwindcss/forms - Form styling
- @tailwindcss/aspect-ratio - Aspect ratio utilities
- @tailwindcss/container-queries - Container queries

**Community:**
- [Headless UI](https://headlessui.com) - Unstyled accessible components
- [DaisyUI](https://daisyui.com) - Component library
- [Flowbite](https://flowbite.com) - Component library
- [Meraki UI](https://merakiui.com) - Free components

---

## Summary

### Key Takeaways

1. **Utility-First:** Compose designs with utility classes
2. **Design System:** Built-in spacing, colors, and typography scale
3. **Responsive:** Mobile-first breakpoint system
4. **Dark Mode:** Easy theme switching
5. **Customizable:** Extend via config file
6. **Modern:** Supports latest CSS features
7. **Performance:** Small bundle with purging/JIT

### Quick Reference

**Common Patterns:**
```html
<!-- Container -->
<div class="container mx-auto px-4">

<!-- Card -->
<div class="bg-white rounded-lg shadow-md p-6">

<!-- Button -->
<button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">

<!-- Input -->
<input class="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 rounded px-4 py-2">

<!-- Flex Center -->
<div class="flex items-center justify-center">

<!-- Grid -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
```

### Next Steps

1. **Practice:** Build real projects
2. **Explore:** Check out Tailwind UI for inspiration
3. **Customize:** Tailor to your design system
4. **Component Libraries:** Try DaisyUI or Flowbite
5. **Read Docs:** Official documentation is excellent

Happy coding with Tailwind CSS! 🎨