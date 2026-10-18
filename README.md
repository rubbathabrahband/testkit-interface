# Soroban Testkit Interface

A visual companion to [Soroban Testkit](https://github.com/soroban-testkit/testkit-blockchain). It documents the library's focused testing modules and provides a command builder for the supported CLI workflows.

The interface does not execute contracts in the browser. Generated commands run locally through `soroban-testkit`, keeping contract tests deterministic and offline as required by the core project.

## Features

- **Theme Variants**: Supports both high-contrast dark theme (default) and WCAG AA/AAA-compliant light theme variant with an accessible navigation toggle button.
- **High-Density Display Refinement**: Subpixel border rendering, crisp box-shadows, and antialiasing tailored for Retina / high-DPI displays.
- **Interactive Module Cards**: Keyboard-accessible (`tabIndex={0}`) module cards with interactive `:hover` and `:focus-visible` outline indicators and accessible descriptions.
- **Consistent Vertical Rhythm**: Standardized section spacing, header margins, and content gutters across all page sections (`hero`, `modules`, `commands`, `footer`).

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npm run build
npm test
```

## Project boundary

- Rust testing library and CLI: `testkit-blockchain`
- Documentation and CLI workbench: this repository

Licensed under Apache-2.0.
