# Rxjs pages

This folder contains everything related to rxjs pages. It is, operator pages, home menu and layout pages and share code.

## How to setup new page

Run command `ng g ./app-schematics:rxjs-page <operatorName>`.

If this does not work, maybe try to build first the schematic: `cd app-schematics; npm run build`

Add new entry manually in the corresponding group in [home-menu-links.ts](./home-menu/home-menu-links.ts), or create a new group.
