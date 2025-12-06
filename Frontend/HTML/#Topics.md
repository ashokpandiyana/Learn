# Complete HTML Mastery Guide: Beginner to Advanced

## Chapter 1: HTML Fundamentals

### 1.1 Document Structure

- **DOCTYPE Declaration**
  - Purpose: Tells browser which HTML version to use
  - HTML5: `<!DOCTYPE html>` (case-insensitive)
  - ⚠️ Important: Always include to avoid quirks mode
- **HTML Element (`<html>`)**

  - Root element of every page
  - `lang` attribute for accessibility and SEO
  - Example: `<html lang="en">`

- **Head Section (`<head>`)**

  - Metadata container
  - Not displayed on page
  - Contains: title, meta tags, links, scripts

- **Body Section (`<body>`)**
  - Contains all visible content
  - Only one per document

### 1.2 Meta Tags & SEO Essentials

- **Character Encoding**: `<meta charset="UTF-8">`
- **Viewport** (Mobile responsiveness): `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
- **Description**: `<meta name="description" content="...">`
- **Keywords**: `<meta name="keywords" content="...">`
- **Author**: `<meta name="author" content="...">`
- **Open Graph** (Social media): `<meta property="og:title" content="...">`
- **Twitter Cards**: `<meta name="twitter:card" content="summary">`
- ⚠️ Important: Description should be 150-160 characters

### 1.3 Title & Favicon

- `<title>`: Browser tab text, SEO critical
- `<link rel="icon" href="favicon.ico">`
- Multiple icon sizes for different devices

### 1.4 Block vs Inline Elements

- **Block Elements**: Start new line, full width
  - div, p, h1-h6, section, article, header, footer, nav
- **Inline Elements**: Stay in line, width of content
  - span, a, img, strong, em, code
- ⚠️ Important: Block elements can contain inline, but not vice versa (with exceptions)

### 1.5 HTML Comments

- Syntax: `<!-- Comment here -->`
- Not visible to users but in source code
- Use for documentation, TODOs, debugging

---

## Chapter 2: Semantic HTML

### 2.1 Why Semantic HTML Matters

- Improves accessibility (screen readers)
- Better SEO rankings
- Easier maintenance and readability
- Future-proofing

### 2.2 Document Structure Elements

- **`<header>`**: Introductory content, navigation
- **`<nav>`**: Navigation links
- **`<main>`**: Primary content (only one per page)
- **`<article>`**: Self-contained, independent content
- **`<section>`**: Thematic grouping of content
- **`<aside>`**: Tangentially related content, sidebars
- **`<footer>`**: Footer information
- ⚠️ Important: Don't nest `<main>` inside other semantic elements

### 2.3 Text Semantics

- **`<h1>` to `<h6>`**: Heading hierarchy
  - ⚠️ Only one `<h1>` per page for SEO
  - Don't skip levels
- **`<p>`**: Paragraphs
- **`<strong>`**: Important text (not just bold)
- **`<em>`**: Emphasized text (not just italic)
- **`<mark>`**: Highlighted/marked text
- **`<small>`**: Fine print, side comments
- **`<del>`**: Deleted text
- **`<ins>`**: Inserted text
- **`<sub>`**: Subscript
- **`<sup>`**: Superscript
- **`<abbr>`**: Abbreviations with title attribute
- **`<cite>`**: Citation/reference
- **`<q>`**: Short inline quotation
- **`<blockquote>`**: Extended quotation with cite attribute
- **`<code>`**: Inline code
- **`<pre>`**: Preformatted text
- **`<kbd>`**: Keyboard input
- **`<samp>`**: Sample output
- **`<var>`**: Variables

### 2.4 Lists

- **Unordered Lists**: `<ul>` with `<li>`
- **Ordered Lists**: `<ol>` with `<li>`
  - Attributes: `type`, `start`, `reversed`
- **Description Lists**: `<dl>`, `<dt>`, `<dd>`
- ⚠️ Important: Can nest lists, but proper structure required

### 2.5 Time & Data Elements

- **`<time>`**: Dates and times
  - `datetime` attribute for machine-readable format
  - Example: `<time datetime="2024-11-26">November 26, 2024</time>`
- **`<data>`**: Machine-readable value
  - `value` attribute

### 2.6 Address & Contact

- **`<address>`**: Contact information
- Should contain author/owner info

---

## Chapter 3: Links & Navigation

### 3.1 Anchor Tag (`<a>`)

- **href Attribute**: URL destination
- **target Attribute**:
  - `_self`: Same tab (default)
  - `_blank`: New tab
  - ⚠️ Security: Use `rel="noopener noreferrer"` with `_blank`
- **rel Attribute**:
  - `nofollow`: Don't follow for SEO
  - `noopener`: Security for target="\_blank"
  - `noreferrer`: Don't send referrer
  - `sponsored`: Paid links
  - `ugc`: User-generated content
- **download Attribute**: Force download instead of navigate
- **title Attribute**: Tooltip text

### 3.2 Link Types

- **Absolute URLs**: `https://example.com/page`
- **Relative URLs**: `./page.html`, `../folder/page.html`
- **Anchor Links**: `#section-id` (same page navigation)
- **Email Links**: `mailto:email@example.com`
- **Phone Links**: `tel:+1234567890`
- **SMS Links**: `sms:+1234567890`

### 3.3 Navigation Best Practices

- Use `<nav>` for main navigation
- Breadcrumb navigation with lists
- ARIA labels for accessibility
- Skip links for keyboard navigation

---

## Chapter 4: Tables

### 4.1 Table Structure

- **`<table>`**: Container
- **`<thead>`**: Header group
- **`<tbody>`**: Body group
- **`<tfoot>`**: Footer group
- **`<tr>`**: Table row
- **`<th>`**: Header cell (bold, centered)
- **`<td>`**: Data cell

### 4.2 Table Attributes

- **colspan**: Span multiple columns
- **rowspan**: Span multiple rows
- **scope** (on `<th>`): `col`, `row`, `colgroup`, `rowgroup`
- **headers** (on `<td>`): References th id for complex tables

### 4.3 Table Accessibility

- **`<caption>`**: Table title/description
- Use `scope` attribute on headers
- Use `headers` and `id` for complex relationships
- ⚠️ Important: Tables for data only, not layout

### 4.4 Column Grouping

- **`<colgroup>`**: Group columns
- **`<col>`**: Individual column styling

---

## Chapter 5: Forms & Input

### 5.1 Form Basics

- **`<form>`**: Container for form elements
- **Attributes**:
  - `action`: URL to submit data
  - `method`: `GET` or `POST`
  - `enctype`: `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`
  - `autocomplete`: `on` or `off`
  - `novalidate`: Disable browser validation
  - `target`: Where to display response

### 5.2 Input Types

- **Text Inputs**:
  - `text`: Single-line text
  - `password`: Masked input
  - `email`: Email validation
  - `url`: URL validation
  - `tel`: Telephone
  - `search`: Search box
- **Numeric Inputs**:
  - `number`: Numeric with spinners
  - `range`: Slider
- **Date/Time Inputs**:
  - `date`: Date picker
  - `time`: Time picker
  - `datetime-local`: Local date and time
  - `month`: Month picker
  - `week`: Week picker
- **Selection Inputs**:
  - `checkbox`: Multiple selections
  - `radio`: Single selection from group
  - `color`: Color picker
- **File/Button Inputs**:
  - `file`: File upload
  - `submit`: Submit button
  - `reset`: Reset form
  - `button`: Generic button
  - `image`: Image as submit button
- **Hidden**:
  - `hidden`: Hidden field

### 5.3 Input Attributes

- **Common Attributes**:
  - `name`: Field name (sent to server)
  - `value`: Default/current value
  - `placeholder`: Hint text
  - `required`: Mandatory field
  - `disabled`: Cannot interact
  - `readonly`: Can't modify but can submit
  - `autofocus`: Auto-focus on load
  - `autocomplete`: Auto-completion hint
- **Validation Attributes**:
  - `pattern`: Regex validation
  - `minlength`, `maxlength`: Length constraints
  - `min`, `max`: Number range
  - `step`: Increment for numbers
- **File-specific**:
  - `accept`: File types (e.g., `image/*`, `.pdf`)
  - `multiple`: Allow multiple files

### 5.4 Other Form Elements

- **`<textarea>`**: Multi-line text
  - Attributes: `rows`, `cols`, `wrap`
- **`<select>`**: Dropdown
  - `multiple`: Allow multiple selections
  - `size`: Visible options
- **`<option>`**: Dropdown option
  - `value`: Submitted value
  - `selected`: Pre-selected
  - `disabled`: Can't select
- **`<optgroup>`**: Group options
- **`<button>`**: Button element
  - `type`: `submit`, `reset`, `button`
- **`<datalist>`**: Autocomplete suggestions
  - Link with `list` attribute on input
- **`<output>`**: Calculation result
- **`<progress>`**: Progress bar
  - `value`, `max` attributes
- **`<meter>`**: Scalar measurement
  - `value`, `min`, `max`, `low`, `high`, `optimum`

### 5.5 Form Labels & Fieldsets

- **`<label>`**: Label for input
  - Method 1: Wrap input
  - Method 2: Use `for` attribute with input `id`
  - ⚠️ Important: Always use labels for accessibility
- **`<fieldset>`**: Group related inputs
- **`<legend>`**: Caption for fieldset

### 5.6 Form Validation

- **HTML5 Validation**: Built-in browser validation
- **Custom Validation Messages**: JavaScript Constraint Validation API
- **CSS Pseudo-classes**: `:valid`, `:invalid`, `:required`, `:optional`
- ⚠️ Important: Always validate server-side too

---

## Chapter 6: Multimedia

### 6.1 Images

- **`<img>`**: Image element
  - `src`: Image source (required)
  - `alt`: Alternative text (required for accessibility)
  - `width`, `height`: Dimensions (prevents layout shift)
  - `loading`: `lazy` for lazy loading
  - `decoding`: `async` for async decoding
  - `srcset`: Responsive images
  - `sizes`: Image sizes for different viewports
- **`<picture>`**: Responsive image container
  - Multiple `<source>` elements
  - Fallback `<img>`
- **`<figure>` and `<figcaption>`**: Image with caption
- ⚠️ Important: Always provide meaningful alt text

### 6.2 Image Formats

- **Raster**: JPEG, PNG, GIF, WebP, AVIF
- **Vector**: SVG
- Use WebP/AVIF for modern browsers with fallbacks

### 6.3 SVG

- **Inline SVG**: Direct in HTML
- **As `<img>`**: External file
- **As background**: CSS
- **Advantages**: Scalable, small file size, stylable
- ⚠️ Important: Optimize SVGs, remove unnecessary metadata

### 6.4 Audio

- **`<audio>`**: Audio player
  - `src`: Audio source
  - `controls`: Show controls
  - `autoplay`: Auto-play (often blocked)
  - `loop`: Loop playback
  - `muted`: Start muted
  - `preload`: `none`, `metadata`, `auto`
- **Multiple Sources**: `<source>` elements for fallbacks
- **Supported Formats**: MP3, WAV, OGG

### 6.5 Video

- **`<video>`**: Video player
  - Same attributes as `<audio>` plus:
  - `poster`: Thumbnail image
  - `width`, `height`: Dimensions
  - `playsinline`: Inline on mobile
- **`<track>`**: Subtitles/captions
  - `kind`: `subtitles`, `captions`, `descriptions`, `chapters`, `metadata`
  - `src`: WebVTT file
  - `srclang`: Language
  - `label`: User-visible label
  - `default`: Default track
- **Supported Formats**: MP4, WebM, OGG
- ⚠️ Important: Always provide captions for accessibility

### 6.6 Embedded Content

- **`<iframe>`**: Embed external content
  - `src`: Content URL
  - `sandbox`: Security restrictions
  - `allow`: Permission policy
  - `loading`: Lazy loading
  - ⚠️ Security: Be cautious with iframes
- **`<embed>`**: External plugin content (deprecated)
- **`<object>`**: External resource (deprecated)

---

## Chapter 7: Advanced Semantic Elements

### 7.1 Interactive Elements

- **`<details>` and `<summary>`**: Disclosure widget
  - `open` attribute: Initially expanded
  - Built-in accordion functionality
- **`<dialog>`**: Modal dialog
  - `open` attribute: Visible
  - `showModal()` method in JS
  - Built-in backdrop and keyboard handling

### 7.2 Content Sectioning

- **`<hgroup>`**: Group headings (deprecated in HTML5, returned in HTML5.2)
- **`<div>`**: Generic container (non-semantic)
- **`<span>`**: Generic inline container (non-semantic)

### 7.3 Ruby Annotations

- **`<ruby>`**: East Asian typography
- **`<rt>`**: Ruby text
- **`<rp>`**: Fallback parentheses

### 7.4 Web Components

- **`<template>`**: HTML template
  - Not rendered until cloned via JS
- **`<slot>`**: Named slots in Shadow DOM
- Custom elements with JavaScript

---

## Chapter 8: HTML Attributes (Global & Specialized)

### 8.1 Global Attributes (Work on Any Element)

- **`id`**: Unique identifier
- **`class`**: CSS class(es)
- **`style`**: Inline CSS (avoid in production)
- **`title`**: Tooltip text
- **`lang`**: Language code
- **`dir`**: Text direction (`ltr`, `rtl`, `auto`)
- **`hidden`**: Hide element
- **`tabindex`**: Tab order
  - `-1`: Programmatically focusable
  - `0`: Natural tab order
  - `1+`: Custom tab order (avoid)
- **`contenteditable`**: Make editable
- **`draggable`**: Drag and drop
- **`spellcheck`**: Spell checking
- **`translate`**: Translation hint

### 8.2 Data Attributes

- **`data-*`**: Custom data attributes
- Accessed via `dataset` in JavaScript
- Example: `<div data-user-id="123">`

### 8.3 ARIA Attributes (Accessibility)

- **`role`**: ARIA role
- **`aria-label`**: Accessible name
- **`aria-labelledby`**: Reference to label
- **`aria-describedby`**: Reference to description
- **`aria-hidden`**: Hide from screen readers
- **`aria-live`**: Live region updates
- **`aria-expanded`**: Expansion state
- **`aria-selected`**: Selection state
- **`aria-checked`**: Checked state
- ⚠️ Important: Use native semantics first, ARIA second

### 8.4 Microdata Attributes

- **`itemscope`**: Define item
- **`itemtype`**: Item type (Schema.org)
- **`itemprop`**: Item property
- Used for SEO and rich snippets

---

## Chapter 9: HTML5 APIs & Modern Features

### 9.1 Storage APIs (via JavaScript)

- **localStorage**: Persistent storage
- **sessionStorage**: Session storage
- **IndexedDB**: Client-side database
- **Cache API**: Service worker cache

### 9.2 Geolocation

- Access via JavaScript `navigator.geolocation`
- Requires user permission

### 9.3 Drag and Drop

- **Attributes**: `draggable`
- **Events**: `dragstart`, `drag`, `dragend`, `dragenter`, `dragover`, `dragleave`, `drop`
- Requires JavaScript handling

### 9.4 Canvas & WebGL

- **`<canvas>`**: Drawable region
- Requires JavaScript for drawing
- Use for graphs, animations, games

### 9.5 Web Workers

- Background JavaScript threads
- Linked in HTML via `<script>` or JavaScript

### 9.6 Server-Sent Events

- **EventSource API**: Server push
- Alternative to WebSockets for one-way communication

### 9.7 Web Sockets

- Real-time bidirectional communication
- Via JavaScript

### 9.8 Service Workers

- Background scripts for PWAs
- Offline functionality, push notifications
- Require HTTPS

---

## Chapter 10: Accessibility (A11y)

### 10.1 WCAG Guidelines

- **Perceivable**: Content accessible to senses
- **Operable**: Interface elements operable
- **Understandable**: Content comprehensible
- **Robust**: Works with assistive technologies

### 10.2 Semantic HTML for Accessibility

- Use proper heading hierarchy
- Use semantic elements over divs
- Landmarks: `main`, `nav`, `aside`, `footer`

### 10.3 Keyboard Navigation

- All interactive elements keyboard-accessible
- Logical tab order
- Focus indicators (don't disable outline!)
- Skip links for main content

### 10.4 Screen Reader Support

- Meaningful alt text for images
- ARIA labels where needed
- Form labels properly associated
- Table headers properly marked

### 10.5 Color & Contrast

- Sufficient color contrast (4.5:1 for normal text)
- Don't rely on color alone
- Test with tools like WAVE, axe

### 10.6 Forms Accessibility

- Always use `<label>`
- Group with `<fieldset>` and `<legend>`
- Error messages associated with inputs
- Required fields clearly marked

### 10.7 Media Accessibility

- Captions for videos
- Transcripts for audio
- Audio descriptions for visual content

---

## Chapter 11: SEO Best Practices

### 11.1 Meta Tags for SEO

- Title tag (50-60 characters)
- Meta description (150-160 characters)
- Open Graph tags for social media
- Canonical URLs: `<link rel="canonical">`
- Robots meta: `<meta name="robots" content="index, follow">`

### 11.2 Structured Data

- **Schema.org Markup**: JSON-LD preferred
- Types: Article, Product, Person, Organization, etc.
- Rich snippets for search results

### 11.3 Heading Structure

- One `<h1>` per page
- Logical hierarchy (don't skip levels)
- Descriptive, keyword-rich

### 11.4 URL Structure

- Descriptive, readable URLs
- Canonical tags to avoid duplicates

### 11.5 Image SEO

- Descriptive file names
- Meaningful alt text (don't keyword stuff)
- Proper dimensions to avoid layout shift
- WebP with fallbacks

### 11.6 Internal Linking

- Descriptive anchor text
- Logical site structure
- Breadcrumbs

### 11.7 Mobile-Friendliness

- Viewport meta tag
- Responsive images
- Touch-friendly targets (min 44x44px)

---

## Chapter 12: Performance Optimization

### 12.1 Loading Performance

- **Critical Rendering Path**: Minimize blocking resources
- **Defer/Async Scripts**:
  - `defer`: Execute after parsing
  - `async`: Execute when available
- **Preload**: `<link rel="preload">` for critical resources
- **Prefetch**: `<link rel="prefetch">` for future resources
- **DNS Prefetch**: `<link rel="dns-prefetch">`
- **Preconnect**: `<link rel="preconnect">`

### 12.2 Image Optimization

- **Lazy Loading**: `loading="lazy"` attribute
- **Responsive Images**: `srcset` and `sizes`
- **Modern Formats**: WebP, AVIF with fallbacks
- **Dimensions**: Always specify width/height

### 12.3 Resource Hints

- **`rel="preload"`**: High-priority resources
- **`rel="prefetch"`**: Low-priority future resources
- **`rel="dns-prefetch"`**: DNS lookup ahead
- **`rel="preconnect"`**: Full connection setup

### 12.4 Critical CSS

- Inline critical CSS in `<style>`
- Load non-critical CSS asynchronously
- Remove unused CSS

### 12.5 Minification

- Minify HTML in production
- Remove comments, whitespace
- Use build tools (Webpack, Vite, etc.)

### 12.6 Content Delivery

- Use CDNs for static assets
- Enable compression (gzip, brotli)
- Cache headers properly set

---

## Chapter 13: Security Best Practices

### 13.1 XSS Prevention

- Sanitize user input
- Use Content Security Policy (CSP)
- Escape output properly
- Avoid inline JavaScript

### 13.2 Content Security Policy

- **Meta tag**: `<meta http-equiv="Content-Security-Policy" content="...">`
- Define allowed sources for scripts, styles, etc.
- Report violations

### 13.3 HTTPS

- Always use HTTPS in production
- Secure cookies flag
- HSTS headers

### 13.4 External Links

- Use `rel="noopener noreferrer"` with `target="_blank"`
- Prevents window.opener exploitation

### 13.5 Iframe Security

- **`sandbox` attribute**: Restrict capabilities
- **`allow` attribute**: Permission policy
- Only embed trusted sources

### 13.6 Form Security

- CSRF tokens
- Server-side validation always
- Limit file upload types and sizes
- Use HTTPS for sensitive forms

---

## Chapter 14: Modern HTML Patterns

### 14.1 Progressive Enhancement

- Core functionality without JavaScript
- Enhanced experience with JavaScript
- Graceful degradation

### 14.2 Responsive Design

- Mobile-first approach
- Viewport meta tag
- Responsive images
- Touch-friendly interactions

### 14.3 Component-Based Thinking

- Reusable HTML patterns
- Consistent structure
- Template elements

### 14.4 Document Outline

- Proper heading hierarchy
- Semantic sectioning
- Landmark regions

### 14.5 BEM Methodology (for classes)

- Block\_\_Element--Modifier
- Consistent naming convention
- Maintainable class names

---

## Chapter 15: Production-Grade HTML Checklist

### 15.1 Pre-Launch Checklist

✓ **DOCTYPE and HTML structure**

- Valid HTML5 DOCTYPE
- `lang` attribute set
- Character encoding specified

✓ **Meta Tags**

- Viewport meta tag
- Description and title
- Open Graph tags
- Favicon links

✓ **Accessibility**

- All images have alt text
- Form inputs have labels
- Proper heading hierarchy
- ARIA labels where needed
- Keyboard navigable
- Sufficient color contrast

✓ **SEO**

- Unique title per page
- Meta description
- Canonical URLs
- Structured data (Schema.org)
- Semantic HTML

✓ **Performance**

- Images optimized and lazy loaded
- Scripts deferred/async
- Resource hints used
- Width/height on images
- Minified in production

✓ **Security**

- CSP headers/meta tag
- HTTPS only
- noopener on external links
- Sanitized user input
- No inline JavaScript

✓ **Validation**

- W3C HTML Validator
- No console errors
- Works in all target browsers
- Mobile responsive

### 15.2 Testing

- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Mobile devices**: iOS, Android
- **Screen readers**: NVDA, JAWS, VoiceOver
- **Lighthouse audit**: Performance, Accessibility, SEO
- **HTML validation**: W3C Validator
- **Link checker**: No broken links

### 15.3 Maintenance

- Regular security updates
- Performance monitoring
- Accessibility audits
- SEO monitoring
- Analytics integration

---

## Chapter 16: Interview-Specific Topics

### 16.1 Common Interview Questions

1. **DOCTYPE purpose**: Prevent quirks mode, specify HTML version
2. **Semantic HTML benefits**: SEO, accessibility, maintainability
3. **Block vs Inline**: Layout behavior, which elements
4. **Forms validation**: HTML5 validation attributes
5. **Accessibility**: ARIA, alt text, keyboard navigation
6. **SEO**: Meta tags, structured data, semantic HTML
7. **Performance**: Lazy loading, async scripts, resource hints
8. **Security**: XSS, CSP, noopener

### 16.2 Advanced Concepts

- Shadow DOM and Web Components
- Service Workers and PWAs
- Canvas and WebGL
- Drag and Drop API
- Geolocation API
- Local Storage vs Session Storage vs Cookies

### 16.3 Best Practices

- Progressive enhancement over graceful degradation
- Mobile-first responsive design
- Accessibility-first approach
- Performance budgets
- Semantic HTML always
- Separation of concerns

### 16.4 Code Review Points

- Proper indentation and formatting
- Semantic element usage
- Accessibility attributes
- Performance considerations
- Security concerns
- Maintainability

---

## Key Takeaways for Production

1. **Always validate**: Use W3C validator before deployment
2. **Accessibility is mandatory**: Not optional, affects everyone
3. **Performance matters**: Every KB counts on mobile
4. **Security first**: Never trust user input, always sanitize
5. **SEO from start**: Easier to build in than retrofit
6. **Mobile-first**: More users on mobile than desktop
7. **Semantic always**: Better for everyone (developers, users, search engines)
8. **Test thoroughly**: Multiple browsers, devices, assistive technologies

Remember: HTML is the foundation. Master it properly, and everything else (CSS, JavaScript) becomes easier.
