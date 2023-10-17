# RecRam Builder

The RecRam Builder is a project developed with Vue 3 and Vite. Its purpose is to provide an environment for developing draggable UI components and using them to construct a webpage in a drag-n-drop fashion.

## Project Structure

RecRam Builder mainly focuses on creating webpage structures with different draggable UI elements (like Button, Text, Input, Block etc.).

Key elements of this project are: `App.vue`, `Sidebar.vue`, `ElementProperties.vue`, `BuilderCanvas.vue` and `elements.ts` files.

- `App.vue` is the root component of the Vue application.
- `Sidebar.vue` provides a collection of UI elements that can be dragged into the builder.
- `ElementProperties.vue` reflects the properties of the selected element from the builder.
- `BuilderCanvas.vue` is where UI elements are dropped and set up.
- `elements.ts` manages the state of the elements in the application.

## Multiple Pages Design and JSON Export Per Page

We have introduced a new feature to the RecRam Builder which now allows the design of multiple pages and JSON export for each designed page.

- `PageTabs.vue`  facilitates the design of multiple pages. It imports various icons, stores, and types for handling the new feature. It contains methods to:
- Generate unique page names when a new page is added.
- Add and remove pages.
- Export the design of a current page in JSON format and show the JSON in a popup.
- Copy the JSON to the clipboard.

### Template Section

The template section contains the HTML to display the UI for page tabs. This includes:

- A UI button for creating a new page
- UI for each existing page with buttons to edit the page, copy JSON of the page, and to delete the page

### JSON Popup

A popup window is implemented to display the JSON of a page design. It is also equipped with a copy to clipboard function.

 
## Project Setup

```bash
    bun i
```

### Compiles and hot-reloads for development

```bash
    bun dev
```

### Compiles and minifies for production

```bash
    bun build
```

### Lints and fixes files

```bash
    bun lint
```
