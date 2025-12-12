# CSS Module Structure

This directory contains modular CSS files organized by functionality for easy maintenance and updates.

## File Structure

```
assets/css/
├── input.css          # Main entry point - imports all modules
├── _base.css          # Tailwind directives
├── _typography.css    # Fonts and language-specific typography
├── _components.css    # Reusable UI components (buttons, cards)
├── _markdown-content.css  # Markdown styles for posts and pages
└── _utilities.css     # Custom utility classes
```

## Module Descriptions

### `input.css`
Main entry point that imports all CSS modules. This is the file processed by Hugo Pipes/PostCSS.

### `_base.css`
Contains Tailwind CSS directives (`@tailwind base`, `@tailwind components`, `@tailwind utilities`). **Must be imported first.**

### `_typography.css`
Font families and language-specific typography rules (e.g., Chinese font settings).

### `_components.css`
Reusable UI component styles:
- Buttons (`.btn-primary`, `.btn-secondary`)
- Cards (`.service-card`)
- Add more components here as needed

### `_markdown-content.css`
Comprehensive styles for markdown-rendered content in posts and pages:
- Headings (h1-h6)
- Paragraphs, lists, links
- Code blocks and inline code
- Tables, blockquotes, images
- All markdown elements

### `_utilities.css`
Custom utility classes that extend Tailwind's utility system.

## How to Update

1. **To modify markdown content styles**: Edit `_markdown-content.css`
2. **To add/update buttons**: Edit `_components.css`
3. **To change fonts**: Edit `_typography.css`
4. **To add utilities**: Edit `_utilities.css`

## Build Process

CSS is automatically processed by Hugo Pipes when running `hugo server` or `hugo`. The modules are imported and compiled into a single CSS file.

For standalone CSS builds:
```bash
npm run build:css
```

## Adding New Modules

1. Create a new `_module-name.css` file
2. Add `@import './_module-name.css';` to `input.css` in the appropriate order
3. Remember: `_base.css` must always be imported first

